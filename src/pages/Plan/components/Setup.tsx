import Glyph from '../../../components/Glyph';
import Reveal from '../../../components/Reveal';
import {HAIRLINE_GRID, Section, SectionHead, Wrap} from '../../../components/ui';
import {TONE_TEXT} from '../../../data/command';
import {RECOMMENDATIONS, type PlanPosition} from '../../../data/plan';
import {cn} from '../../../lib/cn';

/**
 * The suggested starting point.
 *
 * Four recommendations, each with the reason printed next to it rather than in
 * a footnote. The last two are not hardware, which is the point: a system that
 * is installed and then never looked at again is the failure mode this whole
 * platform exists to prevent, and putting monitoring on the same list as the
 * panels says so structurally.
 *
 * Sizes come from the visitor's own position where they answered the
 * assessment, and fall back to "sized during assessment" where they did not —
 * never to an invented number.
 */
export default function Setup({position}: {position: PlanPosition}) {
  return (
    <Section id="setup" hairline>
      <Wrap>
        <SectionHead
          eyebrow="Your suggested energy setup"
          index="04 / 05"
          title="A starting point, not a quotation"
          body="Guardian Care auto-suggests a shape for the system from what you have told it. Every capacity here is confirmed during a property assessment before anything is specified or priced."
        />

        <div className={cn(HAIRLINE_GRID, 'grid-cols-1 min-[620px]:grid-cols-2 min-[1100px]:grid-cols-4')}>
          {RECOMMENDATIONS.map((item, index) => (
            <Reveal key={item.key} delay={index * 0.05} className="flex flex-col bg-panel p-6 min-[760px]:p-7">
              <span className={cn('mb-5 inline-block', TONE_TEXT[item.tone])}>
                <Glyph name={item.glyph} className="h-8 w-8" />
              </span>

              <div className="font-display text-[21px] font-semibold uppercase leading-[1.1] text-ink">
                {item.name}
              </div>

              <div className={cn('mono mt-3 text-[15px] font-semibold', TONE_TEXT[item.tone])}>
                {item.value(position)}
              </div>

              <div className="mt-6 border-t border-line-2 pt-5">
                <div className="text-[10.5px] font-bold uppercase tracking-[.18em] text-faint">
                  Why
                </div>
                <p className="mt-2.5 text-[14px] font-light leading-[1.55] text-muted">{item.why}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Wrap>
    </Section>
  );
}
