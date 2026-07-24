/**
 * ProgressiveBlur
 *
 * A decorative bar pinned to the bottom of the viewport that dissolves
 * scrolling content into a smooth, premium blur.
 *
 * The smoothness comes from *cumulative* masking: every layer is fully solid
 * at the bottom of the bar and fades to transparent at a different height.
 * The strongest blur fades out lowest; the lightest blur reaches highest. Each
 * fade overlaps its neighbour, so stacked together they form one continuous
 * gradient of blur with no visible bands or seams.
 *
 * Pure CSS — reacts to scrolling automatically. pointer-events-none keeps it
 * from intercepting clicks underneath.
 */

// `stop` = the height (% from the bottom) where this layer has fully faded
// out. The fade spans 25% and starts 25% below `stop`, so adjacent layers
// overlap by ~12.5% for a seamless blend. Strongest blur fades out first.
const layers = [
  { blur: 24, stop: 25 },
  { blur: 16, stop: 37.5 },
  { blur: 10, stop: 50 },
  { blur: 6, stop: 62.5 },
  { blur: 3, stop: 75 },
  { blur: 1.5, stop: 87.5 },
  { blur: 0.5, stop: 100 },
];

export function ProgressiveBlur() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 h-20 sm:h-24 lg:h-28"
    >
      {layers.map(({ blur, stop }, i) => {
        const mask = `linear-gradient(to top, black ${stop - 25}%, transparent ${stop}%)`;
        return (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              maskImage: mask,
              WebkitMaskImage: mask,
            }}
          />
        );
      })}

      {/* Faint dark fade, kept low so it doesn't dim content resting at the
           bottom of the viewport (e.g. the last FAQ row). */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
    </div>
  );
}
