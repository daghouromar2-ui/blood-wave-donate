import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Donor } from "@/lib/constants";
import { BLOOD_TYPE_COLORS, ELIGIBILITY_DAYS } from "@/lib/constants";
import { format, differenceInDays, differenceInYears } from "date-fns";
import { ar } from "date-fns/locale";
import { Phone, MessageCircle, MapPin, Calendar, Droplets, User } from "lucide-react";

interface DonorDetailsModalProps {
  donor: Donor | null;
  open: boolean;
  onClose: () => void;
}

const DonorDetailsModal = ({ donor, open, onClose }: DonorDetailsModalProps) => {
  if (!donor) return null;

  const today = new Date();
  const isEligible = !donor.last_donation_date || differenceInDays(today, new Date(donor.last_donation_date)) >= ELIGIBILITY_DAYS;
  const daysUntil = donor.last_donation_date
    ? Math.max(0, ELIGIBILITY_DAYS - differenceInDays(today, new Date(donor.last_donation_date)))
    : 0;
  const age = donor.date_of_birth ? differenceInYears(today, new Date(donor.date_of_birth)) : null;
  const colors = BLOOD_TYPE_COLORS[donor.blood_type] || { bg: "bg-gray-500/20", text: "text-gray-400", border: "border-gray-500/50" };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900/95 border-white/10 text-white max-w-md backdrop-blur-xl" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-lg flex items-center gap-2">
            <User className="w-5 h-5 text-red-400" />
            تفاصيل المتبرع
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Name & Blood Type */}
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">{donor.full_name}</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-bold border ${colors.bg} ${colors.text} ${colors.border}`}>
              {donor.blood_type}
            </span>
          </div>

          {/* Status */}
          <div className={`flex items-center gap-2 px-3 py-2 rounded-xl ${isEligible ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
            <span>{isEligible ? "✅ مؤهل للتبرع" : `❌ غير مؤهل - ${daysUntil} يوم متبقي`}</span>
          </div>

          {/* Details */}
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-white/40" />
              <span>{donor.phone_whatsapp}</span>
            </div>
            {donor.phone_secondary && (
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-white/40" />
                <span>{donor.phone_secondary}</span>
              </div>
            )}
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-white/40" />
              <span>{[donor.municipality, donor.wilaya].filter(Boolean).join("، ") || "غير محدد"}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-white/40" />
              <span>
                آخر تبرع:{" "}
                {donor.last_donation_date
                  ? format(new Date(donor.last_donation_date), "dd/MM/yyyy", { locale: ar })
                  : "لم يتبرع بعد"}
              </span>
            </div>
            {age !== null && (
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-white/40" />
                <span>العمر: {age} سنة</span>
              </div>
            )}
            <div className="flex items-center gap-3">
              <Droplets className="w-4 h-4 text-white/40" />
              <span>عدد التبرعات: {donor.total_donations}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <a
              href={`tel:${donor.phone_whatsapp}`}
              className="flex-1 py-2 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center gap-2 hover:bg-blue-500/30"
            >
              <Phone className="w-4 h-4" /> اتصال
            </a>
            <a
              href={`https://wa.me/${donor.phone_whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center gap-2 hover:bg-emerald-500/30"
            >
              <MessageCircle className="w-4 h-4" /> واتساب
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DonorDetailsModal;
