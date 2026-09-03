export default function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items, ...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-black/40 py-3">
      <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-10 whitespace-nowrap">
        {row.map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-10 text-[11px] font-extrabold uppercase tracking-[0.2em] text-white/35"
          >
            {t}
            <span className="text-white/40">✦</span>
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0a0a0b] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0a0a0b] to-transparent" />
    </div>
  );
}
