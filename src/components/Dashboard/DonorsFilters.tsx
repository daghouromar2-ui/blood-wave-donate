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

  const selectClass =
    "bg-white/10 border border-white/20 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 [&>option]:bg-gray-900 [&>option]:text-white";

  const hasActiveFilters = filters.bloodType || filters.wilaya || filters.eligibility || filters.search;

  return (
    <div className="rounded-2xl border border-white/10 p-4 backdrop-blur-xl space-y-4" style={{ background: "rgba(255,255,255,0.05)" }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-white/80">
          <Filter className="w-4 h-4" />
          <span className="text-sm font-medium">تصفية</span>
        </div>
        {hasActiveFilters && (
          <button onClick={onReset} className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1">
            <X className="w-3 h-3" />
            مسح الكل
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
        <input
          type="text"
          placeholder="بحث بالاسم أو رقم الهاتف..."
          value={filters.search}
          onChange={(e) => update("search", e.target.value)}
          className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-3 py-2 pr-10 text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-red-500/50"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Blood Type */}
        <select value={filters.bloodType} onChange={(e) => update("bloodType", e.target.value)} className={selectClass}>
          <option value="">كل الفصائل</option>
          {BLOOD_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        {/* Wilaya */}
        <select value={filters.wilaya} onChange={(e) => update("wilaya", e.target.value)} className={selectClass}>
          <option value="">كل الولايات</option>
          {WILAYAS.map((w) => (
            <option key={w} value={w}>{w}</option>
          ))}
        </select>

        {/* Eligibility */}
        <select value={filters.eligibility} onChange={(e) => update("eligibility", e.target.value)} className={selectClass}>
          <option value="">الكل</option>
          <option value="eligible">مؤهل</option>
          <option value="not_eligible">غير مؤهل</option>
          <option value="never">لم يتبرع</option>
        </select>

        {/* Age Range */}
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={18}
            max={65}
            value={filters.ageMin}
            onChange={(e) => update("ageMin", Number(e.target.value))}
            className="w-16 bg-white/10 border border-white/20 text-white rounded-xl px-2 py-2 text-sm text-center focus:outline-none focus:ring-2 focus:ring-red-500/50"
          />
          <span className="text-white/40 text-xs">—</span>
          <input
            type="number"
            min={18}
            max={65}
            value={filters.ageMax}
            onChange={(e) => update("ageMax", Number(e.target.value))}
            className="w-16 bg-white/10 border border-white/20 text-white rounded-xl px-2 py-2 text-sm text-center focus:outline-none focus:ring-2 focus:ring-red-500/50"
          />
          <span className="text-white/40 text-xs">سنة</span>
        </div>
      </div>
    </div>
  );
};

export default DonorsFilters;
