import Counter from '../../../components/Counter';
import Reveal from '../../../components/Reveal';
import {BTN, BTN_LINE, DeviceFrame, Eyebrow, Wrap} from '../../../components/ui';
import SolarShine from './SolarShine';
import {DIGEST} from '../../../data/energyDay';
import {TONE_TEXT} from '../../../data/command';
import {cn} from '../../../lib/cn';

/**
 * The opening claim, with the product beside it rather than described.
 *
 * The handset carries the actual proposition: a solar owner does not open an
 * app, they receive a message from the company that installed their system,
 * and it opens with a sentence in English rather than a chart. Showing that in
 * the first screen settles what Guardian Care *is* before the page has to
 * explain it — and it carries the installer's name, not ours, which is the
 * other thing the page has to establish early.
 *
 * Behind the whole frame is the sun rather than a photograph of one. The page
 * is about what a roof is doing at this moment, and light is the one background
 * that *is* that rather than a picture of it — no licence, no dated frame, and
 * no stranger's house standing in front of a reader looking at their own.
 */
export default function Hero() {
  return (
    <header className="relative isolate overflow-hidden py-15 min-[760px]:py-[100px]">
      <SolarShine />

      <Wrap>
        <div className="grid grid-cols-1 items-center gap-14 min-[1000px]:grid-cols-[1.15fr_auto] min-[1000px]:gap-16">
          <div className="max-w-[640px]">
            <Reveal>
              <Eyebrow tone="blue" size="hero">
                For Solar Consumers
              </Eyebrow>
            </Reveal>

            <Reveal
              as="h1"
              delay={0.06}
              className="mb-[22px] font-display text-[clamp(38px,5.4vw,64px)] font-semibold uppercase leading-[1.02]"
            >
              Understand your
              <br />
              <span className="text-brand-gradient">home energy.</span>
            </Reveal>

            <Reveal
              as="p"
              delay={0.12}
              className="mb-9 text-[17px] font-light leading-[1.65] text-muted min-[760px]:text-[18px]"
            >
              You had solar installed. Guardian Care explains what it is actually doing — what you
              generated, what your home used, what went to the grid, and whether anything needs
              looking at. In plain language, provided through your solar company.
            </Reveal>

            <Reveal delay={0.18} className="flex flex-wrap gap-3.5">
              <a href="#c-today" className={BTN}>
                See a real day →
              </a>
              <a href="#c-watch" className={BTN_LINE}>
                What happens if something breaks
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.24}>
            <DeviceFrame carrier={DIGEST.installer} time="7:04">
              <div className="flex items-center justify-between border-b border-line-2 pb-3.5">
                <div className="text-[12.5px] font-semibold uppercase tracking-[.1em] text-ink">
                  Your solar yesterday
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-pill border border-line px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.12em] text-green">
                  <span className="animate-blip h-1.5 w-1.5 rounded-full bg-green" />
                  {DIGEST.status}
                </span>
              </div>

              <p className="mt-4 text-[15px] font-light leading-[1.6] text-ink">{DIGEST.greeting}</p>
              <p className="mt-2 text-[13.5px] font-light leading-[1.6] text-muted">
                {DIGEST.summary}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-tile border border-line-2 bg-line-2">
                {DIGEST.lines.map((line) => (
                  <div key={line.label} className="bg-panel-2 px-3 py-2.5">
                    <div className="text-[9.5px] font-bold uppercase tracking-[.14em] text-faint">
                      {line.label}
                    </div>
                    <Counter
                      value={line.value}
                      className={cn(
                        'mono mt-1 block text-[15px] font-semibold',
                        TONE_TEXT[line.tone]
                      )}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-tile border border-line bg-[linear-gradient(150deg,var(--color-green-glow),transparent)] px-3.5 py-3">
                <div className="text-[9.5px] font-bold uppercase tracking-[.14em] text-green">
                  {DIGEST.action}
                </div>
                <p className="mt-1.5 text-[13px] font-light leading-[1.55] text-muted">
                  {DIGEST.actionBody}
                </p>
              </div>

              <div className="mt-3.5 text-center text-[10px] font-light uppercase tracking-[.14em] text-faint">
                Powered by Guardian Care
              </div>
            </DeviceFrame>
          </Reveal>
        </div>
      </Wrap>
    </header>
  );
}
