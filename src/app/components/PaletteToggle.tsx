"use client";

import { useEffect, useState } from "react";

type Palette = "colour" | "ink";
const STORAGE_KEY = "ita-palette";

const apply = (palette: Palette) => {
  if (palette === "ink") document.documentElement.dataset.palette = "ink";
  else delete document.documentElement.dataset.palette;
};

// Review-only switch between the colour palette and ink & paper.
// `?palette=ink` in the URL also works, for sharing a specific version.
export default function PaletteToggle({ initial }: { initial: Palette }) {
  const [palette, setPalette] = useState<Palette>(initial);

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("palette");
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {}
    const start =
      fromUrl === "ink" || fromUrl === "colour"
        ? fromUrl
        : stored === "ink" || stored === "colour"
          ? stored
          : initial;
    setPalette(start);
    apply(start);
  }, [initial]);

  const choose = (next: Palette) => {
    setPalette(next);
    apply(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  };

  return (
    <div className="palette-toggle" role="group" aria-label="Palette">
      <span className="mono">palette</span>
      <button
        type="button"
        aria-pressed={palette === "colour"}
        onClick={() => choose("colour")}
      >
        colour
      </button>
      <button
        type="button"
        aria-pressed={palette === "ink"}
        onClick={() => choose("ink")}
      >
        ink &amp; paper
      </button>
    </div>
  );
}
