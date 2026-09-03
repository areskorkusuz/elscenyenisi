import { motion } from "motion/react";

// A single soft glow breathing behind the hero, with two static concentric
// rings — evokes an official seal rather than decorative blobs.
export default function GlowRings() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="absolute h-[420px] w-[420px] rounded-full border border-white/[0.06]" />
      <div className="absolute h-[640px] w-[640px] rounded-full border border-white/[0.04]" />
      <motion.div
        className="absolute h-[520px] w-[520px] rounded-full bg-[#5B6EF5]/[0.10] blur-[110px]"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
