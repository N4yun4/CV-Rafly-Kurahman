import { cn } from "@/lib/utils";

export interface WeldIllustrationProps {
  /** Kode posisi pengelasan, mis. "1F", "2G". */
  code: string;
  className?: string;
}

/**
 * Ilustrasi SVG sederhana untuk posisi pengelasan.
 * "F" = fillet (sambungan T), "G" = groove (sambungan kampuh).
 * Angka menentukan orientasi: 1 datar, 2 horizontal, 3 vertikal.
 */
export function WeldIllustration({ code, className }: WeldIllustrationProps) {
  const isFillet = code.toUpperCase().endsWith("F");
  const orientation = code.charAt(0);
  const rotation = orientation === "2" ? -90 : orientation === "3" ? 90 : 0;

  return (
    <svg
      viewBox="0 0 120 90"
      role="img"
      aria-label={`Ilustrasi posisi pengelasan ${code}`}
      className={cn("h-full w-full", className)}
    >
      <g
        transform={`rotate(${rotation} 60 45)`}
        stroke="var(--nb-line)"
        strokeWidth="3"
        strokeLinejoin="round"
      >
        {isFillet ? (
          <>
            {/* Pelat dasar */}
            <rect x="14" y="58" width="92" height="16" fill="var(--nb-surface)" />
            {/* Pelat tegak */}
            <rect x="52" y="16" width="16" height="42" fill="var(--nb-surface)" />
            {/* Bead las kiri & kanan */}
            <path d="M52 58 L36 58 L52 42 Z" fill="#FFD93D" />
            <path d="M68 58 L84 58 L68 42 Z" fill="#FF6B6B" />
          </>
        ) : (
          <>
            {/* Dua pelat dengan kampuh V */}
            <path d="M12 34 H50 L58 62 H12 Z" fill="var(--nb-surface)" />
            <path d="M108 34 H70 L62 62 H108 Z" fill="var(--nb-surface)" />
            {/* Bead pengisi kampuh */}
            <path d="M50 34 H70 L62 62 H58 Z" fill="#FFD93D" />
            <ellipse cx="60" cy="32" rx="16" ry="7" fill="#4D96FF" />
          </>
        )}
      </g>

      {/* Percikan las */}
      <g fill="#FF6B6B" stroke="var(--nb-line)" strokeWidth="1.5">
        <circle cx="98" cy="20" r="3.5" />
        <circle cx="108" cy="32" r="2.5" />
        <circle cx="88" cy="12" r="2" />
      </g>
    </svg>
  );
}
