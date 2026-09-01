import {useState} from 'react';
import Reveal from '../../../components/Reveal';
import {Section, SectionHead, Wrap} from '../../../components/ui';
import Photo from './Photo';
import {CONSUMER_QUESTIONS} from '../../../data/questions';
import {cn} from '../../../lib/cn';

/**
 * The questions people actually ask, answered from their own readings.
 *
 * Two halves. On the left, the moment the section is about: somebody at home,
 * by a window, reading something on their phone. That is the whole product from
 * the customer's side, and it belongs beside the questions rather than being
 * described by them. On the right, the questions themselves — a plain list,
 * each opening its own answer underneath it.
 *
 * Nothing is open to start with. The questions are the thing worth scanning,
 * and a reader recognising their own question in a list is what makes them open
 * it; an answer sitting there already only pushes the rest of the list down the
 * page for a question nobody asked.
 *
 * The citation line under each answer is the part that earns its place. Any
 * site can write a paragraph about solar; naming the figures the paragraph was
 * built from is the whole difference, and claiming it instead would be worth
 * nothing.
 */
export default function AskGuardian() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Section id="c-ask">
      <Wrap>
        <Reveal>
          <SectionHead
            eyebrow="Ask Guardian"
            tone="blue"
            title={
              <>
                The questions people
                <br />
                <span className="text-brand-gradient">actually ask.</span>
              </>
            }
            body="Answered from your system&rsquo;s readings, not a general article about solar."
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-8 min-[900px]:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] min-[900px]:gap-14">
          {/* The image tracks the reader down the list rather than scrolling
              away from it, since the list grows every time an answer opens. */}
          <Reveal>
            {/* Sticky has to sit on a child of the grid item: the item itself
                stretches to the row, which is the travel the image needs. */}
            <div className="min-[900px]:sticky min-[900px]:top-24">
              <Photo
                src="https://res.cloudinary.com/maefwdv4/image/upload/f_auto,q_auto/asking"
                alt="Somebody at home, checking their solar on their phone by a window."
                veil={false}
                className="aspect-[4/5] rounded-frame min-[900px]:aspect-[3/4]"
                imgClassName="object-[62%_center]"
              />
            </div>
          </Reveal>

          <Reveal className="border-t border-line-2">
            {CONSUMER_QUESTIONS.map((entry, index) => {
              const expanded = index === open;

              return (
                <div key={entry.question} className="border-b border-line-2">
                  <button
                    type="button"
                    onClick={() => setOpen(expanded ? null : index)}
                    aria-expanded={expanded}
                    aria-controls={`answer-${index}`}
                    className="group flex w-full cursor-pointer items-center gap-6 py-[22px] text-left"
                  >
                    <span
                      className={cn(
                        'flex-1 text-[clamp(16.5px,1.5vw,19px)] leading-[1.35] transition-colors duration-200',
                        expanded ? 'text-ink' : 'text-muted group-hover:text-ink'
                      )}
                    >
                      {entry.question}
                    </span>

                    {/* A plus that loses its upright to become a minus. Cheaper
                        to read than a chevron, and it says "close" as clearly
                        as it said "open". */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'relative h-3.5 w-3.5 shrink-0 transition-colors duration-200',
                        expanded ? 'text-blue' : 'text-faint group-hover:text-ink'
                      )}
                    >
                      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
                      <span
                        className={cn(
                          'absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current transition-transform duration-300 ease-brand',
                          expanded ? 'scale-y-0' : 'scale-y-100'
                        )}
                      />
                    </span>
                  </button>

                  {/* 0fr → 1fr animates to the content's own height without
                      anyone having to measure it. */}
                  <div
                    id={`answer-${index}`}
                    aria-hidden={!expanded}
                    className={cn(
                      'grid transition-[grid-template-rows,opacity] duration-300 ease-brand',
                      expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="max-w-[58ch] pb-7 pr-6">
                        <p className="text-[16px] font-light leading-[1.75] text-muted [&_b]:font-medium [&_b]:text-ink">
                          {entry.answer}
                        </p>

                        {/* <p className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[12.5px] text-faint">
                          <span>From your readings</span>
                          {entry.basis.map((source) => (
                            <span
                              key={source}
                              className="mono before:mr-2.5 before:content-['·']"
                            >
                              {source}
                            </span>
                          ))}
                        </p> */}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Reveal>
        </div>
      </Wrap>
    </Section>
  );
}
