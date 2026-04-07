import { useState } from "react";
import { User, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";
import BloodTypeSelector from "./BloodTypeSelector";

interface FormData {
  fullName: string;
  phone1: string;
  phone2: string;
  wilaya: string;
  municipality: string;
  bloodType: string;
}

const DonationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone1: "",
    phone2: "",
    wilaya: "",
    municipality: "",
    bloodType: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast.success("تم التسجيل بنجاح! جزاك الله خيراً", {
      description: "سيتم التواصل معك عند الحاجة",
    });
    
    setFormData({
      fullName: "",
      phone1: "",
      phone2: "",
      wilaya: "",
      municipality: "",
      bloodType: "",
    });
    
    setIsSubmitting(false);
  };

  const inputClassName = 
    "w-full px-5 py-3 pr-12 rounded-full bg-white/20 border border-red-300/50 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-400 transition-all duration-300 backdrop-blur-sm text-white";

  return (
    <form onSubmit={handleSubmit} className="space-y-4" dir="rtl">
      {/* Full Name */}
      <div className="relative">
        <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-600" />
        <input
          type="text"
          placeholder="الاسم الكامل *"
          value={formData.fullName}
          onChange={(e) => handleChange("fullName", e.target.value)}
          className={inputClassName}
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
          className={inputClassName}
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
          <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-600" />
          <input
            type="text"
            placeholder="الولاية"
            value={formData.wilaya}
            onChange={(e) => handleChange("wilaya", e.target.value)}
            className={inputClassName}
          />
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
