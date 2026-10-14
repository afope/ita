"use client";

import { useEffect, useRef } from "react";

// A living street plan: measured horizontals (technology) crossed by
// drifting, hand-drawn verticals (art). Every crossing is an ìta — a
// junction — and junctions light up as signals and the pointer pass by.
export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Deterministic jitter so the plan looks drawn, not random each load.
    let seed = 7;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };

    const pointer = { x: 0.72, y: 0.42, tx: 0.72, ty: 0.42 };
    let width = 0;
    let height = 0;
    let frame = 0;
    let rows: number[] = [];
    let cols: { x: number; phase: number; amp: number }[] = [];
    let pulses: { axis: "h" | "v"; line: number; pos: number; speed: number }[] =
      [];

    const layout = () => {
      seed = 7;
      const rowCount = Math.max(5, Math.round(height / 120));
      const colCount = Math.max(5, Math.round(width / 140));
      rows = Array.from(
        { length: rowCount },
        (_, i) => ((i + 0.5 + (rand() - 0.5) * 0.5) / rowCount) * height
      );
      cols = Array.from({ length: colCount }, (_, i) => ({
        x: ((i + 0.5 + (rand() - 0.5) * 0.6) / colCount) * width,
        phase: rand() * Math.PI * 2,
        amp: 8 + rand() * 18,
      }));
      pulses = Array.from({ length: 12 }, () => {
        const axis = rand() > 0.5 ? "h" : "v";
        return {
          axis,
          line: Math.floor(rand() * (axis === "h" ? rowCount : colCount)),
          pos: rand(),
          speed: (0.04 + rand() * 0.08) * (rand() > 0.5 ? 1 : -1),
        };
      });
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      layout();
    };

    const colX = (c: (typeof cols)[number], y: number, t: number) => {
      const px = pointer.x * width;
      const py = pointer.y * height;
      const d = ((c.x - px) ** 2 + (y - py) ** 2) / (width * width * 0.02);
      return (
        c.x +
        Math.sin(y * 0.006 + c.phase + t * 0.35) * c.amp +
        (px - c.x) * Math.exp(-d) * 0.35
      );
    };

    const render = (time: number) => {
      const t = reduceMotion ? 0 : time / 1000;
      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;
      ctx.clearRect(0, 0, width, height);

      // Streets.
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(242, 239, 230, 0.09)";
      for (const y of rows) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      for (const c of cols) {
        ctx.beginPath();
        for (let y = 0; y <= height; y += 12) {
          const x = colX(c, y, t);
          if (y === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Signals travelling the streets.
      const pulsePoints: { x: number; y: number }[] = [];
      for (const p of pulses) {
        if (!reduceMotion) p.pos = (p.pos + p.speed / 60 + 1) % 1;
        let x: number;
        let y: number;
        if (p.axis === "h") {
          x = p.pos * width;
          y = rows[p.line % rows.length];
          ctx.strokeStyle = "rgba(108, 108, 255, 0.9)";
          const tail = Math.sign(p.speed) * -60;
          const grad = ctx.createLinearGradient(x + tail, y, x, y);
          grad.addColorStop(0, "rgba(108, 108, 255, 0)");
          grad.addColorStop(1, "rgba(108, 108, 255, 0.9)");
          ctx.strokeStyle = grad;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(x + tail, y);
          ctx.lineTo(x, y);
          ctx.stroke();
        } else {
          const c = cols[p.line % cols.length];
          y = p.pos * height;
          x = colX(c, y, t);
          ctx.fillStyle = "rgba(255, 200, 31, 0.9)";
          ctx.fillRect(x - 1.5, y - 10, 3, 20);
        }
        pulsePoints.push({ x, y });
      }

      // Junctions.
      const px = pointer.x * width;
      const py = pointer.y * height;
      for (const y of rows) {
        for (const c of cols) {
          const x = colX(c, y, t);
          let heat = Math.exp(-((x - px) ** 2 + (y - py) ** 2) / 26000);
          for (const s of pulsePoints) {
            heat = Math.max(
              heat,
              Math.exp(-((x - s.x) ** 2 + (y - s.y) ** 2) / 900)
            );
          }
          const size = 2.5 + heat * 7;
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(Math.PI / 4);
          ctx.fillStyle =
            heat > 0.15
              ? `rgba(255, 200, 31, ${0.35 + heat * 0.65})`
              : "rgba(242, 239, 230, 0.28)";
          ctx.fillRect(-size / 2, -size / 2, size, size);
          ctx.restore();
        }
      }

      if (!reduceMotion) frame = requestAnimationFrame(render);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = (e.clientX - rect.left) / rect.width;
      pointer.ty = (e.clientY - rect.top) / rect.height;
    };

    const onResize = () => {
      resize();
      if (reduceMotion) render(0);
    };

    resize();
    render(0);
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />;
}
