/**
 * The light behind the page.
 *
 * Soft blooms breathing at the points each page needs lighting, in the mark's
 * amber, green and blue. They are the whole of the colour on the ground — the
 * lattice in front of them is plain white, because a coloured grid over
 * coloured light reads as one busy surface rather than as a lit texture.
 *
 * No wrapper, no grid, no veil. Each field owns those: the grid is a CSS
 * utility because it is a tiling pattern rather than an element, and the veils
 * are page-specific and already correct. A second `-z-10` nested inside the
 * field's own would be noise.
 *
 * **Cost.** One element per bloom. The blur is static — a moving blur
 * repaints, where a moving element does not — so the only animated properties
 * are transform and opacity, which the compositor handles. There is
 * deliberately no `will-change`: the transform promotes the layer anyway, and
 * on an element this size that declaration is a permanent memory reservation
 * rather than a hint.
 *
 * **Reduced motion.** The base stylesheet collapses every loop to a single
 * iteration, so `bloom` rests on its 100% stop — the quiet end of the breath,
 * a complete composition rather than a half-drawn one. The still frame is the
 * finished picture and the motion only stirs it.
 *
 * Each bloom also carries `-translate-x-1/2 -translate-y-1/2` in its base
 * styles, which is not redundant with the translate inside the keyframes.
 * `bloom` sets no fill mode, so while it is `infinite` it never ends and the
 * keyframe transform always applies — but the reduced-motion rule gives it one
 * iteration and a duration of 0.01ms, so it *does* end, and the element falls
 * back to its base transform. Without one, every bloom would jump to a corner
 * for exactly the reader who asked for less motion.
 */

export type Shine = {
  /** Down the page. See the note on units in each field's SUNS table. */
  top: string;
  side: 'left' | 'right';
  offset: string;
  /** The bloom's own colour and the one under it. Always a --wash-* token. */
  tone: string;
  under: string;
  /** Diameter. Capped in px as well as vmax so a phone is not asked for more. */
  core: string;
  /** Static, never animated. */
  blur: number;
  /** Seconds. Kept coprime-ish across a set so the blooms never share a phase. */
  breath: number;
};

export default function SolarShine({suns}: {suns: Shine[]}) {
  return (
    <>
      {suns.map((sun) => (
        <div
          key={`${sun.top}-${sun.side}`}
          className="animate-bloom absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            top: sun.top,
            [sun.side]: sun.offset,
            height: sun.core,
            width: sun.core,
            filter: `blur(${sun.blur}px)`,
            animationDuration: `${sun.breath}s`,
            background: `radial-gradient(circle, color-mix(in srgb, ${sun.tone} var(--shine-core), transparent) 0%, color-mix(in srgb, ${sun.under} calc(var(--shine-core) * 0.5), transparent) 38%, transparent 72%)`
          }}
        />
      ))}
    </>
  );
}
