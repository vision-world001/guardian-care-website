import Photo from '../../../components/Photo';
import Reveal from '../../../components/Reveal';
import {Section, SectionHead, Wrap} from '../../../components/ui';
import {TONE_TEXT} from '../../../data/command';
import {STORAGE_COMPARISON} from '../../../data/plan';
import {cn} from '../../../lib/cn';

/**
 * The same day, twice.
 *
 * One generation figure, fifteen kilowatt-hours, on both sides. Everything that
 * differs is where it ended up — and the row that matters is the last one,
 * where five kilowatt-hours of evening import become one. Setting the two
 * columns against each other with an identical top line is what makes storage
 * legible as a redistribution rather than as extra production, which is the
 * single most common misunderstanding this page has to clear.
 */
export default function Storage() {
  /* Both columns are drawn against the same ceiling, so a bar's length means
     the same thing on either side. Without that, "exported: 7" and
     "exported: 2" would render at whatever width their own column allowed. */
  const ceiling = Math.max(
    ...STORAGE_COMPARISON.flatMap((column) => column.rows.map((row) => row.value))
  );

  return (
    <Section id="storage" hairline>
      <Wrap>
        <SectionHead
          eyebrow="Do you want battery storage?"
          tone="blue"
          index="03 / 05"
          title="Same generation. Different destination."
          body="Battery storage does not make your system produce more. It changes when you are able to use what it already produces — which, for a household that is out during the day and home in the evening, is the whole question."
        />

        {/* The hour the whole argument is about. A battery is not interesting at
            midday; it is interesting here. */}
        <Reveal className="mb-4 overflow-hidden rounded-[22px] ring-1 ring-line-2">
          <div className="grid min-[900px]:grid-cols-[1fr_1.1fr]">
            {/* The photo is sized by the copy beside it, never by its own
                proportions: `h-full` on a grid item in an auto row cannot
                resolve, so the image falls back to its natural height and
                leaves half a screen of empty panel next to four lines of text.
                An absolutely positioned layer inside a floor-height box takes
                whatever height the row settles on and crops to it. */}
            <div className="relative min-h-[220px] min-[900px]:min-h-[300px]">
              <div className="absolute inset-0">
                <Photo
                  src="/assets/photos/evening.jpg"
                  alt="A house with solar panels photographed at dusk, its windows lit"
                  className="h-full w-full"
                  veil={false}
                />
              </div>
            </div>
            <div className="bg-panel p-6 min-[760px]:p-9">
              <div className="text-[10.5px] font-bold uppercase tracking-[.18em] text-purple">
                Six in the evening
              </div>
              <h3 className="mt-4 font-display text-[clamp(21px,2.7vw,30px)] font-semibold uppercase leading-[1.08] text-ink">
                The panels stopped an hour ago. The house did not.
              </h3>
              <p className="mt-4 text-[15.5px] font-light leading-[1.68] text-muted">
                This is when a household uses most of its electricity, and it is the one time of day
                a solar system has nothing to offer. Storage exists to move the afternoon’s surplus
                into this hour — which is why the question is never “how big a battery?” but “how
                much do you use after dark?”
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-4 min-[900px]:grid-cols-2">
          {STORAGE_COMPARISON.map((column, index) => (
            <Reveal
              key={column.key}
              delay={index * 0.06}
              className={cn(
                'rounded-[22px] p-6 min-[760px]:p-8',
                column.key === 'with'
                  ? 'bg-[linear-gradient(125deg,var(--color-green-glow),var(--color-blue-glow))] ring-1 ring-line'
                  : 'bg-panel ring-1 ring-line-2'
              )}
            >
              <div className={cn('text-[10.5px] font-bold uppercase tracking-[.18em]', TONE_TEXT[column.tone])}>
                {column.name}
              </div>

              <dl className="mt-7 space-y-5">
                {column.rows.map((row) => {
                  const last = row.label === 'Later grid import';

                  return (
                    <div key={row.label}>
                      <div className="mb-2 flex items-baseline justify-between gap-4">
                        <dt
                          className={cn(
                            'text-[14px] leading-[1.3]',
                            last ? 'font-medium text-ink' : 'font-light text-muted'
                          )}
                        >
                          {row.label}
                        </dt>
                        <dd
                          className={cn(
                            'mono text-[15px] font-semibold',
                            last ? TONE_TEXT[column.tone] : 'text-ink'
                          )}
                        >
                          {row.value} kWh
                        </dd>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-line-2">
                        <div
                          className={cn(
                            'h-full rounded-full',
                            last
                              ? column.key === 'with'
                                ? 'bg-green'
                                : 'bg-amber'
                              : 'bg-ink/25'
                          )}
                          style={{width: `${(row.value / ceiling) * 100}%`}}
                        />
                      </div>
                    </div>
                  );
                })}
              </dl>

              <p className="mt-7 border-t border-line-2 pt-5 text-[14px] font-light leading-[1.6] text-muted">
                {column.line}
              </p>
            </Reveal>
          ))}
        </div>
      </Wrap>
    </Section>
  );
}
