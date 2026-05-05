import { Heart, Share2, CheckCircle2 } from "lucide-react";

interface SuccessScreenProps {
  donorName: string;
  onRegisterAnother: () => void;
}

const SuccessScreen = ({ donorName, onRegisterAnother }: SuccessScreenProps) => {
  const shareText = `لقد سجّلتُ كمتبرع بالدم في القرارة 🩸❤️\nانضم إلينا وكن سبباً في إنقاذ حياة:`;
  const shareUrl = typeof window !== "undefined" ? window.location.origin : "";

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "التبرع بالدم - القرارة", text: shareText, url: shareUrl });
      } catch {
        // user cancelled
      }
    } else {
      const wa = `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`;
      window.open(wa, "_blank");
    }
  };

  const firstName = donorName.trim().split(/\s+/)[0] || "";

  return (
    <div className="text-center py-6 animate-fade-in" dir="rtl">
      {/* Animated success icon */}
      <div className="relative flex justify-center mb-5">
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-28 h-28 rounded-full bg-white/30 animate-ping" />
        </div>
        <div
          className="relative w-24 h-24 rounded-full flex items-center justify-center animate-scale-in"
          style={{
            background: "linear-gradient(135deg, #991b1b 0%, #dc2626 50%, #b91c1c 100%)",
            boxShadow: "0 12px 40px rgba(220,38,38,0.5), inset 0 2px 0 rgba(255,255,255,0.3)",
          }}
        >
          <CheckCircle2 className="w-14 h-14 text-white" strokeWidth={2.5} />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white drop-shadow-md mb-2">
        شكراً {firstName} 🦸‍♂️
      </h2>
      <p className="text-white/95 text-base font-medium mb-1">
        أنت بطل حقيقي
      </p>
      <p className="text-white/80 text-sm mb-5 leading-relaxed px-2">
        تم تسجيلك بنجاح في قاعدة المتبرعين.
        <br />
        سنتواصل معك عند الحاجة بإذن اللّٰه.
      </p>

      {/* Impact card */}
      <div
        className="rounded-2xl p-4 mb-5 mx-auto"
        style={{
          background: "linear-gradient(135deg, rgba(127,29,29,0.85) 0%, rgba(220,38,38,0.85) 100%)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Heart className="w-5 h-5 text-white animate-pulse" fill="white" />
          <p className="text-white font-bold text-sm">تبرعك قد ينقذ 3 أرواح</p>
          <Heart className="w-5 h-5 text-white animate-pulse" fill="white" />
        </div>
        <p className="text-white/90 text-xs leading-relaxed">
          { "{ وَمَنْ أَحْيَاهَا فَكَأَنَّمَا أَحْيَا النَّاسَ جَمِيعًا }" }
        </p>
      </div>

      {/* Share button */}
      <button
        type="button"
        onClick={handleShare}
        className="w-full py-3.5 mb-3 rounded-full font-bold text-white flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02]"
        style={{
          background: "linear-gradient(135deg, #16a34a 0%, #22c55e 100%)",
          boxShadow: "0 8px 24px rgba(22,163,74,0.4)",
        }}
      >
        <Share2 className="w-5 h-5" />
        شارك وادعُ أصدقاءك للتبرع
      </button>

      <button
        type="button"
        onClick={onRegisterAnother}
        className="w-full py-3 rounded-full font-medium text-white/90 border border-white/40 hover:bg-white/10 transition-all duration-300 text-sm"
      >
        تسجيل متبرع آخر
      </button>
    </div>
  );
};

export default SuccessScreen;
