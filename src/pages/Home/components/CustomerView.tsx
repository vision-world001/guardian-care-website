import {Link} from 'react-router';
import Counter from '../../../components/Counter';
// Restore with the commented-out <Glyph> below: import Glyph from '../../../components/Glyph';
import Reveal from '../../../components/Reveal';
import {Section, Wrap} from '../../../components/ui';
import {TONE_TEXT, TONE_VAR} from '../../../data/command';
import {TODAY, TODAY_ROWS} from '../../../data/platform';
import {cn} from '../../../lib/cn';
import {LiveDot} from './Conduit';

/**
 * And then everything goes quiet.
 *
 * Placed immediately after the operations queue on purpose. The two sections
 * are the same platform on the same day, and the whole argument of the
 * preceding section is that the customer should never see any of it — no
 * priority ladder, no reference numbers, no fault codes. One figure, where it
 * went, and a sentence.
 *
 * The split is drawn rather than described: three bars against one total. A
 * household understands "most of it went into the house, the rest is stored or
 * sold" faster from proportions than from three numbers, and the proportions
 * are the actual readings rather than an illustration of them.
 */
export default function CustomerView() {
  return (
    <Section id="customer" hairline className="py-16 min-[760px]:py-24">
      <Wrap>
        <Reveal className="mx-auto mb-16 max-w-[680px] text-center">
          <h2 className="font-display text-[clamp(30px,4.6vw,54px)] font-semibold uppercase leading-[0.98] tracking-[-0.015em] text-ink">
            Complex energy.
            <br />
            <span className="text-brand-gradient">Simple to understand.</span>
          </h2>
        </Reveal>

        <div className="mx-auto max-w-[560px]">
          <Reveal className="glass shadow-lift ring-lit overflow-hidden rounded-frame">
            {/* ---------- Status ---------- */}
            <div className="flex items-center gap-2.5 border-b border-line-2 px-6 py-4 min-[520px]:px-8">
              <LiveDot />
              <span className="mono text-[11px] font-semibold uppercase tracking-[.16em] text-green">
                {TODAY.status}
              </span>
            </div>

            {/* ---------- The one figure ---------- */}
            <div className="px-6 py-9 text-center min-[520px]:px-8">
              <div className="mono text-[10.5px] font-semibold uppercase tracking-[.2em] text-faint">
                Today’s solar
              </div>
              <div className="mono mt-4 text-[clamp(46px,10vw,76px)] font-semibold leading-none text-amber">
                <Counter value={TODAY.generated.toFixed(1)} />
                <span className="mono ml-2.5 text-[15px] font-normal text-faint">kWh</span>
              </div>
            </div>

            {/* ---------- And where it went ---------- */}
            <div className="border-t border-line-2 px-6 py-8 min-[520px]:px-8">
              <div className="space-y-5">
                {TODAY_ROWS.map((row) => (
                  <div key={row.label}>
                    <div className="mb-2 flex items-baseline justify-between gap-4">
                      <span className="mono text-[11px] font-semibold uppercase tracking-[.16em] text-faint">
                        {row.label}
                      </span>
                      <span className={cn('mono text-[15px] font-semibold', TONE_TEXT[row.tone])}>
                        {row.value.toFixed(1)}
                        <span className="mono ml-1 text-[11px] font-normal text-faint">kWh</span>
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-pill bg-line-2">
                      <div
                        className="h-full rounded-pill"
                        style={{
                          width: `${(row.value / TODAY.generated) * 100}%`,
                          background: TONE_VAR[row.tone]
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <p className="mono mt-6 border-t border-line-2 pt-5 text-[11px] uppercase tracking-[.12em] text-faint">
                {TODAY.used} + {TODAY.stored} + {TODAY.exported} = {TODAY.generated} kWh
              </p>
            </div>

            {/* ---------- What the platform made of it ---------- */}
            <div className="border-t border-line-2 bg-bg/40 px-6 py-6 min-[520px]:px-8">
              <span className="mono block text-[10px] font-semibold uppercase tracking-[.2em] text-amber">
                Guardian Care Intelligence
              </span>
              <p className="mt-2.5 text-[15.5px] font-light leading-[1.55] text-ink/90">
                “{TODAY.ai}”
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="mt-8 flex flex-col items-center gap-4">
            <Link
              to="/consumer"
              className="inline-flex items-center gap-2.5 rounded-pill bg-[var(--cta)] px-8 py-4 text-[12px] font-bold uppercase tracking-[.1em] text-[var(--cta-ink)] shadow-[0_14px_36px_-16px_var(--btn-glow)] transition duration-250 ease-brand hover:-translate-y-0.5 hover:bg-[var(--cta-hover)]"
            >
              Explore my energy →
            </Link>

            {/* The third journey. It is not one of the three products, but it is
                a real page and a real reader, and leaving it reachable only from
                the footer would be hiding it. */}
            <Link
              to="/plan"
              className="group inline-flex items-center gap-2 text-[13.5px] font-light text-faint transition-colors hover:text-ink"
            >
              {/* <Glyph name="plan" className="h-4 w-4" /> */}
              No system yet? Build an energy plan
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </Link>
          </Reveal>
        </div>
      </Wrap>
    </Section>
  );
}
