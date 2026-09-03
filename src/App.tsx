import { motion } from "motion/react";
import { useEffect, useState } from "react";
import GlowRings from "@/components/GlowRings";

const EASE = [0.16, 1, 0.3, 1] as const;

// Fixed target so the countdown stays consistent across reloads.
const TARGET_DATE = new Date("2026-09-15T12:00:00+03:00");

function useCountdown(target: Date) {
  const [left, setLeft] = useState(() => target.getTime() - Date.now());
  useEffect(() => {
    const id = setInterval(() => setLeft(target.getTime() - Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);
  const clamp = Math.max(left, 0);
  return {
    d: Math.floor(clamp / 86400000),
    h: Math.floor((clamp % 86400000) / 3600000),
    m: Math.floor((clamp % 3600000) / 60000),
    s: Math.floor((clamp % 60000) / 1000),
  };
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <motion.span
        key={value}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="font-sans text-4xl font-bold tabular-nums text-[#F5F5F0] sm:text-5xl"
      >
        {String(value).padStart(2, "0")}
      </motion.span>
      <span className="text-xs text-[#8A8A85]">{label}</span>
    </div>
  );
}

function Hero() {
  const { d, h, m, s } = useCountdown(TARGET_DATE);

  return (
    <header className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      <GlowRings />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative z-10 flex flex-col items-center"
      >
        <span className="mb-8 text-sm text-[#8A8A85]">ELSC</span>

        <h1 className="max-w-3xl font-sans text-[3rem] font-black leading-[1.05] tracking-tight text-[#F5F5F0] sm:text-[4.5rem]">
          Şu an hizmet veremiyoruz.
        </h1>

        <p className="mt-8 max-w-xl text-base leading-relaxed text-[#8A8A85] sm:text-lg">
          elsc.com.tr, Kişisel Verilerin Korunması Kanunu kapsamında yürütülen
          bir veri güvenliği incelemesi nedeniyle geçici olarak erişime
          kapatılmıştır. İnceleme tamamlandığında sistem yeniden açılacaktır.
        </p>

        <div className="mt-14 flex items-center gap-6 sm:gap-10">
          <TimeBlock value={d} label="gün" />
          <span className="text-2xl text-[#3A3A38]">:</span>
          <TimeBlock value={h} label="saat" />
          <span className="text-2xl text-[#3A3A38]">:</span>
          <TimeBlock value={m} label="dakika" />
          <span className="text-2xl text-[#3A3A38]">:</span>
          <TimeBlock value={s} label="saniye" />
        </div>

        <a
          href="mailto:kvkk@elsc.com.tr"
          className="mt-14 border-b border-[#3A3A38] pb-1 text-sm text-[#F5F5F0] outline-offset-4 transition-colors hover:border-[#F5F5F0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5B6EF5]"
        >
          kvkk@elsc.com.tr
        </a>
      </motion.div>
    </header>
  );
}

const details = [
  {
    title: "Neden kapalı?",
    body: "6698 sayılı Kişisel Verilerin Korunması Kanunu'nun 12. maddesi uyarınca, mevcut veri güvenliği tedbirleri bağımsız bir inceleme sürecinden geçiriliyor. İnceleme tamamlanana kadar erişim geçici olarak kısıtlanmıştır.",
  },
  {
    title: "Verileriniz ne durumda?",
    body: "Yalnızca web erişimi etkilenmektedir. Sistemde kayıtlı kullanıcı verileri, inceleme süresi boyunca güvenli ortamda saklanmaya devam etmektedir; herhangi bir veri kaybı söz konusu değildir.",
  },
  {
    title: "Ne zaman açılacak?",
    body: "İnceleme süreci tamamlandığında ve gerekli onaylar alındığında sistem yeniden hizmete açılacaktır. Yukarıdaki geri sayım, sürecin tahmini tamamlanma zamanını göstermektedir.",
  },
];

function Details() {
  return (
    <section className="relative mx-auto max-w-2xl px-6 py-28">
      <div className="flex flex-col gap-16">
        {details.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
            className="border-t border-[#1A1A1A] pt-8"
          >
            <h2 className="text-xl font-semibold text-[#F5F5F0]">{item.title}</h2>
            <p className="mt-3 leading-relaxed text-[#8A8A85]">{item.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#1A1A1A] px-6 py-10">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-2 text-center text-xs text-[#5A5A57]">
        <p>© 2026 ELSC Anonim Şirketi</p>
        <p>Bu sayfa süreçteki gelişmelere göre güncellenir.</p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] font-sans text-[#F5F5F0] antialiased">
      <Hero />
      <Details />
      <Footer />
    </div>
  );
}
