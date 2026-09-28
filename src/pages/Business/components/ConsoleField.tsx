import CurrentField, {type Weather} from '../../../components/CurrentField';
import SolarShine, {type Shine} from '../../../components/SolarShine';

/**
 * The light the business journey sits in.
 *
 * The journey pages are lit like a house at midday. This one is an operations
 * console read by someone at a desk, and it should feel like an instrument
 * rather than a document.
 *
 * So the ground is the same two ingredients as the journey field — soft blooms
 * with the current running over them — wound tighter. Beams here are shorter,
 * faster, more numerous and lean blue; over there they are long, slow and
 * amber. That difference is the only one between the two files, and it is the
 * whole of what separates an instrument from a roof in the sun.
 *
 * Strikes are biased out to the margins and the field is masked back across the
 * reading column as well. See `edgeX` in `CurrentField` and
 * `--field-reading-mask`: a readout is the last thing on the site that can
 * afford movement behind it.
 *
 * GridPulses used to run short comet traces along a lattice here so the ground
 * read as running rather than drawn. The lattice is gone and so is it, but the
 * instinct was right and this is it done properly. What was wrong with the
 * comets was that they were snapped to exact multiples of the 56px pitch, so
 * every trace confirmed the grid it ran on and the two fought each other for
 * the same job. With no grid left to trace, a beam is free to strike anywhere
 * and run in any direction — and it costs less than the comets did, because
 * nothing is animating while it waits its turn.
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

/**
 * The weather on this ground.
 *
 * Twenty-six beams to the journey field's eighteen, at roughly two thirds the
 * length and half the rest between strikes. Blue twice in the tone list, amber
 * once: the console is lit like equipment rather than like a window.
 *
 * Three flares, waiting up to eleven seconds. The sun is further away in here.
 */
const WEATHER: Weather = {
  arcs: 26,
  flares: 3,
  tones: ['var(--bolt-blue)', 'var(--bolt-blue)', 'var(--bolt-green)', 'var(--bolt-amber)'],
  reach: [110, 300],
  thick: [6, 11],
  strike: [420, 820],
  gap: [520, 3600],
  flareSize: [150, 260],
  flareBurn: [1300, 1900],
  flareGap: [4200, 11000]
};

export default function ConsoleField() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <SolarShine suns={SUNS} />
      <CurrentField weather={WEATHER} />

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
