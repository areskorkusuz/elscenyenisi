import { motion, useMotionValue, useMotionTemplate } from "motion/react";
import { useEffect, useState } from "react";
import AnimatedGrid from "@/components/AnimatedGrid";
import SpotlightCard from "@/components/SpotlightCard";
import Counter from "@/components/Counter";
import Marquee from "@/components/Marquee";
import MagneticButton from "@/components/MagneticButton";

const EASE = [0.16, 1, 0.3, 1] as const;

function useCountdown(target: Date) {
  const [left, setLeft] = useState(() => target.getTime() - Date.now());
  useEffect(() => {
    const id = setInterval(() => setLeft(target.getTime() - Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);
  const clamp = Math.max(left, 0);
  const d = Math.floor(clamp / 86400000);
  const h = Math.floor((clamp % 86400000) / 3600000);
  const m = Math.floor((clamp % 3600000) / 60000);
  const s = Math.floor((clamp % 60000) / 1000);
  return { d, h, m, s };
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[64px] overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] py-3 text-center sm:w-[76px]">
        <motion.span
          key={value}
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="block font-mono text-2xl font-extrabold tabular-nums text-white sm:text-3xl"
        >
          {String(value).padStart(2, "0")}
        </motion.span>
      </div>
      <span className="mt-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/40">
        {label}
      </span>
    </div>
  );
}

function CursorGlowHero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const bg = useMotionTemplate`radial-gradient(600px circle at ${mx}px ${my}px, rgba(255,255,255,0.08), transparent 65%)`;

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - rect.left);
        my.set(e.clientY - rect.top);
      }}
      className="relative"
    >
      <motion.div className="pointer-events-none absolute inset-0" style={{ background: bg }} />
      <HeroContent />
    </motion.div>
  );
}

function HeroContent() {
  const target = new Date(Date.now() + 1000 * 60 * 60 * 41 + 1000 * 60 * 12);
  const { d, h, m, s } = useCountdown(target);

  return (
    <div className="relative z-10 px-5 pb-20 pt-8 sm:px-10 lg:px-16">
      {/* top bar */}
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="mb-16 flex items-center justify-between sm:mb-24"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg font-black tracking-tight text-white">ELSC</span>
          <span className="text-lg font-black text-white/60">.</span>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] py-1.5 pl-2.5 pr-3.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white/80" />
          </span>
          <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-white/60 sm:text-[11px]">
            Sistem Devre Dışı
          </span>
        </div>
      </motion.header>

      <div className="mx-auto max-w-3xl lg:mx-0">

      {/* eyebrow */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        className="mb-6 flex items-center gap-3"
      >
        <span className="h-[2px] w-7 bg-gradient-to-r from-white/50 to-transparent" />
        <span className="font-sans text-[11px] font-extrabold uppercase tracking-[0.22em] text-white/45">
          KVKK · 6698 Sayılı Kanun · Erişim Kısıtlaması
        </span>
      </motion.div>

      {/* headline */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
        className="mb-7 text-[2.6rem] font-black leading-[0.96] tracking-[-0.03em] sm:text-[4.2rem] lg:text-[5.4rem]"
      >
        Şu an
        <br />
        <span className="bg-gradient-to-r from-white via-white/70 to-white/30 bg-clip-text text-transparent">
          kapalıyız.
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.28, ease: EASE }}
        className="mb-12 max-w-xl text-[15px] font-semibold leading-relaxed text-white/50 sm:text-base"
      >
        elsc.com.tr, <b className="font-extrabold text-white">Kişisel Verilerin Korunması Kanunu</b>{" "}
        kapsamında yürütülen bir veri güvenliği incelemesi nedeniyle geçici olarak
        hizmet dışı bırakılmıştır. İnceleme tamamlandığında sistem yeniden devreye
        alınacaktır.
      </motion.p>

      {/* countdown */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
        className="mb-12 flex items-center gap-3 sm:gap-4"
      >
        <TimeBlock value={d} label="Gün" />
        <span className="pb-5 text-xl font-black text-white/20">:</span>
        <TimeBlock value={h} label="Saat" />
        <span className="pb-5 text-xl font-black text-white/20">:</span>
        <TimeBlock value={m} label="Dakika" />
        <span className="pb-5 text-xl font-black text-white/20">:</span>
        <TimeBlock value={s} label="Saniye" />
      </motion.div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
        className="flex flex-wrap items-center gap-3"
      >
        <MagneticButton
          href="mailto:kvkk@elsc.com.tr"
          className="group flex items-center gap-2.5 rounded-xl bg-white px-7 py-4 text-sm font-extrabold text-black shadow-[0_8px_24px_-6px_rgba(255,255,255,0.25)] transition-shadow hover:shadow-[0_12px_32px_-6px_rgba(255,255,255,0.4)]"
        >
          kvkk@elsc.com.tr
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </MagneticButton>
        <MagneticButton
          href="#detay"
          className="flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/[0.03] px-7 py-4 text-sm font-extrabold text-white transition-colors hover:border-white/30 hover:bg-white/[0.06]"
        >
          Detayları Gör
        </MagneticButton>
      </motion.div>
      </div>
    </div>
  );
}

const infoCards = [
  {
    n: "01",
    title: "Durum",
    body: "Erişim, veri güvenliği incelemesi tamamlanana kadar geçici olarak kısıtlanmıştır.",
  },
  {
    n: "02",
    title: "Gerekçe",
    body: "6698 sayılı KVKK'nın 12. maddesi uyarınca alınan veri güvenliği tedbirleri gözden geçiriliyor.",
  },
  {
    n: "03",
    title: "Kapsam",
    body: "Yalnızca web erişimi etkilenmektedir; kullanıcı verileri güvenli ortamda saklanmaya devam ediyor.",
  },
  {
    n: "04",
    title: "İletişim",
    body: "Sorularınız için doğrudan KVKK ekibimize e-posta yoluyla ulaşabilirsiniz.",
  },
];

function InfoSection() {
  return (
    <section id="detay" className="relative z-10 px-5 py-20 sm:px-10 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: EASE }}
        className="mb-10 flex items-end justify-between"
      >
        <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
          Ne oluyor,<br className="sm:hidden" /> neden oluyor.
        </h2>
        <span className="hidden font-mono text-xs font-bold text-white/30 sm:block">
          §12 / KVKK
        </span>
      </motion.div>

      <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4">
        {infoCards.map((c, i) => (
          <SpotlightCard key={c.n} index={i} className="rounded-2xl p-6">
            <div className="mb-8 font-mono text-xs font-extrabold text-white/40">{c.n}</div>
            <h3 className="mb-2.5 text-lg font-extrabold text-white">{c.title}</h3>
            <p className="text-[13.5px] font-semibold leading-relaxed text-white/45">{c.body}</p>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="relative z-10 border-y border-white/10 bg-white/[0.015] px-5 py-14 sm:px-10 lg:px-16">
      <div className="grid grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <div className="text-3xl font-black text-white sm:text-4xl">
            <Counter value={128} />
            <span className="text-white/50">bin+</span>
          </div>
          <p className="mt-1.5 text-[11px] font-extrabold uppercase tracking-[0.12em] text-white/35">
            Korunan Kullanıcı Kaydı
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
        >
          <div className="text-3xl font-black text-white sm:text-4xl">
            <Counter value={100} suffix="%" />
          </div>
          <p className="mt-1.5 text-[11px] font-extrabold uppercase tracking-[0.12em] text-white/35">
            Veri Bütünlüğü
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.16, ease: EASE }}
        >
          <div className="text-3xl font-black text-white sm:text-4xl">
            <Counter value={24} suffix="/7" />
          </div>
          <p className="mt-1.5 text-[11px] font-extrabold uppercase tracking-[0.12em] text-white/35">
            İzleme Altında
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0b] font-sans text-white">
      {/* fixed top progress shimmer */}
      <div className="fixed inset-x-0 top-0 z-50 h-[3px] animate-[shimmer_3s_linear_infinite] bg-[length:200%_100%] bg-gradient-to-r from-white/10 via-white/50 to-white/10" />

      {/* ambient radial glows */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-40 right-[-10%] h-[600px] w-[700px] rounded-full bg-white/[0.06] blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[500px] w-[600px] rounded-full bg-white/[0.04] blur-[120px]" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-0">
        <AnimatedGrid />
      </div>

      {/* noise */}
      <div
        className="pointer-events-none fixed inset-0 z-40 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <CursorGlowHero />

      <Marquee
        items={[
          "KVKK MADDE 12",
          "VERİ GÜVENLİĞİ İNCELEMESİ",
          "GEÇİCİ ERİŞİM KISITLAMASI",
          "ELSC ANONİM ŞİRKETİ",
        ]}
      />

      <InfoSection />
      <StatsSection />

      <footer className="relative z-10 flex flex-col items-center justify-between gap-4 px-5 py-10 text-center sm:flex-row sm:px-10 sm:text-left lg:px-16">
        <p className="text-[11px] font-extrabold tracking-wide text-white/30">
          © 2026 ELSC ANONİM ŞİRKETİ — TÜM HAKLARI SAKLIDIR
        </p>
        <p className="text-[11px] font-extrabold tracking-wide text-white/30">
          SAYFA OTOMATİK OLARAK GÜNCELLENİR
        </p>
      </footer>
    </div>
  );
}
