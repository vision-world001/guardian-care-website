import SolarShine, {type Shine} from '../../../components/SolarShine';

/**
 * The ground the journey pages stand on.
 *
 * Two things, in this order: a 64px lattice of white hairlines, and three
 * soft blooms behind it carrying the mark's amber, green and blue.
 *
 * The division of labour is the point. The grid is structure and is not
 * coloured; the blooms are colour and have no structure. Both were tried the
 * other way round — a grid lit in green and blue, then a photovoltaic array
 * of cells and busbars — and both times the ground stopped being a ground and
 * started being a thing to look at. Behind body copy that is simply a fault.
 *
 * The lattice is also masked back across the middle of the page, where the
 * reading column sits, so it is a texture at the margins and almost nothing
 * behind a paragraph. See `--grid-reading-mask` for why one alpha could never
 * have served both.
 *
 * A 64px pitch here against the console field's 56px: this is the domestic
 * half of the site and the coarser rule is the quieter one.
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

export default function CommandField() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="bg-command-grid absolute inset-0" />
      <SolarShine suns={SUNS} />

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
