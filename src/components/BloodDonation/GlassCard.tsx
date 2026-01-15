import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
}

const GlassCard = ({ children }: GlassCardProps) => {
  return (
    <div
      className="w-full max-w-md mx-auto p-6 rounded-3xl border border-white/40"
      style={{
        background: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
      }}
    >
      {children}
    </div>
  );
};

export default GlassCard;
