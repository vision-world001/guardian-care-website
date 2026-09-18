import Reveal from '../../../components/Reveal';
import {Section, SectionHead, Wrap} from '../../../components/ui';
import {SCATTERED} from '../../../data/existing';

/**
 * The parts, and the gap between them.
 *
 * Most existing solar customers have several pieces of an energy system and no
 * single place bringing the information together. Drawn as five disconnected
 * cards with nothing joining them, then one panel underneath that does the
 * joining — the layout makes the argument before the copy does.
 */
export default function Scattered() {
  return (
    <Section id="today" hairline>
      <Wrap>
        <SectionHead
          eyebrow="How is your system maintained today?"
          index="01 / 06"
          title="Five things reporting. Nothing listening."
          body="You may have all of these. Each one is telling the truth about its own small part of the picture, to nobody in particular."
        />

        <div className="grid gap-3 min-[620px]:grid-cols-2 min-[1100px]:grid-cols-5">
          {SCATTERED.map((part, index) => (
            <Reveal
              key={part.name}
              delay={index * 0.05}
              className="rounded-[18px] bg-panel p-5 ring-1 ring-line-2"
            >
              <div className="text-[16px] font-medium leading-[1.3] text-ink">{part.name}</div>
              <div className="mt-2 text-[14px] font-light leading-[1.5] text-muted">
                {part.line}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal
          delay={0.3}
          className="mt-4 overflow-hidden rounded-[22px] bg-[linear-gradient(115deg,var(--color-green-glow),var(--color-blue-glow))] p-6 ring-1 ring-line min-[760px]:p-9"
        >
          <div className="font-display text-[clamp(22px,3vw,32px)] font-semibold uppercase leading-[1.08] text-ink">
            But who is looking at the complete picture?
          </div>
          <p className="mt-3 max-w-[680px] text-[15.5px] font-light leading-[1.65] text-muted">
            Guardian Care brings the important information together and builds an ongoing energy
            intelligence profile around your system — so the parts stop being five separate readings
            and start being one position you can act on.
          </p>
        </Reveal>
      </Wrap>
    </Section>
  );
}
