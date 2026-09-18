import Reveal from '../../../components/Reveal';
import {BTN, BTN_LINE, ClosingSection, Section, Wrap} from '../../../components/ui';
import {SHIFTS} from '../../../data/businessFlow';

/**
 * What actually changes, and then the ask.
 *
 * The three shifts are the page's argument compressed to three lines, set as
 * movements rather than as claims — each one has a left side the reader
 * recognises as their current situation, which is what makes the right side
 * land as a destination instead of as a feature.
 */
export default function Closing() {
  return (
    <>
      <Section hairline>
        <Wrap>
          <Reveal className="mb-10 max-w-[620px]">
            <div className="text-[10.5px] font-bold uppercase tracking-[.18em] text-green">
              What could Guardian Care change?
            </div>
            <h2 className="mt-3 font-display text-[clamp(26px,3.6vw,42px)] font-semibold uppercase leading-[1.04]">
              Three shifts
            </h2>
          </Reveal>

          <div className="grid gap-px overflow-hidden rounded-frame bg-line-2 ring-lit">
            {SHIFTS.map(([from, to], index) => (
              <Reveal
                key={from}
                delay={index * 0.06}
                className="glass grid items-center gap-4 p-6 min-[760px]:grid-cols-[1fr_auto_1fr] min-[760px]:gap-8 min-[760px]:px-9 min-[760px]:py-8"
              >
                <span className="text-[16px] font-light leading-[1.4] text-faint min-[760px]:text-right">
                  {from}
                </span>

                <span
                  aria-hidden="true"
                  className="text-green min-[760px]:flex min-[760px]:justify-center"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 rotate-90 min-[760px]:rotate-0" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12h15M13 6l6 6-6 6" />
                  </svg>
                </span>

                <span className="text-[17px] font-normal leading-[1.35] text-ink min-[760px]:text-[19px]">
                  {to}
                </span>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </Section>

      <ClosingSection
        title={
          <>
            Acquire. Capture.
            <br />
            <span className="text-brand-gradient">Retain.</span>
          </>
        }
        body="Tell us a little about your company and we will help you understand where Guardian Care could fit into your existing customer process — your market, your business type, your approximate customer base and the main thing you would like to improve."
        bodyClassName="max-w-[640px]"
        action={
          <Reveal className="flex flex-wrap justify-center gap-3">
            <a href="#assess" className={BTN}>
              Build my business profile
            </a>
            <a href="#portfolio" className={BTN_LINE}>
              See the portfolio view
            </a>
          </Reveal>
        }
      />
    </>
  );
}
