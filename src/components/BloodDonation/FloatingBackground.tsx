import { useEffect, useState } from "react";

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  type: "droplet" | "heart";
  delay: number;
  duration: number;
}

const FloatingBackground = () => {
  const [elements] = useState<FloatingElement[]>(() => {
    const items: FloatingElement[] = [];
    for (let i = 0; i < 15; i++) {
      items.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 10,
        type: Math.random() > 0.5 ? "droplet" : "heart",
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 15,
      });
    }
    return items;
  });

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated fluid gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-red-700 to-red-800">
        <div className="absolute inset-0 opacity-60">
          <div 
            className="absolute w-[800px] h-[800px] rounded-full blur-3xl animate-pulse"
            style={{
              background: "radial-gradient(circle, rgba(220,38,38,0.8) 0%, rgba(127,29,29,0.4) 50%, transparent 70%)",
              top: "-20%",
              left: "-20%",
              animation: "float1 20s ease-in-out infinite",
            }}
          />
          <div 
            className="absolute w-[600px] h-[600px] rounded-full blur-3xl"
            style={{
              background: "radial-gradient(circle, rgba(239,68,68,0.7) 0%, rgba(153,27,27,0.3) 50%, transparent 70%)",
              bottom: "-10%",
              right: "-10%",
              animation: "float2 25s ease-in-out infinite",
            }}
          />
          <div 
            className="absolute w-[500px] h-[500px] rounded-full blur-3xl"
            style={{
              background: "radial-gradient(circle, rgba(248,113,113,0.6) 0%, rgba(185,28,28,0.2) 50%, transparent 70%)",
              top: "40%",
              left: "30%",
              animation: "float3 18s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      {/* Floating elements */}
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute opacity-20"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            animation: `floatElement ${el.duration}s ease-in-out infinite`,
            animationDelay: `${el.delay}s`,
          }}
        >
          {el.type === "droplet" ? (
            <svg
              width={el.size}
              height={el.size * 1.3}
              viewBox="0 0 24 32"
              fill="rgba(255,255,255,0.6)"
            >
              <path d="M12 0C12 0 0 14 0 22C0 28 5.4 32 12 32C18.6 32 24 28 24 22C24 14 12 0 12 0Z" />
            </svg>
          ) : (
            <svg
              width={el.size}
              height={el.size}
              viewBox="0 0 24 24"
              fill="rgba(255,200,200,0.5)"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
        </div>
      ))}

      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(50px, 30px) scale(1.1); }
          66% { transform: translate(-30px, 50px) scale(0.95); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, -30px) scale(1.05); }
          66% { transform: translate(30px, -40px) scale(0.9); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, -20px) scale(1.1); }
        }
        @keyframes floatElement {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-30px) rotate(10deg); opacity: 0.35; }
        }
      `}</style>
    </div>
  );
};

export default FloatingBackground;
