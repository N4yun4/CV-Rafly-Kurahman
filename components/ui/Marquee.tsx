import { cn } from "@/lib/utils";

export interface MarqueeProps {
  items: string[];
  className?: string;
  separator?: string;
  reverse?: boolean;
}

/** Pita teks berjalan — aksen khas Neubrutalism. Murni CSS agar hemat performa. */
export function Marquee({ items, className, separator = "✦", reverse }: MarqueeProps) {
  const loop = [...items, ...items];

  return (
    <div
      className={cn(
        "nb-border-thick relative flex w-full overflow-hidden border-x-0 bg-primary py-3 text-ink",
        className,
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          "flex min-w-full shrink-0 animate-marquee items-center gap-6 whitespace-nowrap pr-6",
          reverse && "[animation-direction:reverse]",
        )}
      >
        {loop.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center gap-6 font-heading text-sm font-extrabold uppercase tracking-[0.2em] sm:text-base"
          >
            {item}
            <span className="text-lg">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
