import GridPulses from './GridPulses';

/**
 * The light the business journey sits in.
 *
 * The consumer page is lit like a house at midday. This one is an operations
 * console read by someone at a desk, and it should feel like an instrument
 * rather than a document — so the ground is a measured grid with slow glows
 * behind it, and the edges fall away so nothing competes with a readout.
 *
 * The grid is the whole idea. Six sections of flat #050e1a read as an empty
 * page no matter how good the content on top of it is; a faint 56px rule gives
 * every readout something to sit on and quietly says *this is a system*. It is
 * held at under 3% white — visible as texture, never as lines you could count.
 *
 * Bounded to the page rather than to the viewport. `absolute` inside the
 * journey's own `relative isolate` main means the field starts under the header
 * and stops at the footer, which is the right edge for it: the footer belongs
 * to the site, not to this page, and a grid running under it would join the two
 * into one surface.
 *
 * That bounding is also why the glows are distributed down the page instead of
 * pinned to the top and bottom of it. A viewport-tracking pair would leave the
 * middle of a six-section page unlit.
 *
 * The grid also carries charge — see GridPulses, which runs short traces along
 * the same lattice so the ground reads as a system that is running rather than
 * as a system that was drawn.
 *
 * Entirely presentational: `aria-hidden`, no pointer events, negative
 * z-index. The drift is slow on purpose — a background that resolves in a few
 * seconds reads as a loading state — and stops under `prefers-reduced-motion`
 * through the base stylesheet.
 */

/**
 * Where the light falls, down the length of the page.
 *
 * Three, not four. A fourth sat at 84% on the right and washed the foot of the
 * page green — which mattered more after the palette move, because the glow
 * token went from rgba(112,169,20,.14) to a brighter rgba(122,179,0,.16) and
 * what had been a hint became a cast.
 *
 * It also fell in the worst possible place: below the last section, where the
 * page has nothing left to light. The result was a long empty band that was
 * dark on the left and green on the right, immediately above the wordmark —
 * an asymmetry with no content to justify it. Dropping it lets the foot go
 * evenly dark and hands the eye to the wave.
 */
const GLOWS = [
  {top: '-6%', side: 'left', offset: '-14%', size: 66, colour: 'var(--color-green-glow)', delay: '0s', duration: '26s'},
  {top: '26%', side: 'right', offset: '-16%', size: 70, colour: 'var(--color-blue-glow)', delay: '-15s', duration: '32s'},
  {top: '58%', side: 'left', offset: '-18%', size: 62, colour: 'var(--color-blue-glow)', delay: '-7s', duration: '29s'}
];

export default function ConsoleField() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="bg-console-grid absolute inset-0" />
      <GridPulses />

      {GLOWS.map((glow) => (
        <div
          key={`${glow.top}-${glow.side}`}
          className="animate-drift absolute rounded-full blur-[130px]"
          style={{
            top: glow.top,
            [glow.side]: glow.offset,
            height: `${glow.size}vw`,
            width: `${glow.size}vw`,
            background: `radial-gradient(circle, ${glow.colour}, transparent 65%)`,
            animationDelay: glow.delay,
            animationDuration: glow.duration
          }}
        />
      ))}

      {/* Sides down, and the last few per cent held for the handoff to the
          footer. Written as linear passes rather than as an ellipse because the
          element is as tall as the page — a radial vignette sized to it would
          be meaningless at six screens long. Nothing darkens the top edge: that
          band is the hero, and it is the brightest part of the journey. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, color-mix(in srgb, var(--color-bg) 90%, transparent), transparent 20%, transparent 80%, color-mix(in srgb, var(--color-bg) 90%, transparent)), linear-gradient(180deg, transparent 0%, transparent 95%, color-mix(in srgb, var(--color-bg) 85%, transparent))'
        }}
      />
    </div>
  );
}
