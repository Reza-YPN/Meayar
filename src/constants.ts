export const IMPACT_LEVELS = [
  { id: 'Input', label: 'ورودی (Input)', color: 'bg-slate-100 text-slate-800 font-bold border-r-4 border-slate-500' },
  { id: 'Process', label: 'فرآیند (Process)', color: 'bg-sky-50 text-sky-900 font-bold border-r-4 border-sky-500' },
  { id: 'Product', label: 'خروجی/محصول (Product)', color: 'bg-indigo-50 text-indigo-900 font-bold border-r-4 border-indigo-500' },
  { id: 'Output', label: 'دستاورد (Output)', color: 'bg-violet-50 text-violet-900 font-bold border-r-4 border-violet-500' },
  { id: 'Outcome', label: 'پیامد (Outcome)', color: 'bg-purple-50 text-purple-900 font-bold border-r-4 border-purple-500' },
  { id: 'Impact', label: 'اثر (Impact)', color: 'bg-fuchsia-50 text-fuchsia-900 font-bold border-r-4 border-fuchsia-500' }
];

export const FUNCTION_LEVELS = [
  { id: 'Individual', label: 'فردی', color: 'bg-emerald-50/90 text-emerald-950 font-black' },
  { id: 'Team', label: 'تیمی', color: 'bg-blue-50/90 text-blue-950 font-black' },
  { id: 'Organizational', label: 'سازمانی', color: 'bg-indigo-50/90 text-indigo-950 font-black' },
  { id: 'Social', label: 'اجتماعی/فرهنگی', color: 'bg-teal-50/90 text-teal-950 font-black' }
];

export const ROLE_TYPES = [
  { id: 'Critical', label: 'حیاتی (Critical)' },
  { id: 'Enhancer', label: 'ارتقا دهنده (Enhancer)' },
  { id: 'Enabler', label: 'توانمندساز (Enabler)' }
];

export const IMPORTANCE_LEVELS = [
  { id: 'Very High', label: 'بسیار بالا', color: 'bg-rose-50 text-rose-900 font-bold border-r-4 border-rose-500' },
  { id: 'High', label: 'بالا', color: 'bg-amber-50 text-amber-900 font-bold border-r-4 border-amber-500' },
  { id: 'Low', label: 'پایین', color: 'bg-sky-50 text-sky-900 font-bold border-r-4 border-sky-500' },
  { id: 'Very Low', label: 'بسیار پایین', color: 'bg-slate-50 text-slate-700 font-bold border-r-4 border-slate-400' }
];

export const getCompetencyColorClass = (type: string) => {
  if (type === 'محوری') return 'bg-rose-50 text-rose-950 border-2 border-rose-300 shadow-sm';
  if (type === 'عمومی') return 'bg-emerald-50 text-emerald-950 border-2 border-emerald-300 shadow-sm';
  return 'bg-indigo-50 text-indigo-950 border-2 border-indigo-300 shadow-sm';
};
