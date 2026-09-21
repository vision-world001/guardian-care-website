import Glyph from '../../../components/Glyph';
import {Heading, LABEL, LABEL_BASE, dottedRail, ramp, tint} from '../../../components/kit';
import Reveal from '../../../components/Reveal';
import {Section, Wrap} from '../../../components/ui';
import {JOIN, MARKETS} from '../../../data/businessFlow';
import {cn} from '../../../lib/cn';

/**
 * How you join.
 *
 * Four steps, because the honest answer is four steps. A page that has spent
 * six sections showing an operations platform has by now raised the only
 * objection that matters — *this is going to take my team a year* — and the
 * answer to it cannot be another paragraph about the platform.
 *
 * Each step therefore carries the objection it removes rather than a
 * description of itself: no rebuild, your branding, day one. Those three
 * phrases are what an installer repeats to whoever has to approve it, and
 * putting them in the drawing rather than in prose is the difference between
 * being remembered and being read.
 *
 * Lit down the brand ramp, the same sequence the home page's record diagram
 * runs — so arriving at the last step arrives at the platform's own colour.
 */
export default function Join() {
  return (
    <Section id="join" hairline className="py-16 min-[760px]:py-24">
      <Wrap>
        <Heading
          eyebrow="Joining"
          title="Four steps"
          accent="to a live console."
          body="Guardian Care connects to what you already run. Nothing about how you install has to change."
        />

        <ol className="grid gap-4 min-[620px]:grid-cols-2 min-[1100px]:grid-cols-4">
          {JOIN.map((step, index) => {
            const colour = ramp(index, JOIN.length);

            return (
              <Reveal
                key={step.key}
                delay={index * 0.07}
                as="li"
                className="glass ring-lit relative flex flex-col rounded-frame p-6 min-[760px]:p-7"
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className="inline-grid h-10 w-10 place-items-center rounded-tile"
                    style={{
                      background: tint(colour, 14),
                      boxShadow: `inset 0 0 0 1px ${tint(colour, 30)}`,
                      color: colour
                    }}
                  >
                    <Glyph name={step.glyph} className="h-5 w-5" />
                  </span>

                  <span className="mono text-[11px] tracking-[.14em] text-faint">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div
                  className="mt-6 font-display text-[26px] font-semibold uppercase leading-none tracking-[-0.01em]"
                  style={{color: colour}}
                >
                  {step.name}
                </div>

                <p className="mt-3.5 text-[14.5px] font-light leading-[1.55] text-muted">
                  {step.line}
                </p>

                <span
                  className={cn(
                    LABEL_BASE,
                    'mt-6 inline-flex w-fit rounded-pill px-3 py-1.5 text-[9.5px] tracking-[.16em]'
                  )}
                  style={{color: colour, background: tint(colour, 10)}}
                >
                  {step.note}
                </span>

                {/* The connector, on the one breakpoint where the four sit in
                    a single row and a gap between them would read as four
                    products rather than one sequence. */}
                {index < JOIN.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="absolute -right-4 top-[38px] hidden h-px w-4 min-[1100px]:block"
                    style={{background: tint(colour, 40)}}
                  />
                ) : null}
              </Reveal>
            );
          })}
        </ol>

        {/* ---------- Where it runs ---------- */}
        <Reveal delay={0.24} className="mt-4 overflow-hidden rounded-frame ring-1 ring-line-2">
          <div className="flex items-center gap-3 border-b border-line-2 px-5 py-3.5">
            <span aria-hidden="true" className="h-4 w-px" style={dottedRail('var(--color-green)')} />
            <span className={cn(LABEL, 'text-green')}>Live in five markets</span>
          </div>

          <dl className="grid grid-cols-2 gap-px bg-line-2 min-[760px]:grid-cols-5">
            {MARKETS.map((market) => (
              <div key={market.name} className="bg-panel/50 px-5 py-4">
                <dt className="text-[13.5px] font-medium leading-tight text-ink">{market.name}</dt>
                <dd className="mono mt-1.5 text-[10px] uppercase tracking-[.14em] text-faint">
                  {market.currency} &#183; {market.driver}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Wrap>
    </Section>
  );
}
