import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  X, 
  Sparkles, 
  Users, 
  ExternalLink, 
  Check, 
  Edit3, 
  Plus, 
  RotateCcw, 
  Trash2, 
  Save, 
  Compass, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Layers,
  Palette,
  Link2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  StepInfo, 
  getStoredMainSteps, 
  getStoredOtherSteps, 
  saveStoredMainSteps, 
  saveStoredOtherSteps, 
  resetAllStepsToDefault, 
  getIconComponent,
  ICON_OPTIONS,
  COLOR_OPTIONS,
  ROUTE_OPTIONS,
  DEFAULT_MAIN_STEPS,
  DEFAULT_OTHER_STEPS
} from "../services/stepsGuideService";

interface StepsGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "main" | "other";
  initialStepId?: string;
}

export function StepsGuideModal({
  isOpen,
  onClose,
  initialTab = "main",
  initialStepId
}: StepsGuideModalProps) {
  const [mainSteps, setMainSteps] = useState<StepInfo[]>(() => getStoredMainSteps());
  const [otherSteps, setOtherSteps] = useState<StepInfo[]>(() => getStoredOtherSteps());
  const [activeTab, setActiveTab] = useState<"main" | "other">(initialTab);
  const [selectedStepId, setSelectedStepId] = useState<string>(initialStepId || "step-1");
  
  // Edit Mode State
  const [isEditing, setIsEditing] = useState(false);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [draftStep, setDraftStep] = useState<StepInfo | null>(null);
  const [newDetailInput, setNewDetailInput] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  // Sync state on modal open
  useEffect(() => {
    if (isOpen) {
      const loadedMain = getStoredMainSteps();
      const loadedOther = getStoredOtherSteps();
      setMainSteps(loadedMain);
      setOtherSteps(loadedOther);
      
      const currentList = activeTab === "main" ? loadedMain : loadedOther;
      if (initialStepId && currentList.some(s => s.id === initialStepId)) {
        setSelectedStepId(initialStepId);
      } else if (!currentList.some(s => s.id === selectedStepId)) {
        setSelectedStepId(currentList[0]?.id || "");
      }
      setIsEditing(false);
      setIsCreatingNew(false);
      setDraftStep(null);
    }
  }, [isOpen, activeTab]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const currentStepList = activeTab === "main" ? mainSteps : otherSteps;
  const activeStep = currentStepList.find(s => s.id === selectedStepId) || currentStepList[0];

  // Start editing the active step
  const handleStartEdit = (stepToEdit: StepInfo) => {
    setDraftStep({
      ...stepToEdit,
      details: stepToEdit.details ? [...stepToEdit.details] : []
    });
    setIsCreatingNew(false);
    setIsEditing(true);
    setNewDetailInput("");
  };

  // Start creating a new step
  const handleStartCreateNew = () => {
    const nextNumber = activeTab === "main" ? mainSteps.length + 1 : undefined;
    const newId = `custom-${Date.now()}`;
    const newStepTemplate: StepInfo = {
      id: newId,
      stepNumber: nextNumber,
      title: activeTab === "main" ? `گام جدید شماره ${nextNumber}` : "خدمت یا فرآیند جدید",
      subtitle: "Custom Service / Step",
      iconName: "Sparkles",
      color: "from-indigo-600 to-violet-600",
      desc: "شرح و راهنمای فرآیند خود را در این بخش بنویسید...",
      details: ["مرحله ۱: اقدام اولیه", "مرحله ۲: بررسی و تایید"],
      link: "/home",
      isCustom: true
    };
    setDraftStep(newStepTemplate);
    setIsCreatingNew(true);
    setIsEditing(true);
    setNewDetailInput("");
  };

  // Save changes
  const handleSaveDraft = () => {
    if (!draftStep) return;
    if (!draftStep.title.trim()) {
      showToast("لطفاً عنوان گام را وارد نمایید.");
      return;
    }

    const updatedStep: StepInfo = {
      ...draftStep,
      title: draftStep.title.trim(),
      subtitle: draftStep.subtitle.trim(),
      desc: draftStep.desc.trim(),
      updatedAt: new Date().toISOString(),
      isCustom: true
    };

    if (activeTab === "main") {
      let updatedList: StepInfo[];
      if (isCreatingNew) {
        updatedList = [...mainSteps, updatedStep];
      } else {
        updatedList = mainSteps.map(s => s.id === updatedStep.id ? updatedStep : s);
      }
      setMainSteps(updatedList);
      saveStoredMainSteps(updatedList);
    } else {
      let updatedList: StepInfo[];
      if (isCreatingNew) {
        updatedList = [...otherSteps, updatedStep];
      } else {
        updatedList = otherSteps.map(s => s.id === updatedStep.id ? updatedStep : s);
      }
      setOtherSteps(updatedList);
      saveStoredOtherSteps(updatedList);
    }

    setSelectedStepId(updatedStep.id);
    setIsEditing(false);
    setIsCreatingNew(false);
    setDraftStep(null);
    showToast(isCreatingNew ? "گام جدید با موفقیت اضافه و ذخیره شد." : "تغییرات راهنمای گام با موفقیت ذخیره شد.");
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setIsEditing(false);
    setIsCreatingNew(false);
    setDraftStep(null);
  };

  // Delete active step
  const handleDeleteStep = (stepIdToDelete: string) => {
    if (currentStepList.length <= 1) {
      showToast("امکان حذف تمام گام‌ها وجود ندارد. حداقل یک گام باید باقی بماند.");
      return;
    }

    if (activeTab === "main") {
      const updatedList = mainSteps.filter(s => s.id !== stepIdToDelete);
      setMainSteps(updatedList);
      saveStoredMainSteps(updatedList);
      setSelectedStepId(updatedList[0].id);
    } else {
      const updatedList = otherSteps.filter(s => s.id !== stepIdToDelete);
      setOtherSteps(updatedList);
      saveStoredOtherSteps(updatedList);
      setSelectedStepId(updatedList[0].id);
    }

    setIsEditing(false);
    setIsCreatingNew(false);
    setDraftStep(null);
    showToast("گام مورد نظر با موفقیت حذف گردید.");
  };

  // Reset all steps to defaults
  const handleResetToDefaults = () => {
    const { main, other } = resetAllStepsToDefault();
    setMainSteps(main);
    setOtherSteps(other);
    setConfirmResetOpen(false);
    setIsEditing(false);
    setIsCreatingNew(false);
    setDraftStep(null);
    setSelectedStepId(activeTab === "main" ? main[0].id : other[0].id);
    showToast("تمامی متون و ساختار راهنمای گام‌ها به تنظیمات اولیه سامانه بازنشانی شد.");
  };

  // Add detail bullet in draft
  const handleAddDetail = () => {
    if (!newDetailInput.trim() || !draftStep) return;
    setDraftStep({
      ...draftStep,
      details: [...(draftStep.details || []), newDetailInput.trim()]
    });
    setNewDetailInput("");
  };

  // Remove detail bullet
  const handleRemoveDetail = (index: number) => {
    if (!draftStep) return;
    const updated = (draftStep.details || []).filter((_, idx) => idx !== index);
    setDraftStep({
      ...draftStep,
      details: updated
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto" dir="rtl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh] relative my-auto"
      >
        {/* Toast Alert */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-700 text-white px-5 py-2.5 rounded-2xl shadow-xl border border-emerald-500 text-xs font-bold flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-200" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-indigo-600/90 text-white flex items-center justify-center shadow-lg border border-indigo-400/30">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-sm sm:text-base">راهنما و ساختار گام‌های سامانه معیار (مدیریت عملکرد و یکپارچگی سازی استاندارد رفتاری)</h3>
                <span className="bg-indigo-500/30 border border-indigo-400/30 text-indigo-200 text-[10px] font-bold px-2 py-0.5 rounded-full hidden sm:inline-block">
                  امکان ویرایش دستی و ذخیره‌سازی
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">آشنایی با گام‌های ارزیابی، شایستگی، آموزش و امکان ویرایش یا نوشتن دستی راهنما</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {!isEditing && (
              <button
                onClick={() => setConfirmResetOpen(true)}
                title="بازنشانی متون به پیش‌فرض کارخانه"
                className="p-2 rounded-xl text-slate-400 hover:text-amber-300 hover:bg-white/10 transition text-xs flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="text-[11px] hidden md:inline">بازنشانی متون اولیه</span>
              </button>
            )}

            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/10 transition"
              title="بستن"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Reset Confirmation Overlay */}
        {confirmResetOpen && (
          <div className="p-4 bg-amber-50 border-b border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-amber-900 text-xs">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <span>آیا مطمئن هستید که می‌خواهید تمام تغییرات دستی راهنما را لغو کرده و به متون پیش‌فرض سازمانی بازگردانید؟</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleResetToDefaults}
                className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs shadow-sm"
              >
                بله، بازنشانی شود
              </button>
              <button
                onClick={() => setConfirmResetOpen(false)}
                className="px-3 py-1.5 bg-white border border-amber-300 text-amber-800 font-bold rounded-xl text-xs hover:bg-amber-100"
              >
                انصراف
              </button>
            </div>
          </div>
        )}

        {/* Main Category Tabs: گام‌های اصلی vs سایر خدمات */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-100/70 px-4 pt-3 gap-2">
          <div className="flex items-center gap-2">
            <button
              disabled={isEditing}
              onClick={() => {
                setActiveTab("main");
                setSelectedStepId(mainSteps[0]?.id || "step-1");
              }}
              className={`px-4 sm:px-5 py-2.5 rounded-t-xl text-xs font-bold transition flex items-center gap-2 border-t border-x ${
                activeTab === "main"
                  ? "bg-white text-indigo-700 border-slate-200 shadow-sm"
                  : "bg-transparent text-slate-600 border-transparent hover:text-slate-900"
              } ${isEditing ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>گام‌های اصلی سامانه ({mainSteps.length})</span>
            </button>

            <button
              disabled={isEditing}
              onClick={() => {
                setActiveTab("other");
                setSelectedStepId(otherSteps[0]?.id || "other-1");
              }}
              className={`px-4 sm:px-5 py-2.5 rounded-t-xl text-xs font-bold transition flex items-center gap-2 border-t border-x ${
                activeTab === "other"
                  ? "bg-white text-indigo-700 border-slate-200 shadow-sm"
                  : "bg-transparent text-slate-600 border-transparent hover:text-slate-900"
              } ${isEditing ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <Users className="w-4 h-4 text-emerald-600" />
              <span>سایر خدمات و فرآیندها ({otherSteps.length})</span>
            </button>
          </div>

          {!isEditing && (
            <button
              onClick={handleStartCreateNew}
              className="mb-1 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-[11px] font-bold flex items-center gap-1.5 transition"
            >
              <Plus className="w-3.5 h-3.5 text-indigo-600" />
              <span>+ افزودن گام جدید</span>
            </button>
          )}
        </div>

        {/* Step Navigation Pill List (Sub-tabs) */}
        {!isEditing && (
          <div className="p-3 bg-slate-50 border-b border-slate-200 overflow-x-auto flex items-center gap-2 custom-scrollbar">
            {currentStepList.map((s) => {
              const isSelected = activeStep?.id === s.id;
              const IconComp = getIconComponent(s.iconName);
              return (
                <button
                  key={s.id}
                  onClick={() => setSelectedStepId(s.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 border ${
                    isSelected
                      ? "bg-indigo-600 text-white border-indigo-700 shadow-md shadow-indigo-100"
                      : "bg-white text-slate-700 hover:bg-slate-200 border-slate-200"
                  }`}
                >
                  <IconComp className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                  {s.stepNumber ? <span>گام {s.stepNumber}: {s.title}</span> : <span>{s.title}</span>}
                  {s.isCustom && (
                    <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-amber-300' : 'bg-indigo-500'}`} title="ویرایش شده" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Main Content Area: Either View Mode or Edit Form Mode */}
        <div className="p-5 sm:p-7 flex-1 overflow-y-auto custom-scrollbar">
          {isEditing && draftStep ? (
            /* ================= EDIT FORM MODE ================= */
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-indigo-50/70 border border-indigo-200 p-4 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-2 text-indigo-900 text-xs font-black">
                  <Edit3 className="w-4 h-4 text-indigo-600" />
                  <span>{isCreatingNew ? "افزودن و نگارش گام جدید" : `ویرایش دستی راهنما: ${draftStep.title}`}</span>
                </div>
                <span className="text-[11px] text-slate-500 font-medium">
                  متن‌های ویرایش شده مستقیماً در مرورگر شما ذخیره خواهند شد
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Step Number (Optional) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    شماره گام (اختیاری):
                  </label>
                  <input
                    type="number"
                    value={draftStep.stepNumber !== undefined ? draftStep.stepNumber : ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      setDraftStep({
                        ...draftStep,
                        stepNumber: val === "" ? undefined : parseInt(val, 10)
                      });
                    }}
                    placeholder="مثلاً ۱، ۲..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  />
                </div>

                {/* Title */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    عنوان گام / خدمت <span className="text-red-500">*</span>:
                  </label>
                  <input
                    type="text"
                    value={draftStep.title}
                    onChange={(e) => setDraftStep({ ...draftStep, title: e.target.value })}
                    placeholder="عنوان گام را بنویسید..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Subtitle */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    زیرعنوان یا عنوان لاتین:
                  </label>
                  <input
                    type="text"
                    value={draftStep.subtitle}
                    onChange={(e) => setDraftStep({ ...draftStep, subtitle: e.target.value })}
                    placeholder="مثلاً Competency Matrix & Skill Radar"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  />
                </div>

                {/* Route / Link */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    لینک ورود / ارجاع به صفحه:
                  </label>
                  <select
                    value={draftStep.link}
                    onChange={(e) => setDraftStep({ ...draftStep, link: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    {ROUTE_OPTIONS.map((r) => (
                      <option key={r.path} value={r.path}>
                        {r.label} ({r.path})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Icon & Color Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                {/* Icon Picker */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-indigo-600" />
                    <span>انتخاب آیکون گام:</span>
                  </label>
                  <select
                    value={draftStep.iconName}
                    onChange={(e) => setDraftStep({ ...draftStep, iconName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-white"
                  >
                    {ICON_OPTIONS.map((opt) => (
                      <option key={opt.name} value={opt.name}>
                        {opt.label} ({opt.name})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Color Scheme Picker */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-indigo-600" />
                    <span>طیف رنگ کارت:</span>
                  </label>
                  <select
                    value={draftStep.color}
                    onChange={(e) => setDraftStep({ ...draftStep, color: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-white"
                  >
                    {COLOR_OPTIONS.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description Textarea */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  متن شرح فرآیند و کارکرد (توضیحات اصلی گام) <span className="text-red-500">*</span>:
                </label>
                <textarea
                  rows={4}
                  value={draftStep.desc}
                  onChange={(e) => setDraftStep({ ...draftStep, desc: e.target.value })}
                  placeholder="شرح دقیق گام و نحوه کارکرد فرآیند را بنویسید..."
                  className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-xs font-normal leading-relaxed text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>

              {/* Key Details / Bullets */}
              <div className="space-y-3 bg-slate-50/80 p-4 rounded-2xl border border-slate-200">
                <label className="block text-xs font-bold text-slate-700">
                  مراحل، مولفه‌ها و بندهای کلیدی (فهرست نشانه‌دار):
                </label>
                
                {/* List of current details */}
                <div className="space-y-2">
                  {(draftStep.details || []).map((detail, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-200">
                      <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <input
                        type="text"
                        value={detail}
                        onChange={(e) => {
                          const updated = [...(draftStep.details || [])];
                          updated[idx] = e.target.value;
                          setDraftStep({ ...draftStep, details: updated });
                        }}
                        className="flex-1 text-xs text-slate-800 font-medium bg-transparent border-none focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveDetail(idx)}
                        className="text-slate-400 hover:text-red-600 p-1 rounded-lg transition"
                        title="حذف این بند"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add new bullet */}
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="text"
                    value={newDetailInput}
                    onChange={(e) => setNewDetailInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddDetail();
                      }
                    }}
                    placeholder="عنوان مولفه یا مرحله جدید را بنویسید و دکمه افزودن را بزنید..."
                    className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddDetail}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shrink-0 shadow-sm"
                  >
                    + افزودن بند
                  </button>
                </div>
              </div>

              {/* Edit Actions Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <div>
                  {!isCreatingNew && (
                    <button
                      type="button"
                      onClick={() => handleDeleteStep(draftStep.id)}
                      className="px-3.5 py-2 text-red-600 hover:bg-red-50 border border-red-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>حذف این گام</span>
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition"
                  >
                    انصراف
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md shadow-emerald-600/20 flex items-center gap-2 transition"
                  >
                    <Save className="w-4 h-4" />
                    <span>ذخیره و اعمال تغییرات</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            /* ================= VIEW MODE ================= */
            activeStep && (() => {
              const IconComp = getIconComponent(activeStep.iconName);
              const currentIndex = currentStepList.findIndex(s => s.id === activeStep.id);
              const prevStep = currentStepList[currentIndex - 1];
              const nextStep = currentStepList[currentIndex + 1];

              return (
                <motion.div
                  key={activeStep.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Step Header Card */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${activeStep.color} text-white flex items-center justify-center shadow-lg shrink-0`}>
                        <IconComp className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          {activeStep.stepNumber && (
                            <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
                              گام {activeStep.stepNumber}
                            </span>
                          )}
                          {activeStep.isCustom && (
                            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
                              <Edit3 className="w-2.5 h-2.5" /> ویرایش شده دستی
                            </span>
                          )}
                        </div>
                        <h4 className="text-lg font-black text-slate-800 mt-1">{activeStep.title}</h4>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">{activeStep.subtitle}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleStartEdit(activeStep)}
                      className="self-start sm:self-auto px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-bold flex items-center gap-2 transition shadow-sm"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-indigo-600" />
                      <span>ویرایش دستی متن این گام</span>
                    </button>
                  </div>

                  {/* Step Description */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <h5 className="text-xs font-black text-slate-800 mb-2 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-indigo-600" />
                      <span>شرح فرآیند و کارکرد:</span>
                    </h5>
                    <p className="text-xs text-slate-700 leading-relaxed text-justify whitespace-pre-line font-medium">
                      {activeStep.desc}
                    </p>
                  </div>

                  {/* Key Components / Bullet points */}
                  {activeStep.details && activeStep.details.length > 0 && (
                    <div className="space-y-2.5">
                      <h5 className="text-xs font-black text-slate-800 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>مراحل و مولفه‌های کلیدی:</span>
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {activeStep.details.map((detail, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 bg-indigo-50/50 p-3 rounded-xl border border-indigo-100/80 text-xs text-slate-800 font-medium">
                            <Check className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                            <span className="leading-normal">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Bottom Navigation & Route Link */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      {prevStep && (
                        <button
                          onClick={() => setSelectedStepId(prevStep.id)}
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition"
                        >
                          مورد قبلی
                        </button>
                      )}
                      {nextStep && (
                        <button
                          onClick={() => setSelectedStepId(nextStep.id)}
                          className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl text-xs transition"
                        >
                          مورد بعدی
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <Link
                        to={activeStep.link}
                        onClick={onClose}
                        className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-md shadow-indigo-100 flex items-center gap-2 transition"
                      >
                        <span>ورود به این بخش</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })()
          )}
        </div>
      </motion.div>
    </div>
  );
}
