import { cn } from "~/features/hackathon/lib/utils";

interface SectionImageSlotProps {
  /** Final asset path. Leave empty until you add the photo. */
  src?: string;
  /** Label shown only in empty placeholder state (corner, does not take layout) */
  label: string;
  fadeTo?: "page" | "surface";
  /** Soften a strong photo with blur (e.g. hiring partners) */
  blur?: boolean;
  /**
   * Soft gradient fade into the page colour behind text
   * (preferred over a flat opacity wash).
   */
  fade?: boolean;
  /** Lighter fade so more of the photo stays visible */
  fadeLight?: boolean;
  className?: string;
}

/**
 * True CSS-style section background. Zero layout footprint.
 * Text lives in normal flow above this layer.
 */
export default function SectionImageSlot({
  src,
  label,
  fadeTo = "page",
  blur = false,
  fade = true,
  fadeLight = false,
  className,
}: SectionImageSlotProps) {
  const isSurface = fadeTo === "surface";

  return (
    <div
      className={cn("absolute inset-0 -z-0 pointer-events-none overflow-hidden", className)}
      aria-hidden
    >
      {src ? (
        <img
          src={src}
          alt=""
          className={cn(
            "absolute inset-0 h-full w-full object-cover object-center",
            blur && "scale-110 blur-sm",
          )}
        />
      ) : (
        <div className="absolute inset-0">
          <div className="ukis-contour absolute inset-0 opacity-[0.08]" />
          <span className="absolute bottom-4 right-4 ukis-eyebrow !text-[0.55rem] opacity-40 max-w-[9rem] text-right leading-snug">
            BG · {label}
          </span>
        </div>
      )}

      {src && fade ? (
        <>
          <div
            className={cn(
              "absolute inset-0",
              fadeLight
                ? isSurface
                  ? "bg-gradient-to-r from-surface/70 via-surface/40 to-surface/15"
                  : "bg-gradient-to-r from-page/70 via-page/40 to-page/15"
                : isSurface
                  ? "bg-gradient-to-r from-surface via-surface/75 to-surface/25"
                  : "bg-gradient-to-r from-page via-page/75 to-page/25",
            )}
          />
          <div
            className={cn(
              "absolute inset-0",
              fadeLight
                ? isSurface
                  ? "bg-gradient-to-b from-surface/50 via-transparent to-surface/55"
                  : "bg-gradient-to-b from-page/50 via-transparent to-page/55"
                : isSurface
                  ? "bg-gradient-to-b from-surface/80 via-transparent to-surface/85"
                  : "bg-gradient-to-b from-page/80 via-transparent to-page/85",
            )}
          />
        </>
      ) : null}
    </div>
  );
}
