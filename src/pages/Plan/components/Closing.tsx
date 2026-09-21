import Glyph from '../../../components/Glyph';
import {LABEL, PRIMARY, SECONDARY, ramp} from '../../../components/kit';
import Reveal from '../../../components/Reveal';
import {Section, Wrap} from '../../../components/ui';
import {OUTCOME} from '../../../data/plan';
import {cn} from '../../../lib/cn';

/**
 * The sign-off.
 *
 * Five verbs, set as large as the page can carry them, lit down the mark's own
 * ramp. By the time a reader arrives here they have been shown each one — the
 * squares filling in, the surplus being held back, the estimate becoming a
 * reading — so the line names what they were shown rather than explaining it
 * again. That is the only reason it is allowed to be this short.
 *
 * Three actions rather than one, because three different people finish this
 * page: somebody ready to be quoted, somebody still deciding about storage,
 * and somebody who wants to know who is behind it. A single button serves the
 * first and loses the other two.
 */
export default function Closing() {
  return (
    <Section id="close" hairline className="py-20 min-[760px]:py-28">
      <Wrap>
        <Reveal className="mx-auto max-w-[820px] text-center">
          <div className={cn(LABEL, 'text-amber')}>◇ What it is all for</div>
          {/* Both lines are set explicitly. Left to wrap, the first one puts
              "you" alone on a line of its own at desktop width, which on a
              display face at this size is impossible not to see. */}
          <h2 className="mt-6 font-display text-[clamp(32px,5.4vw,62px)] font-semibold uppercase leading-[0.96] tracking-[-0.02em] text-ink">
            Solar should do more
            <br />
            <span className="text-brand-gradient">than sit on your roof.</span>
          </h2>
          <p className="mx-auto mt-7 max-w-[540px] text-[16.5px] font-light leading-[1.65] text-muted">
            Your energy system should help you understand — and improve — the way your property
            uses electricity.
          </p>
        </Reveal>

        {/* ---------- The five verbs ---------- */}
        <ol className="mx-auto mt-16 max-w-[820px]">
          {OUTCOME.map((step, index) => {
            const colour = ramp(index, OUTCOME.length);

            return (
              <Reveal
                key={step.verb}
                as="li"
                delay={index * 0.06}
                className="flex items-center gap-5 border-b border-line-2 py-5 last:border-b-0 min-[760px]:gap-8 min-[760px]:py-7"
              >
                {/* Both wear the ramp inline: it resolves to a color-mix() at
                    render rather than to one of the palette's named tones, so
                    there is no utility class that could carry it. */}
                <span className="shrink-0" style={{color: colour}}>
                  <Glyph
                    name={step.glyph}
                    className="h-8 w-8 min-[760px]:h-10 min-[760px]:w-10"
                  />
                </span>

                <span
                  className="font-display text-[clamp(30px,6vw,60px)] font-semibold uppercase leading-[0.92] tracking-[-0.02em]"
                  style={{color: colour}}
                >
                  {step.verb}
                </span>

                <span className="mono ml-auto hidden max-w-[240px] shrink-0 text-right text-[10.5px] uppercase leading-[1.5] tracking-[.14em] text-faint min-[900px]:block">
                  {step.line}
                </span>
              </Reveal>
            );
          })}
        </ol>

        {/* ---------- And the three ways out ---------- */}
        <Reveal delay={0.2} className="mt-16 flex flex-wrap justify-center gap-3">
          <a href="#assess" className={PRIMARY}>
            Get my solar &amp; energy quote →
          </a>
          <a href="#storage" className={SECONDARY}>
            Explore battery storage
          </a>
          <a href="#ask" className={SECONDARY}>
            Ask about Guardian Care
          </a>
        </Reveal>
      </Wrap>
    </Section>
  );
}
