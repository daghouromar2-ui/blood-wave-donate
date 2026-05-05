import { Search, Filter, X } from "lucide-react";
import { BLOOD_TYPES, WILAYAS } from "@/lib/constants";

export interface FiltersState {
  search: string;
  bloodType: string;
  wilaya: string;
  eligibility: string;
  ageMin: number;
  ageMax: number;
}

interface DonorsFiltersProps {
  filters: FiltersState;
  onChange: (filters: FiltersState) => void;
  onReset: () => void;
}

const DonorsFilters = ({ filters, onChange, onReset }: DonorsFiltersProps) => {
  const update = (key: keyof FiltersState, value: string | number) =>
    onChange({ ...filters, [key]: value });

  const inputClass =
    "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40";

  const hasActiveFilters = filters.bloodType || filters.wilaya || filters.eligibility || filters.search;

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
          <Filter className="w-4 h-4" />
          <span className="text-sm font-medium">تصفية</span>
        </div>
        {hasActiveFilters && (
          <button onClick={onReset} className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1">
            <X className="w-3 h-3" />
            مسح الكل
          </button>
        )}
      </div>

      <div className="relative">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="بحث بالاسم أو رقم الهاتف..."
          value={filters.search}
          onChange={(e) => update("search", e.target.value)}
          className={`w-full pr-10 ${inputClass}`}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <select value={filters.bloodType} onChange={(e) => update("bloodType", e.target.value)} className={inputClass}>
          <option value="">كل الفصائل</option>
          {BLOOD_TYPES.map((t) => (<option key={t} value={t}>{t}</option>))}
        </select>

        <select value={filters.wilaya} onChange={(e) => update("wilaya", e.target.value)} className={inputClass}>
          <option value="">كل الولايات</option>
          {WILAYAS.map((w) => (<option key={w} value={w}>{w}</option>))}
        </select>

        <select value={filters.eligibility} onChange={(e) => update("eligibility", e.target.value)} className={inputClass}>
          <option value="">الكل</option>
          <option value="eligible">مؤهل</option>
          <option value="not_eligible">غير مؤهل</option>
          <option value="never">لم يتبرع</option>
        </select>

        <div className="flex items-center gap-2">
          <input type="number" min={18} max={65} value={filters.ageMin}
            onChange={(e) => update("ageMin", Number(e.target.value))}
            className={`w-16 text-center ${inputClass}`} />
          <span className="text-slate-400 text-xs">—</span>
          <input type="number" min={18} max={65} value={filters.ageMax}
            onChange={(e) => update("ageMax", Number(e.target.value))}
            className={`w-16 text-center ${inputClass}`} />
          <span className="text-slate-400 text-xs">سنة</span>
        </div>
      </div>
    </div>
  );
};

export default DonorsFilters;
