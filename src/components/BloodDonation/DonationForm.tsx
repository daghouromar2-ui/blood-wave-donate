import { useState } from "react";
import { User, Phone, MapPin, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import BloodTypeSelector from "./BloodTypeSelector";
import SuccessScreen from "./SuccessScreen";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ALGERIAN_WILAYAS } from "@/lib/wilayas";

interface FormData {
  fullName: string;
  phone1: string;
  phone2: string;
  wilaya: string;
  municipality: string;
  bloodType: string;
  lastDonation: Date | undefined;
}

const DonationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone1: "",
    phone2: "",
    wilaya: "",
    municipality: "",
    bloodType: "",
    lastDonation: undefined,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  const resetForm = () => {
    setFormData({
      fullName: "",
      phone1: "",
      phone2: "",
      wilaya: "",
      municipality: "",
      bloodType: "",
      lastDonation: undefined,
    });
    setSubmittedName(null);
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.phone1 || !formData.bloodType) {
      toast.error("الرجاء ملء جميع الحقول المطلوبة");
      return;
    }

    setIsSubmitting(true);
    
    const { error } = await supabase.from("donors").insert({
      full_name: formData.fullName,
      phone_whatsapp: formData.phone1,
      phone_secondary: formData.phone2 || null,
      wilaya: formData.wilaya || null,
      municipality: formData.municipality || null,
      blood_type: formData.bloodType,
      last_donation_date: formData.lastDonation ? format(formData.lastDonation, "yyyy-MM-dd") : null,
    });

    if (error) {
      toast.error("حدث خطأ أثناء التسجيل. الرجاء المحاولة مرة أخرى");
      console.error(error);
    } else {
      setSubmittedName(formData.fullName);
    }

    setIsSubmitting(false);
  };

  if (submittedName) {
    return <SuccessScreen donorName={submittedName} onRegisterAnother={resetForm} />;
  }

  const inputClassName = 
    "w-full px-5 py-3 pr-12 rounded-full border border-red-300/50 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-400 transition-all duration-300 backdrop-blur-sm bg-primary-foreground text-primary";

  return (
    <form onSubmit={handleSubmit} className="space-y-4" dir="rtl">
      {/* Full Name */}
      <div className="relative">
        <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-600" />
        <input
          type="text"
          placeholder="الإسم الكامل *"
          value={formData.fullName}
          onChange={(e) => handleChange("fullName", e.target.value)}
          className={inputClassName.replace("bg-primary-foreground", "bg-secondary-foreground").replace("text-primary", "text-secondary")}
        />
      </div>

      {/* Phone 1 */}
      <div className="relative">
        <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-600" />
        <input
          type="tel"
          placeholder="رقم الهاتف1 (واتساب) *"
          value={formData.phone1}
          onChange={(e) => handleChange("phone1", e.target.value)}
          className={inputClassName.replace("bg-primary-foreground", "bg-destructive-foreground")}
        />
      </div>

      {/* Phone 2 */}
      <div className="relative">
        <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500/70" />
        <input
          type="tel"
          placeholder="رقم الهاتف 2 (إن وجد)"
          value={formData.phone2}
          onChange={(e) => handleChange("phone2", e.target.value)}
          className={inputClassName}
        />
      </div>

      {/* Location Row */}
      <div className="grid grid-cols-2 gap-3">
        <div className="relative">
          <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-600 z-10 pointer-events-none" />
          <Select value={formData.wilaya} onValueChange={(v) => handleChange("wilaya", v)}>
            <SelectTrigger
              dir="rtl"
              className={`${inputClassName} h-auto justify-between [&>span]:text-right ${formData.wilaya ? "" : "[&>span]:text-black/50"}`}
            >
              <SelectValue placeholder="الولاية" />
            </SelectTrigger>
            <SelectContent dir="rtl" className="max-h-72 bg-background">
              {ALGERIAN_WILAYAS.map((w) => (
                <SelectItem key={w} value={w} className="text-right">
                  {w}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="relative">
          <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-600" />
          <input
            type="text"
            placeholder="البلدية"
            value={formData.municipality}
            onChange={(e) => handleChange("municipality", e.target.value)}
            className={inputClassName}
          />
        </div>
      </div>

      {/* Blood Type */}
      <BloodTypeSelector
        value={formData.bloodType}
        onChange={(value) => handleChange("bloodType", value)}
      />

      {/* Last Donation Date */}
      <div className="space-y-2" dir="rtl">
        <label className="text-sm font-medium text-primary-foreground">متى آخر مرة قمت بالتبرع؟</label>
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className={`${inputClassName} flex items-center justify-between cursor-pointer`}
            >
              <span className={formData.lastDonation ? "text-black" : "text-black/50"}>
                {formData.lastDonation
                  ? format(formData.lastDonation, "dd/MM/yyyy", { locale: ar })
                  : "اختر التاريخ"}
              </span>
              <CalendarIcon className="w-5 h-5 text-red-600" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-background border-red-300/50" align="start">
            <Calendar
              mode="single"
              selected={formData.lastDonation}
              onSelect={(date) => setFormData((prev) => ({ ...prev, lastDonation: date }))}
              disabled={(date) => date > new Date()}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 mt-6 rounded-full font-bold text-lg text-white transition-all duration-300 disabled:opacity-70"
        style={{
          background: "linear-gradient(135deg, #991b1b 0%, #dc2626 50%, #b91c1c 100%)",
          boxShadow: "0 8px 32px rgba(185, 28, 28, 0.4), 0 0 20px rgba(220, 38, 38, 0.3)",
        }}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            جاري التسجيل...
          </span>
        ) : (
          "تسجيل كمتبرع"
        )}
      </button>
    </form>
  );
};

export default DonationForm;
