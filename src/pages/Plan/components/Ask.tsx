import {useState} from 'react';
import Glyph from '../../../components/Glyph';
import Photo from '../../../components/Photo';
import Reveal from '../../../components/Reveal';
import {Section, SectionHead, Wrap} from '../../../components/ui';
import {QUESTIONS} from '../../../data/plan';
import {cn} from '../../../lib/cn';

/**
 * The questions people actually have.
 *
 * Every one of these is a thing somebody asks an installer at the kitchen table
 * and rarely gets a straight answer to. Answering them on the page, before any
 * contact details are requested, is the whole posture of this journey — and an
 * accordion rather than a wall of prose because a reader has one or two of
 * these questions, not seven.
 *
 * One panel open at a time: this is a list somebody scans for their own
 * question, and seven open answers is the wall of prose again.
 */
export default function Ask() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="ask" hairline>
      <Wrap>
        <SectionHead
          eyebrow="Ask Guardian Care"
          tone="blue"
          title="What would you like to understand?"
          body="No form, no callback, no contact details. These are the questions that decide whether solar is right for a property, answered in the order people actually ask them."
        />

        <Reveal className="mb-4 overflow-hidden rounded-[22px] ring-1 ring-line-2">
          <div className="grid min-[900px]:grid-cols-[1fr_1.25fr]">
            {/* Sized by the copy beside it — see the note in the storage band. */}
            <div className="relative min-h-[200px] min-[900px]:min-h-[250px]">
              <div className="absolute inset-0">
                <Photo
                  src="/assets/photos/asking.jpg"
                  alt="Somebody reading their phone by a window"
                  className="h-full w-full"
                  veil={false}
                />
              </div>
            </div>
            <div className="flex flex-col justify-center bg-panel p-6 min-[760px]:p-9">
              <p className="max-w-[540px] text-[16px] font-light leading-[1.68] text-muted min-[760px]:text-[17px]">
                Most of these get asked at a kitchen table, after a quotation has already been
                written. Answering them before anybody has taken your details is the whole posture
                of this journey — you should be able to decide solar is not right for your property
                without ever speaking to us.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="overflow-hidden rounded-[22px] ring-1 ring-line-2">
          {QUESTIONS.map((item, index) => {
            const expanded = open === index;

            return (
              <Reveal
                key={item.q}
                delay={Math.min(index, 4) * 0.04}
                className="border-b border-line-2 bg-panel last:border-b-0"
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    onClick={() => setOpen(expanded ? null : index)}
                    className="flex w-full items-center gap-4 px-5 py-5 text-left transition-colors duration-200 hover:bg-bg-2/60 min-[760px]:px-8"
                  >
                    <span className={cn('shrink-0 transition-colors', expanded ? 'text-blue' : 'text-faint')}>
                      <Glyph name="question" className="h-6 w-6" />
                    </span>

                    <span
                      className={cn(
                        'flex-1 text-[16px] leading-[1.35] min-[760px]:text-[17px]',
                        expanded ? 'font-medium text-ink' : 'font-light text-ink/85'
                      )}
                    >
                      {item.q}
                    </span>

                    <span
                      aria-hidden="true"
                      className={cn(
                        'shrink-0 text-faint transition-transform duration-250 ease-brand',
                        expanded && 'rotate-45'
                      )}
                    >
                      <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                        <path d="M8 2.5v11M2.5 8h11" />
                      </svg>
                    </span>
                  </button>
                </h3>

                {/* Unmounted rather than hidden: a collapsed answer that still
                    takes a tab stop is worse than no answer at all. */}
                {expanded ? (
                  <div className="px-5 pb-6 pl-[60px] min-[760px]:px-8 min-[760px]:pl-[72px]">
                    <p className="max-w-[720px] text-[15px] font-light leading-[1.68] text-muted">
                      {item.a}
                    </p>
                  </div>
                ) : null}
              </Reveal>
            );
          })}
        </div>
      </Wrap>
    </Section>
  );
}
