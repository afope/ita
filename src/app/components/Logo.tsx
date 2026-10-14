// The ita wordmark. Built from strokes rather than a font so the "t" can
// carry the brand device: its crossbar is the junction, marked by a node.
export function Wordmark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 108 60"
      role="img"
      aria-label="ita"
      fill="none"
    >
      {/* i */}
      <path d="M6 24V56" stroke="currentColor" strokeWidth="9" />
      <rect x="1.5" y="3.5" width="9" height="9" fill="currentColor" />
      {/* t */}
      <path d="M34 4V56" stroke="currentColor" strokeWidth="9" />
      <path d="M18 26H52" stroke="currentColor" strokeWidth="9" />
      <rect
        x="29"
        y="21"
        width="10"
        height="10"
        fill="var(--node, #FFC81F)"
        transform="rotate(45 34 26)"
      />
      {/* a */}
      <circle cx="79" cy="41" r="13.5" stroke="currentColor" strokeWidth="9" />
      <path d="M97 24V56" stroke="currentColor" strokeWidth="9" />
    </svg>
  );
}

// The junction mark: a measured horizontal (technology) crossed by a
// hand-drawn vertical (art), meeting at the gathering node.
export function Mark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <rect x="4" y="27" width="56" height="10" fill="var(--indigo, #3B3BFF)" />
      <path
        d="M28 4C24 18 36 24 31 32C26 40 34 48 29 60H39C44 48 36 40 41 32C46 24 34 18 38 4Z"
        fill="currentColor"
      />
      <rect
        x="25"
        y="25"
        width="14"
        height="14"
        fill="var(--node, #FFC81F)"
        transform="rotate(45 32 32)"
      />
    </svg>
  );
}
