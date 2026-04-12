import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import FloatingBackground from "@/components/BloodDonation/FloatingBackground";
import GlassCard from "@/components/BloodDonation/GlassCard";
import { Mail, Lock, LogIn } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(email, password);
      toast.success("تم تسجيل الدخول بنجاح");
      navigate("/dashboard");
    } catch {
      toast.error("خطأ في البريد الإلكتروني أو كلمة المرور");
    } finally {
      setLoading(false);
    }
  };

  const inputClassName =
    "w-full px-5 py-3 pr-12 rounded-full border border-red-300/50 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-400 transition-all duration-300 backdrop-blur-sm text-white bg-white/20 placeholder:text-white/50";

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4">
      <FloatingBackground />
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white drop-shadow-lg mb-1">لوحة التحكم</h1>
          <p className="text-red-100/80 text-sm">تسجيل دخول المسؤول</p>
        </div>
        <GlassCard>
          <form onSubmit={handleSubmit} className="space-y-4" dir="rtl">
            <div className="relative">
              <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-600" />
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClassName}
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-600" />
              <input
                type="password"
                placeholder="كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClassName}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-full font-bold text-lg text-white transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-2"
              style={{
                background: "linear-gradient(135deg, #991b1b 0%, #dc2626 50%, #b91c1c 100%)",
                boxShadow: "0 8px 32px rgba(185, 28, 28, 0.4)",
              }}
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  تسجيل الدخول
                </>
              )}
            </button>
          </form>
        </GlassCard>
      </div>
    </div>
  );
};

export default Login;
