import Glyph from '../../../components/Glyph';
import Reveal from '../../../components/Reveal';
import {Section, SectionHead, Wrap} from '../../../components/ui';
import {TONE_TEXT} from '../../../data/command';
import {AFTER, BEFORE, CUSTOMER_JOURNEY, SUMMARY} from '../../../data/existing';
import {cn} from '../../../lib/cn';

/**
 * What the customer ends up holding.
 *
 * Five groups of rows, drawn as the index of a dashboard rather than as a
 * screenshot of one. A mocked-up interface here would be a promise about
 * pixels; a list of exactly what is known about the system is a promise about
 * substance, and it is the one this page can actually keep.
 *
 * Then the before and after, side by side. The left column is what a solar
 * household has today — five true statements that add up to nothing. The right
 * is the same household with something joining them up.
 */
export default function Summary() {
  return (
    <Section id="summary" hairline>
      <Wrap>
        <SectionHead
          eyebrow="Your energy intelligence summary"
          tone="blue"
          title="Everything, in one profile"
          body="This is the shape of what a Guardian Care account holds about a system once it is connected — and what the intelligence layer reasons over every day."
        />

        <div className="grid gap-px overflow-hidden rounded-[22px] bg-line-2 ring-1 ring-line-2 min-[620px]:grid-cols-2 min-[1100px]:grid-cols-5">
          {SUMMARY.map((group, index) => (
            <Reveal key={group.name} delay={index * 0.05} className="bg-panel p-6">
              <span className={cn('mb-5 inline-block', TONE_TEXT[group.tone])}>
                <Glyph name={group.glyph} className="h-7 w-7" />
              </span>
              <div className="mb-4 font-display text-[19px] font-semibold uppercase leading-[1.12] text-ink">
                {group.name}
              </div>
              <ul className="space-y-2.5">
                {group.rows.map((row) => (
                  <li
                    key={row}
                    className="flex items-start gap-2.5 text-[13.5px] font-light leading-[1.45] text-muted"
                  >
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-line-2" />
                    {row}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        {/* ---------- Before and after ---------- */}
        <div className="mt-4 grid gap-4 min-[900px]:grid-cols-2">
          <Reveal className="rounded-[22px] bg-bg-2 p-6 ring-1 ring-line-2 min-[760px]:p-8">
            <div className="text-[10.5px] font-bold uppercase tracking-[.18em] text-faint">
              Before Guardian Care
            </div>
            <ul className="mt-6 space-y-4">
              {BEFORE.map((line) => (
                <li key={line} className="flex items-start gap-3 text-[15px] font-light leading-[1.5] text-muted">
                  <span className="mt-[9px] h-px w-4 shrink-0 bg-line-2" />
                  {line}
                </li>
              ))}
            </ul>
            <p className="mt-7 border-t border-line-2 pt-5 text-[14px] font-light leading-[1.6] text-faint">
              Every line is true. None of them is connected to any of the others.
            </p>
          </Reveal>

          <Reveal
            delay={0.06}
            className="rounded-[22px] bg-[linear-gradient(125deg,var(--color-green-glow),var(--color-blue-glow))] p-6 ring-1 ring-line min-[760px]:p-8"
          >
            <div className="text-[10.5px] font-bold uppercase tracking-[.18em] text-green">
              With Guardian Care
            </div>
            <ul className="mt-6 space-y-3.5">
              {AFTER.map((line) => (
                <li key={line} className="flex items-start gap-3 text-[15px] font-light leading-[1.45] text-ink/85">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-green" />
                  {line}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* ---------- The journey ---------- */}
        <div className="mt-16">
          <Reveal className="mb-8 max-w-[620px]">
            <div className="text-[10.5px] font-bold uppercase tracking-[.18em] text-green">
              The customer journey
            </div>
            <h3 className="mt-3 font-display text-[clamp(24px,3.2vw,36px)] font-semibold uppercase leading-[1.06] text-ink">
              Seven steps, and then it keeps going
            </h3>
          </Reveal>

          <ol className="grid gap-px overflow-hidden rounded-[22px] bg-line-2 ring-1 ring-line-2 min-[620px]:grid-cols-2 min-[1100px]:grid-cols-4">
            {CUSTOMER_JOURNEY.map((step, index) => (
              <Reveal
                key={step.index}
                as="li"
                delay={index * 0.04}
                className="bg-panel p-6"
              >
                <span className="mono text-[11.5px] font-semibold text-green">{step.index}</span>
                <div className="mt-3 text-[16px] font-medium leading-[1.25] text-ink">
                  {step.name}
                </div>
                <div className="mt-2 text-[13.5px] font-light leading-[1.5] text-muted">
                  {step.line}
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Wrap>
    </Section>
  );
}
