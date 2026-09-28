import CurrentField, {type Weather} from '../../../components/CurrentField';
import SolarShine, {type Shine} from '../../../components/SolarShine';

/**
 * The ground the journey pages stand on.
 *
 * Two things, in this order: three soft blooms carrying the mark's amber,
 * green and blue, and the current itself running over them — short beams that
 * strike out at the margins and go, with the occasional warm flare.
 *
 * The division of labour is the point. The blooms are colour and hold still;
 * the beams are event and carry almost no colour of their own. A lattice of
 * hairlines stood here for a long time, in one weight and then in two, and a
 * photovoltaic array of cells and busbars before that. Both were the same
 * mistake in different clothes: a ground that *describes* where energy goes,
 * drawn on a page whose whole subject is energy actually going there. The beams
 * are the thing rather than the diagram of it.
 *
 * Strikes are biased out to the margins and the field is masked back across the
 * reading column on top of that — see `edgeX` in `CurrentField` and
 * `--field-reading-mask`. Two defences rather than one, because movement behind
 * a paragraph is a good deal worse than texture ever was.
 *
 * Slower and longer-reaching than the console field's weather, and warm rather
 * than blue: this is the domestic half of the site. An instrument crackles; a
 * roof in the sun does not.
 *
 * Shared by three routes — Home, Consumer and Plan — so a mistake here is
 * site-wide minus one page.
 *
 * Entirely presentational: `aria-hidden`, no pointer events, negative
 * z-index, bounded to the page rather than the viewport so it stops at the
 * footer instead of running underneath it.
 */

/**
 * Where the light comes from.
 *
 * **The first is in `vh`, and that is not a style choice.** This field is
 * `absolute inset-0` inside the page's `<main>`, so a percentage here resolves
 * against the height of the *whole page*, not the screen. On a seven-section
 * home page that is around 5400px — so the `-top-[22%]` the old amber blob
 * carried put it about 1190px above the page, and since the blob was only
 * ~1120px tall, it never appeared at all. Anything meant to sit in the hero
 * has to be pinned in viewport units. The lower two are genuinely
 * percent-of-page and stay that way.
 *
 * Top sun on the left, for two reasons. `EnergyField` draws a literal dotted
 * sun at the top left of the home hero, and a ground lit from the right would
 * contradict it — two light sources in one view. And the Consumer and Plan
 * heroes each paint their own amber blob at `-right-[14%]`, which a fourth
 * light on that side would turn into a hotspot.
 *
 * The three breaths are coprime-ish, so the blooms never resolve into one
 * pulse.
 */
const SUNS: Shine[] = [
  {
    top: '34vh',
    side: 'left',
    offset: '6%',
    tone: 'var(--wash-amber)',
    under: 'var(--wash-green)',
    core: 'min(46vmax, 460px)',
    blur: 90,
    breath: 19
  },
  {
    top: '30%',
    side: 'right',
    offset: '-12%',
    tone: 'var(--wash-green)',
    under: 'var(--wash-blue)',
    core: 'min(38vmax, 380px)',
    blur: 90,
    breath: 23
  },
  {
    top: '66%',
    side: 'left',
    offset: '-16%',
    tone: 'var(--wash-blue)',
    under: 'var(--wash-green)',
    core: 'min(42vmax, 420px)',
    blur: 90,
    breath: 29
  }
];

/**
 * The weather on this ground.
 *
 * Eighteen beams against the console's twenty-six, longer, slower, and resting
 * up to five seconds between strikes. Amber twice in the tone list so the
 * journey reads warm; the blue is there to stop it reading as one colour.
 *
 * Four flares to eighteen beams, waiting up to nine seconds each. A flare is
 * meant to be noticed when it happens, which only works if it is rare.
 */
const WEATHER: Weather = {
  arcs: 18,
  flares: 4,
  tones: ['var(--bolt-amber)', 'var(--bolt-amber)', 'var(--bolt-green)', 'var(--bolt-blue)'],
  reach: [150, 430],
  thick: [7, 13],
  strike: [640, 1180],
  gap: [900, 5200],
  flareSize: [180, 340],
  flareBurn: [1500, 2300],
  flareGap: [3400, 9000]
};

export default function CommandField() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <SolarShine suns={SUNS} />
      <CurrentField weather={WEATHER} />

      {/* Sides down, and the last few per cent held for the handoff to the
          footer. Linear passes rather than a vignette: the element is many
          screens tall, so an ellipse sized to it would mean nothing. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, color-mix(in srgb, var(--color-bg) 85%, transparent), transparent 18%, transparent 82%, color-mix(in srgb, var(--color-bg) 85%, transparent)), linear-gradient(180deg, transparent 0%, transparent 96%, color-mix(in srgb, var(--color-bg) 90%, transparent))'
        }}
      />
    </div>
  );
}
