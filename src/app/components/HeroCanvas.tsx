"use client";

import { useEffect, useRef } from "react";
import lagos from "../data/lagos-island.json";

type Word = { junction: number; pair: [string, string]; born: number };
type Point = { x: number; y: number };

const WORD_LIFE = 4.2;
const MAX_WORDS = 3;
const PULSES = 14;
const TRAIL = 12;

// Canvas colours per palette. In colour the hero sits on bright orange, so
// streets and labels are ink; in ink & paper they are light.
const themes = {
  colour: {
    street: "rgba(13, 13, 14, 0.2)",
    major: "rgba(13, 13, 14, 0.38)",
    shore: "rgba(13, 13, 14, 0.45)",
    idle: "rgba(13, 13, 14, 0.42)",
    label: "rgba(13, 13, 14, 0.62)",
    art: "242, 239, 230",
    tech: "13, 13, 14",
    pulses: ["92, 230, 210", "242, 239, 230"],
  },
  ink: {
    street: "rgba(242, 239, 230, 0.1)",
    major: "rgba(242, 239, 230, 0.22)",
    shore: "rgba(242, 239, 230, 0.32)",
    idle: "rgba(242, 239, 230, 0.3)",
    label: "rgba(242, 239, 230, 0.5)",
    art: "242, 239, 230",
    tech: "92, 230, 210",
    pulses: ["92, 230, 210", "242, 239, 230"],
  },
};
const currentTheme = () =>
  document.documentElement.dataset.palette === "ink"
    ? themes.ink
    : themes.colour;

// The street graph of Lagos Island, in map units (0..1 across the width).
// Edges run junction to junction, so signals can travel the real network.
const S = lagos.scale;
const toPoints = (flat: number[]) => {
  const pts: Point[] = [];
  for (let i = 0; i < flat.length; i += 2) {
    pts.push({ x: flat[i] / S, y: flat[i + 1] / S });
  }
  return pts;
};
const edges = lagos.edges.map(([major, ...flat]) => {
  const pts = toPoints(flat);
  const lengths = [0];
  for (let i = 1; i < pts.length; i++) {
    lengths.push(
      lengths[i - 1] +
        Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y)
    );
  }
  return { major: major === 1, pts, lengths, length: lengths[lengths.length - 1] };
});
const keyOf = (p: Point) => `${Math.round(p.x * S)},${Math.round(p.y * S)}`;
const atNode = new Map<string, number[]>();
edges.forEach((e, i) => {
  for (const end of [e.pts[0], e.pts[e.pts.length - 1]]) {
    const k = keyOf(end);
    atNode.set(k, [...(atNode.get(k) ?? []), i]);
  }
});
const junctionPts = lagos.junctions.map(([x, y]) => ({ x: x / S, y: y / S }));
const shore = lagos.shore.map(toPoints);
// The island's west shore around Balogun Street anchors the composition.
const focus = { x: 0.079, y: 0.28 };
// Places with a single point (squares, stops) are placed before streets,
// which have many points to choose from.
const labels = lagos.labels
  .map((l) => ({
    name: l.name.toUpperCase(),
    pts: l.pts.map(([x, y]) => ({ x: x / S, y: y / S })),
  }))
  .sort((a, b) => a.pts.length - b.pts.length);

const pointAlong = (edge: (typeof edges)[number], dist: number): Point => {
  const { pts, lengths } = edge;
  let i = 1;
  while (i < lengths.length - 1 && lengths[i] < dist) i++;
  const span = lengths[i] - lengths[i - 1] || 1;
  const t = Math.min(1, Math.max(0, (dist - lengths[i - 1]) / span));
  return {
    x: pts[i - 1].x + (pts[i].x - pts[i - 1].x) * t,
    y: pts[i - 1].y + (pts[i].y - pts[i - 1].y) * t,
  };
};

// The hero is a living map of Lagos Island, drawn from OpenStreetMap. Every
// real street crossing is an ìta — a junction — and junctions light up as
// signals travel the network and the pointer passes by. Now and then a
// junction surfaces a word pair: technology crossed with art.
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

    const pointer = { x: -1, y: -1, active: false };
    let width = 0;
    let height = 0;
    let frame = 0;
    let view = { scale: 1, ox: 0, oy: 0 };
    let junctions: Point[] = [];
    let active: Word[] = [];
    let nextPair = Math.floor(Math.random() * words.length);
    let lastSpawn = -Infinity;
    let clock = 0;
    let lastTime = 0;

    const toScreen = (p: Point): Point => ({
      x: view.ox + p.x * view.scale,
      y: view.oy + p.y * view.scale,
    });

    // Place the map so the open water west of the island sits behind the
    // copy and the streets fill the rest of the hero.
    const fit = () => {
      const narrow = width < 700;
      const scale = width * (narrow ? 2.6 : 1.45);
      const fx = width * (narrow ? 0.34 : 0.56);
      const fy = height * (narrow ? 0.2 : 0.5);
      view = { scale, ox: fx - focus.x * scale, oy: fy - focus.y * scale };
      junctions = junctionPts.map(toScreen);
    };

    const pulses = Array.from({ length: PULSES }, (_, i) => ({
      edge: Math.floor(Math.random() * edges.length),
      forward: Math.random() > 0.5,
      dist: 0,
      speed: 0.035 + Math.random() * 0.045,
      colour: i % 3 === 0 ? 1 : 0,
      trail: [] as Point[],
    }));
    pulses.forEach((p) => (p.dist = Math.random() * edges[p.edge].length));

    const advance = (p: (typeof pulses)[number], dt: number) => {
      p.dist += p.speed * dt;
      const edge = edges[p.edge];
      if (p.dist < edge.length) return;
      // At the junction, turn onto another street that meets it.
      const end = p.forward ? edge.pts[edge.pts.length - 1] : edge.pts[0];
      const options = (atNode.get(keyOf(end)) ?? []).filter((i) => i !== p.edge);
      const next = options.length
        ? options[Math.floor(Math.random() * options.length)]
        : Math.floor(Math.random() * edges.length);
      const nextEdge = edges[next];
      p.forward = keyOf(nextEdge.pts[0]) === keyOf(end) || !options.length;
      p.edge = next;
      p.dist = 0;
      if (!options.length) p.trail = [];
    };

    const pulsePosition = (p: (typeof pulses)[number]) => {
      const edge = edges[p.edge];
      return toScreen(pointAlong(edge, p.forward ? p.dist : edge.length - p.dist));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fit();
      measureKeepOut();
      active = [];
    };

    // Words and labels never cover the hero copy. Keep-out boxes follow the
    // actual lines of text and buttons, so the empty space beside a short
    // line can still hold a word.
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

    const clear = (box: { left: number; right: number; top: number; bottom: number }) =>
      !keepOut.some(
        (r) =>
          box.left < r.right &&
          box.right > r.left &&
          box.top < r.bottom &&
          box.bottom > r.top
      );

    const LABEL_WIDTH = 150;
    const labelFlips = (x: number) => x + 14 + LABEL_WIDTH > width - 12;

    type Box = { left: number; right: number; top: number; bottom: number };
    const overlaps = (a: Box, b: Box) =>
      a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
    // Street names placed on the last frame; words stay off them.
    let placed: Box[] = [];

    const inWordZone = ({ x, y }: Point) => {
      if (y < 100 || y > height - 40 || x < 16 || x > width - 16) return false;
      const flip = labelFlips(x);
      const box = {
        left: flip ? x - 14 - LABEL_WIDTH : x - 8,
        right: flip ? x + 8 : x + 14 + LABEL_WIDTH,
        top: y - 40,
        bottom: y + 28,
      };
      return clear(box) && !placed.some((p) => overlaps(box, p));
    };

    // Streets are dense, so words keep their distance from each other.
    const roomy = (i: number) =>
      active.every((w) => {
        const a = junctions[w.junction];
        const b = junctions[i];
        return Math.abs(a.x - b.x) > 180 || Math.abs(a.y - b.y) > 70;
      });

    const spawn = (preferred?: number) => {
      if (!words.length || active.length >= MAX_WORDS) return;
      let index = preferred;
      if (index === undefined) {
        const free = junctions
          .map((_, i) => i)
          .filter((i) => roomy(i) && inWordZone(junctions[i]));
        if (!free.length) return;
        index = free[Math.floor(Math.random() * free.length)];
      }
      if (!roomy(index) || !inWordZone(junctions[index])) return;
      active.push({ junction: index, pair: words[nextPair], born: clock });
      nextPair = (nextPair + 1) % words.length;
      lastSpawn = clock;
    };

    const drawWord = (word: Word, theme: (typeof themes)["colour"]) => {
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

      ctx.fillStyle = `rgba(${theme.art}, ${alpha})`;
      ctx.font = `italic 24px ${serifFont}`;
      ctx.fillText(art, x, j.y - 10 + rise);

      ctx.fillStyle = `rgba(${theme.tech}, ${alpha * 0.9})`;
      ctx.font = `11px ${monoFont}`;
      ctx.fillText(tech.toUpperCase(), x, j.y + 20 + rise);
      ctx.textAlign = "left";
    };

    const strokePath = (pts: Point[]) => {
      ctx.beginPath();
      pts.forEach((p, i) => {
        const s = toScreen(p);
        if (i === 0) ctx.moveTo(s.x, s.y);
        else ctx.lineTo(s.x, s.y);
      });
      ctx.stroke();
    };

    const render = (time: number) => {
      clock = time / 1000;
      const dt = reduceMotion ? 0 : Math.min(0.05, clock - lastTime);
      lastTime = clock;
      const theme = currentTheme();
      ctx.clearRect(0, 0, width, height);

      // Shoreline, then streets: major roads heavier than side streets.
      ctx.lineJoin = "round";
      ctx.setLineDash([2, 5]);
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = theme.shore;
      shore.forEach(strokePath);
      ctx.setLineDash([]);
      for (const major of [false, true]) {
        ctx.lineWidth = major ? 1.6 : 1;
        ctx.strokeStyle = major ? theme.major : theme.street;
        ctx.beginPath();
        for (const e of edges) {
          if (e.major !== major) continue;
          e.pts.forEach((p, i) => {
            const s = toScreen(p);
            if (i === 0) ctx.moveTo(s.x, s.y);
            else ctx.lineTo(s.x, s.y);
          });
        }
        ctx.stroke();
      }

      // Street names: each takes the first point along its street that is
      // on screen and clear of the copy and the other names.
      ctx.font = `10px ${monoFont}`;
      ctx.fillStyle = theme.label;
      // A name sits to the right of its point, or to the left if needed.
      placed = [];
      for (const l of labels) {
        const w = ctx.measureText(l.name).width + 12;
        const spot = l.pts
          .map(toScreen)
          .flatMap((s) => [
            { x: s.x + 6, box: { left: s.x, right: s.x + w, top: s.y - 18, bottom: s.y } },
            { x: s.x - w + 6, box: { left: s.x - w, right: s.x, top: s.y - 18, bottom: s.y } },
          ])
          .find(
            ({ box }) =>
              box.left >= 8 &&
              box.right <= width - 8 &&
              box.top >= 90 &&
              box.bottom <= height - 30 &&
              clear(box) &&
              !placed.some((o) => overlaps(box, o))
          );
        if (!spot) continue;
        ctx.fillText(l.name, spot.x, spot.box.bottom - 6);
        placed.push(spot.box);
      }

      // Signals travelling the real street network.
      const pulsePoints: Point[] = [];
      for (const p of pulses) {
        advance(p, dt);
        const pos = pulsePosition(p);
        p.trail.push(pos);
        if (p.trail.length > TRAIL) p.trail.shift();
        const rgb = theme.pulses[p.colour];
        ctx.lineWidth = 2;
        for (let i = 1; i < p.trail.length; i++) {
          const a = p.trail[i - 1];
          const b = p.trail[i];
          if (Math.hypot(b.x - a.x, b.y - a.y) > 40) continue;
          ctx.strokeStyle = `rgba(${rgb}, ${(i / p.trail.length) * 0.9})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
        ctx.fillStyle = `rgba(${rgb}, 1)`;
        ctx.fillRect(pos.x - 2, pos.y - 2, 4, 4);
        pulsePoints.push(pos);
      }

      // Junctions.
      if (!reduceMotion) {
        active = active.filter((w) => clock - w.born < WORD_LIFE);
      }
      const lit = new Set(active.map((w) => w.junction));
      junctions.forEach((j, index) => {
        if (j.x < -10 || j.x > width + 10 || j.y < -10 || j.y > height + 10) return;
        const near = pointer.active ? (j.x - pointer.x) ** 2 + (j.y - pointer.y) ** 2 : Infinity;
        if (near < 30 * 30 && clock - lastSpawn > 0.9) spawn(index);

        let heat = lit.has(index) ? 1 : Math.exp(-near / 9000);
        for (const s of pulsePoints) {
          heat = Math.max(heat, Math.exp(-((j.x - s.x) ** 2 + (j.y - s.y) ** 2) / 500));
        }
        const size = 2.2 + heat * 6.5;
        ctx.save();
        ctx.translate(j.x, j.y);
        ctx.rotate(Math.PI / 4);
        ctx.fillStyle =
          heat > 0.15 ? `rgba(92, 230, 210, ${0.6 + heat * 0.4})` : theme.idle;
        ctx.fillRect(-size / 2, -size / 2, size, size);
        ctx.restore();
      });

      // A slow idle rhythm keeps words surfacing for touch and still visitors.
      if (!reduceMotion && clock - lastSpawn > 2.8) spawn();
      active.forEach((w) => drawWord(w, theme));

      if (!reduceMotion) frame = requestAnimationFrame(render);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };

    const onScroll = () => {
      if (!reduceMotion && clock - lastSpawn > 0.6) spawn();
    };

    const still = () => {
      // A still composition: two words placed once, no motion.
      render(0);
      spawn();
      spawn();
      render(0);
    };

    const onResize = () => {
      resize();
      if (reduceMotion) still();
    };

    resize();
    if (reduceMotion) still();
    else frame = requestAnimationFrame(render);
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
