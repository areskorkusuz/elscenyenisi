import { useEffect, useRef } from "react";

export default function AnimatedGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let raf = 0;
    const cell = 46;
    let pulses: { x: number; y: number; life: number }[] = [];

    function resize() {
      if (!canvas) return;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      ctx!.scale(devicePixelRatio, devicePixelRatio);
    }
    resize();
    window.addEventListener("resize", resize);

    const spawnInterval = setInterval(() => {
      const cols = Math.floor(width / cell);
      const rows = Math.floor(height / cell);
      if (cols <= 0 || rows <= 0) return;
      pulses.push({
        x: Math.floor(Math.random() * cols) * cell,
        y: Math.floor(Math.random() * rows) * cell,
        life: 0,
      });
      if (pulses.length > 8) pulses.shift();
    }, 900);

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = "rgba(255,255,255,0.045)";
      ctx.lineWidth = 1;
      for (let x = 0; x <= width; x += cell) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += cell) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      pulses.forEach((p) => {
        p.life += 0.012;
        const r = p.life * 160;
        const alpha = Math.max(0, 0.35 - p.life * 0.35);
        if (alpha <= 0) return;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        grad.addColorStop(0, `rgba(255,45,45,${alpha})`);
        grad.addColorStop(1, "rgba(255,45,45,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(p.x - r, p.y - r, r * 2, r * 2);
      });
      pulses = pulses.filter((p) => p.life < 1);

      raf = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      clearInterval(spawnInterval);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full opacity-70"
      style={{
        maskImage:
          "radial-gradient(ellipse 75% 60% at 50% 20%, black 20%, transparent 80%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 75% 60% at 50% 20%, black 20%, transparent 80%)",
      }}
    />
  );
}
