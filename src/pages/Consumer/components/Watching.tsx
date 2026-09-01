import Counter from '../../../components/Counter';
import Reveal from '../../../components/Reveal';
import {Section, SectionHead, Wrap} from '../../../components/ui';
import Photo from './Photo';
import {ALERT_EFFORT, ALERT_TIMELINE} from '../../../data/alerts';
import {TONE_BG, TONE_TEXT} from '../../../data/command';
import {cn} from '../../../lib/cn';

/**
 * The part a homeowner genuinely cannot do themselves.
 *
 * Everything above this section helps someone who has decided to look. This one
 * is for the eleven months of the year when they do not: a system quietly
 * losing its afternoon, caught against its own history, routed to the company
 * that installed it, and closed out — the household's whole contribution being
 * that they answered the phone.
 *
 * Laid out along a horizontal rail rather than down a column, because the
 * subject is elapsed time. Tuesday afternoon to Friday reads as three days when
 * it runs left to right and as four paragraphs when it runs downward, and three
 * days is the fact the section is actually selling.
 *
 * Nothing here sits in a box. A photograph inside a bordered card with a
 * caption panel bolted underneath, and a row of identical tiles holding one
 * number each, are the two most template-looking things a page can do; so the
 * photograph stands on its own, and the three figures sit on open ground under
 * a single rule. The count is the punchline and it lands harder unboxed.
 *
 * The photograph is the one place a person appears in this journey, and it
 * belongs here rather than in the hero — the whole section is about somebody
 * actually turning up.
 */
export default function Watching() {
  return (
    <Section id="c-watch">
      <Wrap>
        <div className="grid grid-cols-1 items-end gap-10 min-[1000px]:grid-cols-[minmax(0,1fr)_minmax(0,260px)] min-[1000px]:gap-16">
          <Reveal>
            <SectionHead
              eyebrow="Watching over it"
              tone="blue"
              title={
                <>
                  You are not the one
                  <br />
                  <span className="text-brand-gradient">who has to notice.</span>
                </>
              }
              body="A panel does not fail loudly. It makes a little less, on a roof nobody looks at, for months. Guardian Care compares yours against its own history every day, and when the pattern breaks, the call comes to you."
            />
          </Reveal>

          {/* <Reveal className="mb-13">
            <Photo
              src="/assets/photos/installer.jpg"
              alt="A solar engineer working on a rooftop array"
              veil={false}
              className="aspect-[4/3] rounded-frame"
            />
          </Reveal> */}
        </div>

        <div className="relative">
          {/* One rail per orientation. The gradient runs the way the story does
              — amber at the fault, green by the end — and fades out past the
              last step so the sequence reads as finished, not truncated. */}
          <span
            aria-hidden="true"
            className="absolute bottom-10 left-[7px] top-3 w-px bg-[linear-gradient(180deg,var(--color-amber),var(--color-blue),var(--color-green),transparent)] opacity-45 min-[900px]:hidden"
          />
          <span
            aria-hidden="true"
            className="absolute left-0 right-0 top-[7px] hidden h-px bg-[linear-gradient(90deg,var(--color-amber),var(--color-blue),var(--color-green),transparent)] opacity-45 min-[900px]:block"
          />

          <ol className="m-0 grid list-none grid-cols-1 gap-x-8 p-0 min-[900px]:grid-cols-4">
            {ALERT_TIMELINE.map((step, index) => (
              <Reveal
                as="li"
                key={step.title}
                delay={index * 0.06}
                className="relative pb-8 pl-8 last:pb-0 min-[900px]:pb-0 min-[900px]:pl-0"
              >
                {/* Absolute on the left of a stacked list; back in flow above
                    the copy once the rail turns horizontal. */}
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute left-0 top-[7px] h-[15px] w-[15px] rounded-full border-4 border-bg',
                    'min-[900px]:relative min-[900px]:left-auto min-[900px]:top-auto min-[900px]:mb-7 min-[900px]:block',
                    TONE_BG[step.tone]
                  )}
                />

                <div className="mono mb-2 text-[12.5px] text-faint">{step.when}</div>

                <h3 className="font-display text-[21px] font-semibold uppercase leading-[1.1]">
                  {step.title}
                </h3>
                <div
                  className={cn(
                    'mb-2.5 mt-1.5 text-[10.5px] font-bold uppercase tracking-[.14em]',
                    step.actor === 'You' ? 'text-faint' : TONE_TEXT[step.tone]
                  )}
                >
                  {step.actor}
                </div>

                <p className="max-w-[620px] text-[14.5px] font-light leading-[1.65] text-muted">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* The count the copy never has to make. */}
        {/* <Reveal className="mt-12 flex flex-wrap gap-x-16 gap-y-8 border-t border-line-2 pt-9">
          {ALERT_EFFORT.map((item) => (
            <div key={item.label}>
              <Counter
                value={item.value}
                className="block font-display text-[clamp(46px,5vw,62px)] font-semibold leading-none text-green"
              />
              <div className="mt-2 text-[13.5px] font-light text-muted">{item.label}</div>
            </div>
          ))}
        </Reveal> */}
      </Wrap>
    </Section>
  );
}
