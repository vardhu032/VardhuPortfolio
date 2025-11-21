import { useEffect, useRef, useState } from "react";

interface Props {
  isStrangerThingsMode: boolean;
}

const StrangerThingsHeroBackground = ({ isStrangerThingsMode }: Props) => {
  // Tentacle growth progress (0 to 1)
  const [tentacleProgress, setTentacleProgress] = useState(0);

  useEffect(() => {
    if (!isStrangerThingsMode) return;

    // Animate tentacles grow as user scrolls within hero
    const onScroll = () => {
      const hero = document.getElementById('hero-section');
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const windowH = window.innerHeight;
      let p = 1 - rect.top / windowH;
      p = Math.max(0, Math.min(1, p));
      setTentacleProgress(p);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [isStrangerThingsMode]);

  if (!isStrangerThingsMode) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" style={{ overflow: "hidden" }}>
      {/* Red Radial Gradient Sky */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 60% 25%, #ff4545 60%, #300 90%, #000 100%)",
          opacity: 0.85,
        }}
      />

      {/* Upside-down clouds as a SVG "brush" or as img - here is SVG */}
      <svg
        className="absolute top-0 left-0 w-full"
        height="280"
        width="100%"
        viewBox="0 0 1440 280"
        style={{ transform: "rotateX(180deg)", opacity: 0.90 }}
      >
        <defs>
          <linearGradient id="cloudGlow" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#d53343" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#111" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,30 Q200,80 400,60 Q600,40 800,100 Q1000,140 1200,60 Q1400,-10 1440,30 L1440,0 L0,0Z"
          fill="url(#cloudGlow)"
          filter="url(#glow)"
        />
      </svg>

      {/* Lightning flash - SVG animated */}
      <svg
        className="absolute left-1/2 -translate-x-1/2 top-10"
        width="120"
        height="100"
        viewBox="0 0 120 100"
        style={{ opacity: 0.8, zIndex: 1 }}
      >
        <polyline
          points="15,20 30,70 50,40 70,95"
          stroke="white"
          strokeWidth="5"
          fill="none"
        >
          <animate
            attributeName="opacity"
            values="1;0;1;0;1"
            keyTimes="0;0.2;0.4;0.6;1"
            dur="4s"
            repeatCount="indefinite"
          />
        </polyline>
      </svg>

      {/* Foreground Spikes/Trees as SVG */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        height="350"
        width="100%"
        viewBox="0 0 1440 350"
      >
        <path
          d="
            M0,350
            Q60,180 140,320
            Q180,250 210,350
            Q260,320 320,350
            Q340,310 370,350
            Q420,270 440,350
            Q500,240 600,350
            Q620,275 640,350
            Q800,200 860,350
            Q1000,280 1100,350
            Q1200,320 1240,350
            Q1280,310 1330,350
            Q1370,200 1440,350
            Z"
          fill="#140a0a"
          stroke="#350d0f"
          strokeWidth="4"
        />
      </svg>

      {/* Mist/Fog overlay */}
      <div
        className="absolute bottom-0 left-0 w-full h-48"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.85), rgba(40,0,0,0.15))",
          filter: "blur(6px)",
        }}
      />

      {/* Tentacles as SVGs - left and right */}
      <TentacleSVG side="left" progress={tentacleProgress} />
      <TentacleSVG side="right" progress={tentacleProgress} />
    </div>
  );
};

// TentacleSVG is a custom animated tentacle path
function TentacleSVG({ side, progress }: { side: "left" | "right", progress: number }) {
  const base = side === "left"
    ? "M40,390 Q70,300 150,250 Q220,190 350,180"
    : "M1400,390 Q1360,290 1300,210 Q1200,180 1080,172";
  // Animate tentacle path to grow with progress
  const dash = 510;
  return (
    <svg
      className={`absolute bottom-0 ${side === "left" ? "left-0" : "right-0"} z-20 pointer-events-none`}
      width="400"
      height="450"
    >
      <path
        d={base}
        stroke="#370e23"
        strokeWidth="26"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        style={{
          strokeDasharray: dash,
          strokeDashoffset: dash * (1 - progress),
          filter: "drop-shadow(0 0 32px #f22)"
        }}
      />
      <path
        d={base}
        stroke="#b84b64"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
        style={{
          strokeDasharray: dash,
          strokeDashoffset: dash * (1 - progress),
          filter: "drop-shadow(0 0 12px #f99)"
        }}
      />
    </svg>
  );
}

export default StrangerThingsHeroBackground;
