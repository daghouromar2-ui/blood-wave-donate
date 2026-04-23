import { Link } from "react-router-dom";
import FloatingBackground from "@/components/BloodDonation/FloatingBackground";
import GlassCard from "@/components/BloodDonation/GlassCard";
import HandsHeartIcon from "@/components/BloodDonation/HandsHeartIcon";
import MessageBox from "@/components/BloodDonation/MessageBox";
import DonationForm from "@/components/BloodDonation/DonationForm";

const Index = () => {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4">
      <FloatingBackground />
      
      <div className="relative z-10 w-full max-w-md py-8">
        {/* Hero Header */}
        <div className="text-center mb-5 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/30 mb-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-white/95 text-xs font-medium">+50 متبرع مسجل في القرارة</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white drop-shadow-lg mb-1.5 tracking-tight">
            كن سبباً في إنقاذ حياة
          </h1>
          <p className="text-red-50/90 text-sm font-medium">
            سجّل كمتبرع بالدم — القرارة 🩸
          </p>
        </div>

        <GlassCard>
          <HandsHeartIcon />
          <MessageBox />
          <DonationForm />
        </GlassCard>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-white/60 text-xs font-medium tracking-wider">
            Nova Vision DZ
          </p>
          <Link
            to="/login"
            className="inline-block mt-2 text-white/30 hover:text-white/70 text-[10px] tracking-wide transition-colors"
          >
            Admin
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
