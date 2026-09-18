import Glyph from '../../../components/Glyph';
import Photo from '../../../components/Photo';
import Reveal from '../../../components/Reveal';
import {HAIRLINE_GRID, Section, SectionHead, Wrap} from '../../../components/ui';
import {TONE_TEXT} from '../../../data/command';
import {TRACKED} from '../../../data/existing';
import {cn} from '../../../lib/cn';

/**
 * The moment estimates become readings.
 *
 * Structurally the hinge of the whole page: everything above it is labelled
 * estimated, everything below it is measured. The section says plainly what is
 * physically installed to make that true, because a platform that asks to watch
 * somebody's electricity should be specific about how.
 */
export default function Connect() {
  return (
    <Section id="connect" hairline>
      <Wrap>
        <SectionHead
          eyebrow="Now connect Guardian Care"
          tone="blue"
          index="03 / 06"
          title="Turn estimates into real energy intelligence"
          body="Once you choose to proceed, Guardian Care can connect suitable energy monitoring to your property. Where appropriate, a CT clamp is installed to measure the movement of electricity between your property and the grid."
        />

        {/* A real roof, before the abstractions resume. Everything either side
            of this section is a number; the thing being measured is a house. */}
        <Reveal className="mb-4 overflow-hidden rounded-[22px] ring-1 ring-line-2">
          <div className="grid min-[900px]:grid-cols-[1.1fr_1fr]">
            {/* Sized by the copy beside it — see the note in the plan journey's
                storage band for why `h-full` cannot do this job here. */}
            <div className="relative min-h-[240px] min-[900px]:min-h-[320px]">
              <div className="absolute inset-0">
                <Photo
                  src="/assets/photos/home.jpg"
                  alt="A house with solar panels on its roof, photographed at sunset"
                  className="h-full w-full"
                  veil={false}
                />
              </div>
            </div>
            <div className="bg-panel p-6 min-[760px]:p-9">
              <div className="text-[10.5px] font-bold uppercase tracking-[.18em] text-blue">
                What is actually installed
              </div>
              <h3 className="mt-4 font-display text-[clamp(21px,2.7vw,30px)] font-semibold uppercase leading-[1.08] text-ink">
                One clamp, on the line into the property
              </h3>
              <p className="mt-4 text-[15.5px] font-light leading-[1.68] text-muted">
                A CT clamp measures the movement of electricity between your property and the grid —
                which direction it is going, and how much. Combined with what your inverter already
                reports, that is enough to tell generation, direct use, export and import apart for
                the first time.
              </p>
              <p className="mt-4 text-[15.5px] font-light leading-[1.68] text-muted">
                Nothing is replaced and nothing about how your system runs changes. The only
                difference is that somebody is finally reading it.
              </p>
            </div>
          </div>
        </Reveal>

        <div className={cn(HAIRLINE_GRID, 'grid-cols-1 min-[620px]:grid-cols-2 min-[1000px]:grid-cols-3')}>
          {TRACKED.map((item, index) => (
            <Reveal key={item.name} delay={index * 0.05} className="bg-panel px-6 py-7">
              <span className={cn('mb-5 inline-block', TONE_TEXT[item.tone])}>
                <Glyph name={item.glyph} className="h-8 w-8" />
              </span>
              <div className="mb-2 font-display text-[21px] font-semibold uppercase leading-[1.1] text-ink">
                {item.name}
              </div>
              <div className="text-[14.5px] font-light leading-[1.55] text-muted">{item.line}</div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-4 rounded-[18px] border-l-2 border-blue/50 bg-panel px-6 py-5 ring-1 ring-line-2">
          <p className="max-w-[820px] text-[15px] font-light leading-[1.65] text-muted">
            That measurement is the difference between a page that describes your system and one
            that knows it. Everything from here down is drawn from an illustrative connected
            property, so you can see the shape of what arrives.
          </p>
        </Reveal>
      </Wrap>
    </Section>
  );
}
