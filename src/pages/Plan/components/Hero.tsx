import Counter from '../../../components/Counter';
import Glyph, {type GlyphName} from '../../../components/Glyph';
import {LABEL, LABEL_BASE, PRIMARY, SECONDARY} from '../../../components/kit';
import Reveal from '../../../components/Reveal';
import {Estimated, Wrap} from '../../../components/ui';
import {EXAMPLE} from '../../../data/plan';
import {cn} from '../../../lib/cn';
import {Figure, UnitKey, Units, type Segment} from './parts';

/**
 * The opening.
 *
 * Deliberately not a solar page. It opens on the electricity bill, because
 * that is the number the decision actually turns on and the only one the
 * reader already knows — and because a package offered before anybody has
 * established what the property currently pays is a quotation wearing the
 * clothes of advice.
 *
 * The four questions the journey asks are shown as four marks rather than four
 * sentences. A visitor decides whether to scroll in about a second, and four
 * symbols with two words under them are read in that second; four questions
 * with question marks on the end are not read at all.
 *
 * The card is the page's thesis in one object: ten squares, every one of them
 * hollow, because today every unit this property uses is bought. Nothing else
 * on the page has to argue for solar after that — the rest of the journey is
 * just filling the squares in.
 */

/** What the assessment is built from, as four marks. */
const ASKS: Array<{glyph: GlyphName; label: string}> = [
  {glyph: 'cost', label: 'What you pay'},
  {glyph: 'grid', label: 'Grid dependence'},
  {glyph: 'generation', label: 'Solar potential'},
  {glyph: 'storage', label: 'Storage value'}
];

/** Ten units of household electricity, all of them purchased. */
const TODAY: Segment[] = [{tone: 'orange', count: 10, hollow: true, label: 'Bought from the grid'}];

export default function Hero() {
  return (
    <header className="relative isolate overflow-hidden">
      {/* Warm above, because the thing being offered is daylight. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[14%] -top-[20%] -z-10 h-[72vw] w-[72vw] rounded-full blur-[150px] min-[1000px]:h-[54vw] min-[1000px]:w-[54vw]"
        style={{background: 'radial-gradient(circle, color-mix(in srgb, var(--color-amber) 13%, transparent), transparent 64%)'}}
      />

      <Wrap>
        <div className="grid items-center gap-14 py-20 min-[760px]:py-24 min-[1000px]:min-h-[88vh] min-[1000px]:grid-cols-[1.04fr_0.96fr] min-[1000px]:gap-12 min-[1180px]:gap-20">
          {/* ---------- The words ---------- */}
          <div>
            <Reveal
              className={cn(
                LABEL_BASE,
                'inline-flex items-center text-[12px] tracking-[.22em] text-amber'
              )}
            >
              Looking to reduce your electricity costs?
            </Reveal>

            <Reveal
              as="h1"
              delay={0.05}
              className="mt-7 font-display text-[clamp(40px,5.4vw,70px)] font-semibold uppercase leading-[0.9] tracking-[-0.02em] text-ink"
            >
              Build the right
              <br />
              energy system
              <br />
              <span className="text-brand-gradient">around your home.</span>
            </Reveal>

            <Reveal
              as="p"
              delay={0.1}
              className="mt-7 max-w-[520px] text-[17px] font-light leading-[1.65] text-muted min-[760px]:text-[18.5px]"
            >
              We start with what you pay the grid today, then work out what solar and storage would
              actually change about it. The system is designed around{' '}
              <em className="not-italic text-ink">that</em>, not around a package.
            </Reveal>

            {/* ---------- The four questions, as four marks ----------

                A fixed two-by-two rather than a wrapping row: at this column
                width four across does not fit and `flex-wrap` settles on three
                and a widow, which reads as a layout that ran out of room. */}
            <Reveal
              delay={0.16}
              as="ul"
              className="mt-9 grid max-w-[440px] grid-cols-2 gap-x-6 gap-y-5"
            >
              {ASKS.map((ask) => (
                <li key={ask.label} className="flex items-center gap-2.5">
                  <Glyph name={ask.glyph} className="h-6 w-6 shrink-0 text-green" />
                  <span className="mono text-[10.5px] font-semibold uppercase tracking-[.14em] text-muted">
                    {ask.label}
                  </span>
                </li>
              ))}
            </Reveal>

            <Reveal delay={0.22} className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#assess" className={PRIMARY}>
                Get my solar &amp; energy quote →
              </a>
              <a href="#changes" className={SECONDARY}>
                What solar changes
              </a>
            </Reveal>

          </div>

          {/* ---------- Where you are standing ---------- */}
          <Reveal animation="animate-card-in" delay={0.2} className="mx-auto w-full max-w-[520px]">
            <StartingCard />
          </Reveal>
        </div>
      </Wrap>
    </header>
  );
}

/**
 * One household's position before anything is installed.
 *
 * Every figure is derived from the two a reader would actually know — the
 * monthly bill and the unit rate — so nothing here is a number somebody picked
 * because it flattered the argument.
 */
function StartingCard() {
  return (
    <div className="glass shadow-lift ring-lit overflow-hidden rounded-frame">
      <div className="flex items-center justify-between gap-4 border-b border-line-2 px-6 py-4 min-[520px]:px-7">
        <span className={cn(LABEL, 'text-orange')}> Your starting position</span>
        <span className="mono text-[10px] uppercase tracking-[.16em] text-faint">Example home</span>
      </div>

      {/* ---------- What it costs ---------- */}
      <div className="px-6 pb-7 pt-7 min-[520px]:px-7">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className={cn(LABEL, 'text-faint')}>Electricity, per year</div>
            <Figure
              size="lg"
              tone="ink"
              unit={`from £${EXAMPLE.monthlyBill} a month`}
              className="mt-3"
              value={<Counter value={`£${EXAMPLE.annualSpend.toLocaleString('en-GB')}`} />}
            />
          </div>
          <Glyph name="cost" className="mb-1 h-10 w-10 shrink-0 text-orange/70" />
        </div>

        {/* ---------- And where every unit of it comes from ---------- */}
        <div className="mt-9">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <span className={cn(LABEL, 'text-faint')}>Every 10 kWh you use</span>
            <span className="mono text-[11px] uppercase tracking-[.14em] text-orange">
              100% purchased
            </span>
          </div>

          <Units segments={TODAY} className="mt-4" />
          <UnitKey segments={TODAY} className="mt-4" />
        </div>
      </div>

      {/* ---------- The facts underneath it ---------- */}
      <dl className="grid grid-cols-3 gap-px border-t border-line-2 bg-line-2">
        {[
          {label: 'Grid rate', value: `${EXAMPLE.importRate}p`, note: 'per kWh'},
          {label: 'Solar', value: 'None', note: 'Nothing generated here'},
          {label: 'Storage', value: 'None', note: 'Nothing held back'}
        ].map((fact) => (
          <div key={fact.label} className="bg-panel px-4 py-5 min-[520px]:px-5">
            <dt className="mono text-[9.5px] font-semibold uppercase tracking-[.14em] text-faint">
              {fact.label}
            </dt>
            <dd className="mono mt-2.5 text-[18px] font-semibold text-ink">{fact.value}</dd>
            <dd className="mt-1.5 text-[11.5px] font-light leading-snug text-muted">{fact.note}</dd>
          </div>
        ))}
      </dl>

      {/* ---------- What happens next ---------- */}
      <div className="flex flex-wrap items-center gap-3 border-t border-line-2 bg-bg/40 px-6 py-5 min-[520px]:px-7">
        <Estimated label="Estimated from your bill" />
        <p className="min-w-[200px] flex-1 text-[14px] font-light leading-[1.5] text-ink/85">
          Guardian Care can now estimate how much of this solar and storage could change.
        </p>
      </div>
    </div>
  );
}
