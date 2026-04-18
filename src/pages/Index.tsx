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
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-white drop-shadow-lg mb-1">
            التبرع بالدم
          </h1>
          <p className="text-red-100/80 text-sm">القرارة</p>
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
