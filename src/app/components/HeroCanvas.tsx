"use client";

import { useEffect, useRef } from "react";

type Word = { junction: number; pair: [string, string]; born: number };

const WORD_LIFE = 4.2;
const MAX_WORDS = 3;

// A living street plan: measured horizontals (technology) crossed by
// drifting, hand-drawn verticals (art). Every crossing is an ìta — a
// junction — and junctions light up as signals and the pointer pass by.
// Now and then a junction surfaces a word pair: technology crossed with art.
export default function HeroCanvas({ words }: { words: [string, string][] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const rootStyle = getComputedStyle(document.documentElement);
    const serifFont = rootStyle.getPropertyValue("--font-serif") || "Georgia";
    const monoFont = rootStyle.getPropertyValue("--font-mono") || "monospace";

    // Deterministic jitter so the plan looks drawn, not random each load.
    let seed = 7;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };

    const pointer = { x: 0.72, y: 0.42, tx: 0.72, ty: 0.42, active: false };
    let width = 0;
    let height = 0;
    let frame = 0;
    let rows: number[] = [];
    let cols: { x: number; phase: number; amp: number }[] = [];
    let pulses: { axis: "h" | "v"; line: number; pos: number; speed: number }[] =
      [];
    let junctions: { x: number; y: number }[] = [];
    let active: Word[] = [];
    let nextPair = Math.floor(Math.random() * words.length);
    let lastSpawn = -Infinity;
    let clock = 0;

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
      active = [];
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      layout();
      measureKeepOut();
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

    // Words never cover the hero copy. Keep-out boxes follow the actual
    // lines of text and buttons, so the empty space beside a short line
    // can still hold a word.
    let keepOut: DOMRect[] = [];
    const measureKeepOut = () => {
      const base = canvas.getBoundingClientRect();
      const hero = canvas.parentElement;
      if (!hero) return;
      const rects: DOMRect[] = [];
      hero
        .querySelectorAll<HTMLElement>(".hero-inner > *, .hero-meta, .scroll-cue")
        .forEach((el) => {
          if (el.matches(".hero-actions")) {
            el.querySelectorAll("a").forEach((a) =>
              rects.push(a.getBoundingClientRect())
            );
            return;
          }
          const range = document.createRange();
          range.selectNodeContents(el);
          rects.push(...Array.from(range.getClientRects()));
        });
      keepOut = rects
        .filter((r) => r.width > 0)
        .map(
          (r) =>
            new DOMRect(
              r.left - base.left - 20,
              r.top - base.top - 16,
              r.width + 40,
              r.height + 32
            )
        );
    };

    const LABEL_WIDTH = 150;
    const labelFlips = (x: number) => x + 14 + LABEL_WIDTH > width - 12;

    const inWordZone = ({ x, y }: { x: number; y: number }) => {
      if (y < 100 || y > height - 40 || x < 16 || x > width - 16) return false;
      const flip = labelFlips(x);
      const box = {
        left: flip ? x - 14 - LABEL_WIDTH : x - 8,
        right: flip ? x + 8 : x + 14 + LABEL_WIDTH,
        top: y - 40,
        bottom: y + 28,
      };
      return !keepOut.some(
        (r) =>
          box.left < r.right &&
          box.right > r.left &&
          box.top < r.bottom &&
          box.bottom > r.top
      );
    };

    const spawn = (preferred?: number) => {
      if (!words.length || active.length >= MAX_WORDS) return;
      const taken = new Set(active.map((w) => w.junction));
      let index = preferred;
      if (index === undefined) {
        const free = junctions
          .map((_, i) => i)
          .filter((i) => !taken.has(i) && inWordZone(junctions[i]));
        if (!free.length) return;
        index = free[Math.floor(Math.random() * free.length)];
      }
      if (taken.has(index) || !inWordZone(junctions[index])) return;
      active.push({ junction: index, pair: words[nextPair], born: clock });
      nextPair = (nextPair + 1) % words.length;
      lastSpawn = clock;
    };

    const drawWord = (word: Word) => {
      const j = junctions[word.junction];
      if (!j) return;
      const age = clock - word.born;
      const alpha = reduceMotion
        ? 1
        : Math.min(1, age / 0.6, Math.max(0, (WORD_LIFE - age) / 0.8));
      const rise = reduceMotion ? 0 : (1 - Math.min(1, age / 0.6)) * 6;
      const [tech, art] = word.pair;

      ctx.font = `italic 24px ${serifFont}`;
      const artWidth = ctx.measureText(art).width;
      ctx.font = `11px ${monoFont}`;
      const techWidth = ctx.measureText(tech.toUpperCase()).width;
      const flip =
        labelFlips(j.x) || j.x + 14 + Math.max(artWidth, techWidth) > width - 12;
      ctx.textAlign = flip ? "right" : "left";
      const x = flip ? j.x - 14 : j.x + 14;

      ctx.fillStyle = `rgba(242, 239, 230, ${alpha})`;
      ctx.font = `italic 24px ${serifFont}`;
      ctx.fillText(art, x, j.y - 10 + rise);

      ctx.fillStyle = `rgba(255, 200, 31, ${alpha * 0.85})`;
      ctx.font = `11px ${monoFont}`;
      ctx.fillText(tech.toUpperCase(), x, j.y + 20 + rise);
      ctx.textAlign = "left";
    };

    const render = (time: number) => {
      clock = time / 1000;
      const t = reduceMotion ? 0 : clock;
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

      // Signals travelling the streets: indigo, or paper in the ink palette.
      const signal =
        document.documentElement.dataset.palette === "ink"
          ? "242, 239, 230"
          : "108, 108, 255";
      const pulsePoints: { x: number; y: number }[] = [];
      for (const p of pulses) {
        if (!reduceMotion) p.pos = (p.pos + p.speed / 60 + 1) % 1;
        let x: number;
        let y: number;
        if (p.axis === "h") {
          x = p.pos * width;
          y = rows[p.line % rows.length];
          const tail = Math.sign(p.speed) * -60;
          const grad = ctx.createLinearGradient(x + tail, y, x, y);
          grad.addColorStop(0, `rgba(${signal}, 0)`);
          grad.addColorStop(1, `rgba(${signal}, 0.9)`);
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
      if (!reduceMotion) {
        active = active.filter((w) => clock - w.born < WORD_LIFE);
      }
      const lit = new Set(active.map((w) => w.junction));
      const px = pointer.x * width;
      const py = pointer.y * height;
      junctions = [];
      for (const y of rows) {
        for (const c of cols) {
          const x = colX(c, y, t);
          const index = junctions.length;
          junctions.push({ x, y });

          const near = (x - px) ** 2 + (y - py) ** 2;
          if (pointer.active && near < 40 * 40 && clock - lastSpawn > 0.9) {
            spawn(index);
          }

          let heat = lit.has(index) ? 1 : Math.exp(-near / 26000);
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

      // A slow idle rhythm keeps words surfacing for touch and still visitors.
      if (!reduceMotion && clock - lastSpawn > 2.8) spawn();
      active.forEach(drawWord);

      if (!reduceMotion) frame = requestAnimationFrame(render);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = (e.clientX - rect.left) / rect.width;
      pointer.ty = (e.clientY - rect.top) / rect.height;
      pointer.active = true;
    };

    const onScroll = () => {
      if (!reduceMotion && clock - lastSpawn > 0.6) spawn();
    };

    const onResize = () => {
      resize();
      if (reduceMotion) {
        render(0);
        spawn();
        spawn();
        render(0);
      }
    };

    resize();
    render(0);
    if (reduceMotion) {
      // A still composition: two words placed once, no motion.
      spawn();
      spawn();
      render(0);
    }
    // Line boxes shift once the web fonts swap in.
    document.fonts?.ready.then(measureKeepOut);
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [words]);

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />;
}
