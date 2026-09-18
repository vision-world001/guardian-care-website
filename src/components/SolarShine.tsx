/**
 * The sun, on the page.
 *
 * The business journey opens in a dark room. This one opens outdoors at
 * midday, because that is when the thing it describes is happening: the roof
 * is producing right now, and the reader is standing under the same sun doing
 * it. A photograph would state that; light *is* it, and light does not date,
 * does not need a licence, and does not put somebody else's house in front of
 * a reader looking at their own.
 *
 * Three layers, in the order light actually arrives:
 *
 *   1. The sky — a warm opening at the top right cooling into the page's white,
 *      so the hero is a continuous piece of daylight rather than a panel with a
 *      gradient on it.
 *   2. The fan — two sets of rays at different angular periods, so the spacing
 *      reads as light through air rather than as a printed starburst. Painted
 *      on one square element *centred on the sun*, which is the whole trick:
 *      the element's own centre is the sun, so rotating it about itself turns
 *      the fan about the right point. Sized in `vmax` and masked to a soft
 *      circle, it never shows a corner however the hero is proportioned.
 *   3. The core — the bloom the rays come out of, breathing on a cycle
 *      deliberately out of step with the rotation so the two never resolve.
 *
 * Then a veil, weighted to the left where the headline sits, landing on the
 * page's own ground at the bottom edge so the hero has no seam under it.
 *
 * Entirely presentational: `aria-hidden`, no pointer events, negative
 * z-index inside the hero's own stacking context. Both animations are
 * pure transform and opacity — no layout, no paint — and the base stylesheet's
 * reduced-motion rule stops them at a frame that is a complete composition on
 * its own, not a half-drawn one.
 */

/** Where the sun sits in the frame. Referenced by every layer, so it moves once. */
const SUN = {x: '78%', y: '14%'};

export default function SolarShine() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="bg-hero-sky absolute inset-0" />

      <div
        className="bg-hero-rays mask-sun animate-sunspin absolute h-[190vmax] w-[190vmax] rounded-full"
        style={{left: SUN.x, top: SUN.y}}
      />

      <div
        className="animate-bloom absolute h-[46vmax] w-[46vmax] rounded-full blur-[70px]"
        style={{
          left: SUN.x,
          top: SUN.y,
          background:
            'radial-gradient(circle, rgba(255,246,225,0.95) 0%, rgba(255,214,138,0.6) 34%, rgba(255,186,92,0.22) 58%, transparent 74%)'
        }}
      />

      <div className="bg-hero-veil absolute inset-0" />
    </div>
  );
}
