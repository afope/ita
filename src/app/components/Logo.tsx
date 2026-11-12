// The ita wordmark. Built from strokes rather than a font: three geometric
// letters at one stroke weight. The dot of the "i" is the Yoruba tone mark
// from ìta, in Laterite (Paper on an orange ground: set --node).
export function Wordmark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="-6 0 116 68"
      role="img"
      aria-label="ita"
      fill="currentColor"
    >
      {/* tone mark */}
      <polygon points="-6,2 3.5,0 11.5,17 7.5,18.5" fill="var(--node, #FF5A1F)" />
      {/* i */}
      <rect x="0" y="28" width="10" height="40" />
      {/* t */}
      <rect x="34" y="8" width="10" height="60" />
      <rect x="22" y="28" width="36" height="10" />
      {/* a */}
      <path
        fillRule="evenodd"
        d="M66,48 a20,20 0 1,0 40,0 a20,20 0 1,0 -40,0 Z M76,48 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0 Z"
      />
      <rect x="100" y="28" width="10" height="40" />
    </svg>
  );
}

// The junction mark: a measured Lagoon horizontal (technology) crossed by a
// hand-drawn Laterite vertical (art), meeting at a paper node.
export function Mark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <rect x="4" y="27" width="56" height="10" fill="var(--signal, #5CE6D2)" />
      <path
        d="M28 4C24 18 36 24 31 32C26 40 34 48 29 60H39C44 48 36 40 41 32C46 24 34 18 38 4Z"
        fill="var(--field, #FF5A1F)"
      />
      <rect
        x="25"
        y="25"
        width="14"
        height="14"
        fill="var(--mark-node, #F2EFE6)"
        transform="rotate(45 32 32)"
      />
    </svg>
  );
}
