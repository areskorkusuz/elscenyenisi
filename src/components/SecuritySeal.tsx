import { motion } from "motion/react";

// A glass-and-light seal built from a hexagon (the "under review" case file)
// wrapped around a shield (data security). Rhymes with an official mark
// rather than a decorative blob — grounded in what the page is actually about.
export default function SecuritySeal() {
  return (
    <div className="pointer-events-none relative flex h-[280px] w-[280px] items-center justify-center sm:h-[340px] sm:w-[340px]">
      {/* ambient bloom */}
      <div className="absolute h-full w-full rounded-full bg-[#4C7CF0]/[0.14] blur-[90px]" />

      {/* slow-turning case-file ring */}
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute h-full w-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <polygon
          points="100,10 173,55 173,145 100,190 27,145 27,55"
          fill="none"
          stroke="#4C7CF0"
          strokeOpacity="0.35"
          strokeWidth="1"
        />
        <polygon
          points="100,10 173,55 173,145 100,190 27,145 27,55"
          fill="none"
          stroke="#E8B85C"
          strokeOpacity="0.5"
          strokeWidth="1"
          strokeDasharray="2 10"
        />
      </motion.svg>

      {/* breathing inner glow */}
      <motion.div
        className="absolute h-[62%] w-[62%] rounded-full bg-[#E8B85C]/[0.10] blur-[50px]"
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* the shield mark itself */}
      <svg viewBox="0 0 100 116" className="relative h-[34%] w-[34%] drop-shadow-[0_0_24px_rgba(76,124,240,0.55)]">
        <defs>
          <linearGradient id="shieldFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F5F0EA" />
            <stop offset="55%" stopColor="#C9D4F8" />
            <stop offset="100%" stopColor="#4C7CF0" />
          </linearGradient>
        </defs>
        <path
          d="M50 2 L94 18 V54 C94 84 76 104 50 114 C24 104 6 84 6 54 V18 Z"
          fill="url(#shieldFill)"
          fillOpacity="0.14"
          stroke="url(#shieldFill)"
          strokeWidth="2.5"
        />
        <path
          d="M32 58 L44 70 L70 42"
          fill="none"
          stroke="#F5F0EA"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
