import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertTriangle, MessageCircle, Phone } from "lucide-react";
import { BLOOD_TYPES, ELIGIBILITY_DAYS } from "@/lib/constants";
import type { Donor } from "@/lib/constants";
import { BLOOD_TYPE_COLORS } from "@/lib/constants";
import { differenceInDays } from "date-fns";

interface EmergencyModalProps {
  donors: Donor[];
}

const EmergencyModal = ({ donors }: EmergencyModalProps) => {
  const [selectedType, setSelectedType] = useState("");
  const [location, setLocation] = useState("");
  const [open, setOpen] = useState(false);

  const today = new Date();
  const eligibleDonors = donors.filter((d) => {
    if (!d.is_active) return false;
    if (selectedType && d.blood_type !== selectedType) return false;
    if (!d.last_donation_date) return true;
    return differenceInDays(today, new Date(d.last_donation_date)) >= ELIGIBILITY_DAYS;
  });

  const getMessage = (donor: Donor) => {
    const msg = `السلام عليكم ورحمة الله وبركاته\n\nأخي الكريم ${donor.full_name}، نحتاج متبرع بفصيلة ${selectedType || donor.blood_type} بشكل عاجل${location ? ` في ${location}` : ""}.\n\nهل يمكنك التبرع؟ جزاك الله خيراً.`;
    return encodeURIComponent(msg);
  };

  const sendToAll = () => {
    eligibleDonors.forEach((donor) => {
      const phone = donor.phone_whatsapp.replace(/[^0-9]/g, "");
      window.open(`https://wa.me/${phone}?text=${getMessage(donor)}`, "_blank");
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="px-6 py-3 rounded-full font-bold text-white flex items-center gap-2 animate-pulse hover:animate-none transition-all"
          style={{
            background: "linear-gradient(135deg, #991b1b, #dc2626)",
            boxShadow: "0 4px 20px rgba(220,38,38,0.5)",
          }}
        >
          <AlertTriangle className="w-5 h-5" />
          طلب دم عاجل
        </button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900/95 border-red-500/30 text-white max-w-lg backdrop-blur-xl" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-xl text-red-400 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6" />
            طلب دم عاجل
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Blood type selector */}
          <div>
            <label className="text-sm text-white/70 mb-2 block">فصيلة الدم المطلوبة</label>
            <div className="flex flex-wrap gap-2">
              {BLOOD_TYPES.map((type) => {
                const colors = BLOOD_TYPE_COLORS[type];
                return (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-4 py-2 rounded-full text-sm font-bold border transition-all ${
                      selectedType === type
                        ? `${colors.bg} ${colors.text} ${colors.border} ring-2 ring-offset-1 ring-offset-gray-900`
                        : "bg-white/10 border-white/20 text-white/60 hover:bg-white/20"
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="text-sm text-white/70 mb-2 block">الموقع</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="مثال: مستشفى القرارة"
              className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-4 py-2 text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-red-500/50"
            />
          </div>

          {/* Results */}
          <div className="border-t border-white/10 pt-4">
            <p className="text-sm text-white/70 mb-3">
              عدد المتبرعين المؤهلين: <span className="text-emerald-400 font-bold">{eligibleDonors.length}</span>
            </p>

            <div className="max-h-48 overflow-y-auto space-y-2">
              {eligibleDonors.slice(0, 20).map((donor) => (
                <div key={donor.id} className="flex items-center justify-between bg-white/5 rounded-xl px-3 py-2">
                  <div>
                    <p className="text-sm font-medium">{donor.full_name}</p>
                    <p className="text-xs text-white/50">{donor.blood_type} — {donor.wilaya}</p>
                  </div>
                  <div className="flex gap-2">
                    <a href={`tel:${donor.phone_whatsapp}`} className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center hover:bg-blue-500/40">
                      <Phone className="w-4 h-4 text-blue-400" />
                    </a>
                    <a
                      href={`https://wa.me/${donor.phone_whatsapp.replace(/[^0-9]/g, "")}?text=${getMessage(donor)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center hover:bg-emerald-500/40"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-400" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {eligibleDonors.length > 0 && (
              <button
                onClick={sendToAll}
                className="w-full mt-4 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                إرسال رسالة لجميع المؤهلين ({eligibleDonors.length})
              </button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmergencyModal;
