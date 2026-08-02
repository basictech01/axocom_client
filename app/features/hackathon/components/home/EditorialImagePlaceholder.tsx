import { cn } from "~/features/hackathon/lib/utils";

type Aspect =
  | "1/1"
  | "4/5"
  | "3/4"
  | "16/9"
  | "3/2"
  | "2/3"
  | "21/9";

const aspectClass: Record<Aspect, string> = {
  "1/1": "aspect-square",
  "4/5": "aspect-[4/5]",
  "3/4": "aspect-[3/4]",
  "16/9": "aspect-video",
  "3/2": "aspect-[3/2]",
  "2/3": "aspect-[2/3]",
  "21/9": "aspect-[21/9]",
};

interface EditorialImagePlaceholderProps {
  /** Accessible description of the intended photograph */
  label: string;
  aspect?: Aspect;
  className?: string;
  /** Developer note - intended final asset */
  note?: string;
  rounded?: "none" | "sm" | "md" | "lg";
}

const radiusClass = {
  none: "rounded-none",
  sm: "rounded-md",
  md: "rounded-xl",
  lg: "rounded-2xl",
} as const;

/**
 * Drop-in people/photo placeholder for editorial layouts.
 * Replace with a normal <img> when final assets arrive - keep the same aspect wrapper.
 */
export default function EditorialImagePlaceholder({
  label,
  aspect = "4/5",
  className,
  note,
  rounded = "md",
}: EditorialImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      title={note || label}
      className={cn(
        "relative w-full overflow-hidden border border-border bg-surface-subtle",
        aspectClass[aspect],
        radiusClass[rounded],
        className
      )}
    >
      {/* Contour / mountain line art - brand-tinted, not a stock photo */}
      <div className="ukis-contour absolute inset-0 opacity-[0.18]" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(145deg, color-mix(in srgb, var(--brand-devbhoomi-navy) 18%, transparent) 0%, color-mix(in srgb, var(--brand-summit-blue) 12%, transparent) 45%, color-mix(in srgb, var(--brand-glacier-blue) 10%, transparent) 100%)",
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
        <span className="ukis-eyebrow !text-[0.6rem] opacity-80">Photograph</span>
        <span className="text-xs sm:text-sm text-muted-foreground max-w-[14rem] leading-snug">
          {label}
        </span>
      </div>
      {/* DEV: {note} */}
    </div>
  );
}
