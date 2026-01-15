const HandsHeartIcon = () => {
  return (
    <div className="flex justify-center mb-4">
      <svg
        width="120"
        height="100"
        viewBox="0 0 120 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        {/* Left hand */}
        <path
          d="M15 70C15 70 20 50 25 45C30 40 35 42 35 48C35 54 30 60 30 60L25 70C25 70 20 75 15 70Z"
          fill="url(#handGradient)"
          stroke="#9f1239"
          strokeWidth="1.5"
        />
        <path
          d="M35 48C35 48 38 40 42 38C46 36 48 40 47 45C46 50 42 55 42 55"
          fill="url(#handGradient)"
          stroke="#9f1239"
          strokeWidth="1.5"
        />
        
        {/* Right hand */}
        <path
          d="M105 70C105 70 100 50 95 45C90 40 85 42 85 48C85 54 90 60 90 60L95 70C95 70 100 75 105 70Z"
          fill="url(#handGradient)"
          stroke="#9f1239"
          strokeWidth="1.5"
        />
        <path
          d="M85 48C85 48 82 40 78 38C74 36 72 40 73 45C74 50 78 55 78 55"
          fill="url(#handGradient)"
          stroke="#9f1239"
          strokeWidth="1.5"
        />
        
        {/* Heart */}
        <path
          d="M60 80C60 80 35 60 35 45C35 35 45 30 55 40L60 45L65 40C75 30 85 35 85 45C85 60 60 80 60 80Z"
          fill="url(#heartGradient)"
          stroke="#be123c"
          strokeWidth="2"
          className="animate-pulse"
        />
        
        {/* Heartbeat line */}
        <path
          d="M42 52 L50 52 L53 45 L57 60 L60 48 L63 55 L67 52 L78 52"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          className="animate-pulse"
        />
        
        <defs>
          <linearGradient id="heartGradient" x1="35" y1="30" x2="85" y2="80" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ef4444" />
            <stop offset="0.5" stopColor="#dc2626" />
            <stop offset="1" stopColor="#991b1b" />
          </linearGradient>
          <linearGradient id="handGradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fecaca" />
            <stop offset="1" stopColor="#fca5a5" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default HandsHeartIcon;
