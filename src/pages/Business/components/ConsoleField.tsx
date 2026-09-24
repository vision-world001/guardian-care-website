import SolarShine, {type Shine} from '../../../components/SolarShine';

/**
 * The light the business journey sits in.
 *
 * The journey pages are lit like a house at midday. This one is an operations
 * console read by someone at a desk, and it should feel like an instrument
 * rather than a document.
 *
 * So the ground is a 56px lattice of white hairlines with three soft blooms
 * behind it — the same two ingredients as the journey field, at a finer pitch.
 * A tighter rule reads as an instrument where a coarser one reads as a roof,
 * and that difference is the only one between the two files.
 *
 * The lattice is masked back across the reading column, so it is texture at
 * the margins and almost nothing behind a readout. See `--grid-reading-mask`.
 *
 * GridPulses used to run short comet traces along this lattice so the ground
 * read as running rather than drawn. It is gone: its comets were 1px
 * hairlines snapped to exact multiples of the 56px pitch, so they doubled the
 * very quality the grid is now masked back to avoid, and they were the most
 * expensive thing on the page for it. If charge needs showing again it
 * belongs on the readouts, where `conduit` and `crawl` already live and where
 * it would mean something.
 *
 * Bounded to the page rather than to the viewport. `absolute` inside the
 * journey's own `relative isolate` main means the field starts under the header
 * and stops at the footer, which is the right edge for it: the footer belongs
 * to the site, not to this page, and a ground running under it would join the
 * two into one surface.
 *
 * Entirely presentational: `aria-hidden`, no pointer events, negative
 * z-index. Only the blooms move, slowly — a background that resolves in a few
 * seconds reads as a loading state — and they rest on a complete frame under
 * `prefers-reduced-motion` through the base stylesheet.
 */

/**
 * Where the light falls, down the length of the page.
 *
 * These are the three positions the old glows held, unchanged, so the page is
 * lit exactly where it was before. Three, not four: a fourth sat at 84% on the
 * right and washed the foot of the page green, below the last section, where
 * there was nothing left to light — a long band that was dark on the left and
 * green on the right, immediately above the wordmark. Dropping it lets the
 * foot go evenly dark and hands the eye to the wave.
 *
 * Percentages are correct here, unlike the journey field's first sun: every
 * one of these is meant to be a fraction of the page's own length rather than
 * of the screen, and none of them belongs to the hero.
 *
 * Quicker than the journey field — an instrument can take a faster hand — and
 * still slow enough that nobody catches the sun moving.
 */
const SUNS: Shine[] = [
  {
    top: '-6%',
    side: 'left',
    offset: '-14%',
    tone: 'var(--wash-green)',
    under: 'var(--wash-blue)',
    core: 'min(34vmax, 340px)',
    blur: 60,
    breath: 21
  },
  {
    top: '26%',
    side: 'right',
    offset: '-16%',
    tone: 'var(--wash-blue)',
    under: 'var(--wash-green)',
    core: 'min(36vmax, 360px)',
    blur: 60,
    breath: 26
  },
  {
    top: '58%',
    side: 'left',
    offset: '-18%',
    tone: 'var(--wash-blue)',
    under: 'var(--wash-amber)',
    core: 'min(32vmax, 320px)',
    blur: 60,
    breath: 31
  }
];

export default function ConsoleField() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="bg-console-grid absolute inset-0" />
      <SolarShine suns={SUNS} />

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
