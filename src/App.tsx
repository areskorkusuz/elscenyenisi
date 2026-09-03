import { motion } from "motion/react";
import { useEffect, useState } from "react";
import SecuritySeal from "@/components/SecuritySeal";

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
    <div className="flex flex-col items-center gap-2 px-4 sm:px-6">
      <motion.span
        key={value}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="font-sans text-3xl font-bold tabular-nums text-[#F5F0EA] sm:text-4xl"
      >
        {String(value).padStart(2, "0")}
      </motion.span>
      <span className="text-[11px] tracking-wide text-[#8F8B84]">{label}</span>
    </div>
  );
}

function StatusBadge() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#201E1B] bg-[#0B0B0A] px-4 py-1.5 text-xs text-[#C9C5BE]">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E8B85C] opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#E8B85C]" />
      </span>
      İnceleme sürüyor
    </span>
  );
}

function Hero() {
  const { d, h, m, s } = useCountdown(TARGET_DATE);

  return (
    <header className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      <div className="absolute left-1/2 top-10 -translate-x-1/2 text-sm tracking-wide text-[#8F8B84]">
        ELSC
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative z-10 flex flex-col items-center"
      >
        <StatusBadge />

        <div className="-my-6">
          <SecuritySeal />
        </div>

        <h1 className="max-w-3xl font-sans text-[2.75rem] font-black leading-[1.05] tracking-tight text-[#F5F0EA] sm:text-[4rem]">
          Şu an hizmet veremiyoruz.
        </h1>

        <p className="mt-8 max-w-xl text-base leading-relaxed text-[#8F8B84] sm:text-lg">
          elscservice.store, Kişisel Verilerin Korunması Kanunu kapsamında yürütülen
          bir veri güvenliği incelemesi nedeniyle geçici olarak erişime
          kapatılmıştır. İnceleme tamamlandığında sistem yeniden açılacaktır.
        </p>

        <div className="mt-14 flex items-center divide-x divide-[#201E1B] rounded-2xl border border-[#201E1B] bg-[#0B0B0A]/60">
          <TimeBlock value={d} label="gün" />
          <TimeBlock value={h} label="saat" />
          <TimeBlock value={m} label="dakika" />
          <TimeBlock value={s} label="saniye" />
        </div>

        <a
          href="mailto:kvkk@elscservice.store"
          className="mt-14 border-b border-[#201E1B] pb-1 text-sm text-[#F5F0EA] outline-offset-4 transition-colors hover:border-[#4C7CF0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4C7CF0]"
        >
          kvkk@elscservice.store
        </a>
      </motion.div>
    </header>
  );
}

const steps = [
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
      <div className="relative flex flex-col gap-16 border-l border-[#1A1817] pl-8 sm:pl-10">
        {steps.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
            className="relative"
          >
            <span className="absolute -left-[41px] top-1 flex h-6 w-6 items-center justify-center rounded-full border border-[#201E1B] bg-[#050505] text-xs text-[#8F8B84] sm:-left-[49px]">
              {i + 1}
            </span>
            <h2 className="text-xl font-semibold text-[#F5F0EA]">{item.title}</h2>
            <p className="mt-3 leading-relaxed text-[#8F8B84]">{item.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto max-w-2xl px-6 pb-16">
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-[#1A1817] bg-[#0B0B0A]/60 px-8 py-10 text-center">
        <p className="text-sm text-[#C9C5BE]">
          Sorularınız için{" "}
          <a
            href="mailto:kvkk@elscservice.store"
            className="text-[#F5F0EA] underline decoration-[#201E1B] underline-offset-4 hover:decoration-[#4C7CF0]"
          >
            kvkk@elscservice.store
          </a>{" "}
          adresinden bize ulaşabilirsiniz.
        </p>
        <div className="mt-4 flex flex-col items-center gap-1 text-xs text-[#5A5652]">
          <p>© 2026 ELSC Anonim Şirketi</p>
          <p>Bu sayfa süreçteki gelişmelere göre güncellenir.</p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] font-sans text-[#F5F0EA] antialiased">
      <Hero />
      <Details />
      <Footer />
    </div>
  );
}
