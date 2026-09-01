import Reveal from '../../../components/Reveal';
import {DetailPanel, Section, SectionHead, Wrap} from '../../../components/ui';
import {HOW_IT_WORKS} from '../../../data/homeToday';
import {DIGEST} from '../../../data/energyDay';
import {TONE_BG} from '../../../data/command';
import {cn} from '../../../lib/cn';

/**
 * Who the reader is actually dealing with.
 *
 * This is the page's most easily misread section: a homeowner who has just been
 * shown a product naturally assumes there is something to sign up for. There is
 * not — Guardian Care reaches them through the company that put the panels on
 * their roof, under that company's name. Numbering the steps and running a rule
 * between them makes the sequence read as a handover rather than as three
 * unrelated benefits, and the panel underneath states the branding plainly
 * rather than leaving them to infer it.
 *
 * The one dark band in a daylight page, and the meaning is the point rather
 * than the contrast: every other section is about the reader's own house and is
 * lit like one. This section is about the company behind it — an operations
 * team, a queue, somebody else's screen — so it is lit the way the business
 * journey is. Dropping the lights says *this part is not yours to do* faster
 * than a paragraph can, and it gives the page its one change of key.
 */
export default function HowItWorks() {
  return (
    <Section id="c-how" className="theme-night bg-night-band">
      <Wrap>
        <Reveal>
          <SectionHead
            eyebrow="How it works"
            tone="blue"
            title={
              <>
                Provided by your
                <br />
                <span className="text-brand-gradient">solar company.</span>
              </>
            }
            body="Guardian Care is not something you buy directly. It is the platform your solar company uses to look after you — so the monitoring, the advice and the person you speak to all come from them."
          />
        </Reveal>

        <ol className="relative m-0 grid list-none grid-cols-1 gap-9 p-0 min-[820px]:grid-cols-3 min-[820px]:gap-10">
          {/* The rule that turns three cards into one sequence. */}
          <span
            aria-hidden="true"
            className="absolute left-0 right-0 top-[15px] hidden h-px bg-[linear-gradient(90deg,var(--color-blue),var(--color-green))] opacity-30 min-[820px]:block"
          />

          {HOW_IT_WORKS.map((step, index) => (
            <Reveal as="li" key={step.name} delay={index * 0.06} className="relative">
              <div className="mb-5 flex items-center gap-3.5">
                <span
                  className={cn(
                    'grid h-[31px] w-[31px] shrink-0 place-items-center rounded-full border-4 border-bg text-[13px] font-bold text-bg',
                    TONE_BG[step.tone]
                  )}
                >
                  {index + 1}
                </span>
                <span className="h-px flex-1 bg-line-2 min-[820px]:hidden" />
              </div>

              <h3 className="mb-2.5 font-display text-[24px] font-semibold uppercase leading-[1.1]">
                {step.name}
              </h3>
              <p className="text-[15px] font-light leading-[1.62] text-muted">{step.description}</p>
            </Reveal>
          ))}
        </ol>

        <DetailPanel heading="Whose name" attached={false}>
          Every message, alert and portal carries <b>your solar company&rsquo;s brand</b> — in this
          example {DIGEST.installer}, not Guardian Care. You do not create an account with us, you
          are not sold to by us, and you never have to work out which of two companies to call.
          There is one number, and it belongs to the people who installed your system.
        </DetailPanel>
      </Wrap>
    </Section>
  );
}
