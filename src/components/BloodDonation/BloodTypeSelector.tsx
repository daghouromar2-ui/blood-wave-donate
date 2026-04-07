import { cn } from "@/lib/utils";

interface BloodTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const bloodTypes = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-", "لا أعرف"];

const BloodTypeSelector = ({ value, onChange }: BloodTypeSelectorProps) => {
  return (
    <div className="space-y-2" dir="rtl">
      <label className="text-sm font-medium text-primary-foreground">فصيلة الدم</label>
      <div className="flex flex-wrap gap-2 justify-center">
        {bloodTypes.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => onChange(type)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border-2",
              value === type
                ? "bg-gradient-to-r from-red-600 to-red-700 text-white border-red-600 shadow-lg shadow-red-500/30"
                : "bg-white/30 border-red-300/50 hover:bg-white/50 hover:border-red-400 opacity-100 border-solid text-primary"
            )}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BloodTypeSelector;
