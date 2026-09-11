import EditorialImagePlaceholder from "~/features/hackathon/components/home/EditorialImagePlaceholder";

interface RegisterAsideImageProps {
  label: string;
  note: string;
  /** Optional final asset path - falls back to editorial placeholder */
  src?: string;
  imageWidth?: number;
  imageHeight?: number;
}

/**
 * Full-page right visual for registration layouts (hero-style).
 * Pins to the viewport right edge - not limited to the form height.
 */
export default function RegisterAsideImage({
  label,
  note,
  src,
  imageWidth,
  imageHeight,
}: RegisterAsideImageProps) {
  return (
    <div
      className="pointer-events-none hidden lg:block absolute inset-y-0 right-0 w-[66%] xl:w-[48%]"
      aria-hidden
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {src ? (
          <img
            src={src}
            alt={label}
            width={imageWidth}
            height={imageHeight}
            sizes="(min-width: 1280px) 48vw, 66vw"
            decoding="async"
            className="h-full w-full object-cover object-center"
          />
        ) : (
          /* DEV: {note} - pass src when the final asset is ready */
          <EditorialImagePlaceholder
            label={label}
            note={note}
            aspect="4/5"
            rounded="none"
            className="h-full w-full !aspect-auto border-0"
          />
        )}
        {/* Fade into page from the left - same language as homepage hero */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, var(--color-page) 0%, color-mix(in srgb, var(--color-page) 70%, transparent) 22%, color-mix(in srgb, var(--color-page) 25%, transparent) 45%, transparent 68%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, var(--color-page) 0%, transparent 12%, transparent 88%, var(--color-page) 100%)",
          }}
        />
      </div>
    </div>
  );
}
