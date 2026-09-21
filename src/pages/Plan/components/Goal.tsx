import Glyph from '../../../components/Glyph';
import {Heading, LABEL, Tile} from '../../../components/kit';
import Reveal from '../../../components/Reveal';
import {Section, Wrap} from '../../../components/ui';
import {TONE_TEXT, TONE_VAR} from '../../../data/command';
import {GOALS, GOAL_BY_KEY} from '../../../data/plan';
import {cn} from '../../../lib/cn';

/**
 * What are you here for?
 *
 * The one section on the page that asks before it tells, and it is placed
 * second on purpose: the reader has just been shown their own starting
 * position, and the natural next thought is *and what do I want to do about
 * it*. Answering it costs one click and immediately produces a sentence about
 * their situation rather than about solar in general.
 *
 * The choice is not decoration. It is written straight into the assessment's
 * answers, so question three further down arrives already answered and the
 * page behaves like one conversation instead of two forms that happen to sit
 * on the same route. A visitor who changes their mind down there changes it
 * up here too — there is one answer, held in one place.
 *
 * The seventh option sits on its own row because it is a different kind of
 * answer. Six are destinations; "I'm not sure" is a request for a map, and
 * burying it as the last cell of a grid makes it look like the one nobody
 * picks. It is, in fact, the most honest thing most people could click.
 */
export default function Goal({
  goal,
  onPick
}: {
  goal: string | null;
  onPick: (key: string) => void;
}) {
  const picked = goal ? GOAL_BY_KEY[goal] : null;
  const six = GOALS.slice(0, 6);
  const unsure = GOALS[GOALS.length - 1];

  return (
    <Section id="goal" hairline className="py-16 min-[760px]:py-24">
      <Wrap>
        <Heading
          eyebrow="◇ Start with where you want to get to"
          title="What would you"
          accent="like to achieve?"
          body="The same property is assessed differently depending on the answer."
        />

        <div className="mx-auto max-w-[1000px]">
          <ul className="grid gap-2.5 min-[620px]:grid-cols-2 min-[980px]:grid-cols-3">
            {six.map((option, index) => (
              <Reveal key={option.key} as="li" delay={index * 0.04}>
                <Choice
                  option={option}
                  picked={goal === option.key}
                  onPick={() => onPick(option.key)}
                />
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.26} className="mt-2.5">
            <Choice
              option={unsure}
              picked={goal === unsure.key}
              onPick={() => onPick(unsure.key)}
              wide
            />
          </Reveal>

          {/* ---------- What the platform says back ----------

              Nothing is drawn until something is picked. An empty answer panel
              is a large box explaining that it has nothing to say, and a reader
              who has not clicked yet has no use for it; the slim prompt does
              the same job in one line. The panel arriving on click is also the
              clearest possible confirmation that the click registered. */}
          {picked ? (
            <>
              <Reveal
                key={picked.key}
                animation="animate-card-in"
                className="mt-4 rounded-frame p-px"
                style={{
                  background: `linear-gradient(120deg, ${TONE_VAR[picked.tone]}, color-mix(in srgb, ${TONE_VAR[picked.tone]} 20%, transparent))`
                }}
              >
                <div className="flex flex-col gap-5 rounded-[5px] bg-[linear-gradient(180deg,#15181c,#0f1114)] px-6 py-7 min-[760px]:flex-row min-[760px]:items-center min-[760px]:gap-8 min-[760px]:px-9">
                  <Tile colour={TONE_VAR[picked.tone]} size="lg">
                    <Glyph name={picked.glyph} bold className="h-7 w-7" />
                  </Tile>

                  <div className="min-w-0">
                    <div
                      className={cn(
                        'font-display text-[clamp(24px,3.4vw,38px)] font-semibold uppercase leading-[0.98] tracking-[-0.01em]',
                        TONE_TEXT[picked.tone]
                      )}
                    >
                      {picked.short}
                    </div>
                    <p className="mt-3 max-w-[620px] text-[15.5px] font-light leading-[1.6] text-ink/85">
                      {picked.answer}
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal
                delay={0.08}
                className="mono mt-5 flex flex-wrap items-center justify-center gap-2.5 text-[10.5px] uppercase tracking-[.16em] text-faint"
              >
                <span aria-hidden="true" className={TONE_TEXT[picked.tone]}>
                  ◇
                </span>
                Carried into your assessment
                <a
                  href="#assess"
                  className="underline decoration-dotted underline-offset-4 transition-colors hover:text-ink"
                >
                  Continue →
                </a>
              </Reveal>
            </>
          ) : (
            <p className="mono mt-7 text-center text-[10.5px] uppercase leading-[1.6] tracking-[.16em] text-faint">
              <span aria-hidden="true" className="text-amber">
                ◇
              </span>{' '}
              Pick one — it is carried into your assessment below
            </p>
          )}
        </div>
      </Wrap>
    </Section>
  );
}

/* ---------- One option ---------- */

function Choice({
  option,
  picked,
  onPick,
  wide
}: {
  option: (typeof GOALS)[number];
  picked: boolean;
  onPick: () => void;
  wide?: boolean;
}) {
  const colour = TONE_VAR[option.tone];

  return (
    <button
      type="button"
      aria-pressed={picked}
      onClick={onPick}
      className={cn(
        'group flex w-full items-center gap-4 rounded-card px-5 py-4 text-left transition duration-250 ease-brand',
        wide ? 'min-[620px]:py-5' : 'h-full',
        picked
          ? 'bg-panel-2'
          : 'bg-panel/55 ring-1 ring-line-2 hover:-translate-y-0.5 hover:bg-panel-2/70 hover:ring-ink/20'
      )}
      style={
        picked
          ? {
              boxShadow: `inset 0 0 0 2px ${colour}, 0 14px 34px -18px color-mix(in srgb, ${colour} 80%, transparent)`
            }
          : undefined
      }
    >
      {/* Unselected, the chip still carries a trace of its own colour. Seven
          identical grey squares read as one undifferentiated list; seven quiet
          tints read as seven different things, and picking one simply turns
          the volume up on the one already there. */}
      <span
        className={cn(
          'grid h-10 w-10 shrink-0 place-items-center rounded-tile transition-colors duration-250',
          picked && 'text-bg'
        )}
        style={
          picked
            ? {background: colour}
            : {
                background: `color-mix(in srgb, ${colour} 11%, transparent)`,
                border: `1px solid color-mix(in srgb, ${colour} 26%, transparent)`,
                color: `color-mix(in srgb, ${colour} 72%, var(--color-faint))`
              }
        }
      >
        <Glyph name={option.glyph} bold={picked} className="h-5 w-5" />
      </span>

      <span
        className={cn(
          'min-w-0 text-[15px] leading-[1.35] transition-colors duration-250',
          picked ? 'font-medium text-ink' : 'font-light text-ink/80'
        )}
      >
        {option.label}
      </span>

      {picked ? (
        <span className={cn(LABEL, 'ml-auto hidden shrink-0 min-[520px]:block', TONE_TEXT[option.tone])}>
          ✓
        </span>
      ) : null}
    </button>
  );
}
