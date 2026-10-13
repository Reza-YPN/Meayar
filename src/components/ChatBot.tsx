import React, { useState, useEffect } from 'react';
import { generateId } from '../types';
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles, Minimize2 } from 'lucide-react';
import { createChatSession } from '../services/geminiService';
import { Chat, GenerateContentResponse } from "@google/genai";
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState<Chat | null>(null);

  useEffect(() => {
    try {
      const chat = createChatSession();
      setChatSession(chat);
      setMessages([{
        id: 'welcome',
        role: 'model',
        text: 'سلام! من دستیار هوشمند منابع انسانی هستم. چطور می‌توانم در طراحی ماتریس شایستگی به شما کمک کنم؟'
      }]);
    } catch (e) { console.error("Failed to init chat", e); }
  }, []);

  const handleSend = async () => {
    if (!input.trim() || !chatSession) return;
    const userMsg: Message = { id: generateId(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    try {
      const aiMsgId = generateId();
      setMessages(prev => [...prev, { id: aiMsgId, role: 'model', text: '' }]);
      const result = await chatSession.sendMessageStream({ message: userMsg.text });
      let fullText = '';
      for await (const chunk of result) {
         const c = chunk as GenerateContentResponse;
         fullText += c.text || '';
         setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, text: fullText } : m));
      }
    } catch (error) {
      setMessages(prev => [...prev, { id: generateId(), role: 'model', text: 'خطایی رخ داد.' }]);
    } finally { setIsLoading(false); }
  };

  return (
    <>
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="fixed bottom-6 left-6 bg-indigo-600 text-white p-4 rounded-full shadow-xl z-50">
          <Bot size={28} />
        </button>
      )}
      {isOpen && (
        <div className="fixed bottom-6 left-6 w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 p-4 flex flex-col h-[500px] z-50 font-sans" dir="rtl">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <h3 className="font-bold text-sm flex items-center gap-2 text-slate-800"><Bot size={18} className="text-indigo-600"/> دستیار هوشمند منابع انسانی</h3>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
          </div>
          <div className="flex-1 overflow-y-auto my-3 space-y-3 custom-scrollbar pr-2">
             {messages.map((m) => (
               <div key={m.id} className={`p-3 rounded-xl text-xs leading-relaxed ${m.role === 'user' ? 'bg-indigo-100 text-indigo-900 text-right mr-12 rounded-tl-none' : 'bg-slate-100 text-slate-800 text-right ml-12 rounded-tr-none'}`}>
                 <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.text}</ReactMarkdown>
               </div>
             ))}
             {isLoading && <div className="p-3 bg-slate-100 text-slate-500 text-xs w-16 text-center rounded-xl rounded-tr-none ml-12"><Loader2 className="w-4 h-4 animate-spin inline-block"/></div>}
          </div>
          <div className="flex gap-2">
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 border border-slate-200 bg-slate-50 p-3 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              placeholder="سوال خود را بپرسید..." 
            />
            <button onClick={handleSend} disabled={!input.trim() || isLoading} className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-colors">
              <Send size={18} className="rotate-180" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
