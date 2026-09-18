import {Fragment} from 'react';
import Glyph from '../../../components/Glyph';
import Reveal from '../../../components/Reveal';
import {Section, Wrap} from '../../../components/ui';
import {TONE_TEXT, TONE_VAR} from '../../../data/command';
/* The "back to the start" block at the foot of this file is commented out, so
   `LIFECYCLE_LOOP` is not imported. Restoring that block needs it added back to
   this list — lint fails on the unused import otherwise. */
import {CONVENTIONAL_END, LIFECYCLE, PHASES, type Phase} from '../../../data/platform';
import {cn} from '../../../lib/cn';

/**
 * The lifecycle, as a pipeline.
 *
 * Eight stages laid on one rail — but grouped into three phases, because the
 * grouping is the argument and eight equal boxes would throw it away. Three
 * stages establish what is there. One stage, Connect, is the hinge: before it
 * the platform is estimating and after it the platform is reading. Four stages
 * run afterwards, for as long as the system does.
 *
 * Two things carry the meaning visually rather than in prose:
 *
 *   The rail changes character at Connect. Before it, a plain hairline —
 *   nothing is flowing yet, because nothing is measuring. After it, the same
 *   dotted crawl the hero is drawn with, because from that point the system is
 *   live and the platform is reading it continuously.
 *
 *   The conventional end is marked. A normal installation stops around stage
 *   three, and saying so on the diagram is more convincing than any sentence
 *   about aftercare, because the reader can see how much of the rail is left.
 *
 * No container. The rail sits on the page's own ground — a bordered panel round
 * a process diagram turns a sequence into an object, and this is the one
 * section whose whole point is that it does not stop.
 */

const PHASE_BY_KEY = Object.fromEntries(PHASES.map((p) => [p.key, p])) as Record<
  Phase['key'],
  Phase
>;

/** Columns each phase occupies, for the band above the rail. */
const SPANS: Record<Phase['key'], number> = {
  establish: LIFECYCLE.filter((s) => s.phase === 'establish').length,
  connect: LIFECYCLE.filter((s) => s.phase === 'connect').length,
  operate: LIFECYCLE.filter((s) => s.phase === 'operate').length
};

export default function Pipeline() {
  return (
    <Section id="flow" hairline className="py-16 min-[760px]:py-24">
      <Wrap>
        <Reveal className="mx-auto mb-16 max-w-[740px] text-center">
          <h2 className="font-display text-[clamp(30px,4.6vw,54px)] font-semibold uppercase leading-[0.98] tracking-[-0.015em] text-ink">
            Energy doesn’t stand still.
            <br />
            <span className="text-brand-gradient">Neither should your data.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[540px] text-[16.5px] font-light leading-[1.65] text-muted">
            Guardian Care connects every part of the system into one continuously updated picture —
            measured at the point electricity actually moves, not inferred from a monthly bill.
          </p>
        </Reveal>

        {/* ---------- Wide: one rail, eight columns ---------- */}
        <div className="hidden min-[1180px]:block">
          {/* The three phases, above the rail they govern. */}
          <div className="grid grid-cols-8 gap-3">
            {PHASES.map((phase) => (
              <div
                key={phase.key}
                className="border-t pt-3"
                style={{
                  gridColumn: `span ${SPANS[phase.key]} / span ${SPANS[phase.key]}`,
                  borderColor: `color-mix(in srgb, ${TONE_VAR[phase.tone]} 34%, transparent)`
                }}
              >
                <div
                  className={cn(
                    'mono text-[10.5px] font-semibold uppercase tracking-[.2em]',
                    TONE_TEXT[phase.tone]
                  )}
                >
                  {phase.name}
                </div>
                <div className="mt-1.5 text-[12.5px] font-light leading-[1.4] text-faint">
                  {phase.line}
                </div>
              </div>
            ))}
          </div>

          {/* The rail. Segments live in the same eight-column grid as the
              stages, each extended by half a gap so they meet across it —
              positioning them at fractions of the container would put every
              marker a few pixels off the stage beneath it. */}
          <div className="mt-8 grid grid-cols-8 gap-3">
            {LIFECYCLE.map((stage, index) => {
              const live = index >= CONVENTIONAL_END;
              const hinge = stage.phase === 'connect';
              const tone = PHASE_BY_KEY[stage.phase].tone;

              return (
                <div key={stage.index} className="relative flex h-[76px] items-center justify-center">
                  {/* Before Connect the rail is a plain hairline: the stages
                      are joined, but nothing is flowing along them because
                      nothing is measuring yet. From Connect onward it becomes
                      the same crawling dotted line the hero is drawn with. */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute top-1/2 -translate-y-1/2',
                      live ? 'h-0.5' : 'h-px',
                      index === 0 && 'left-1/2 -right-1.5',
                      index > 0 && index < LIFECYCLE.length - 1 && '-left-1.5 -right-1.5',
                      index === LIFECYCLE.length - 1 && '-left-1.5 right-1/2'
                    )}
                    style={
                      live
                        ? {
                            backgroundImage: `linear-gradient(90deg, ${TONE_VAR[tone]} 0 2px, transparent 2px)`,
                            backgroundSize: '10px 2px',
                            backgroundRepeat: 'repeat-x',
                            animation: 'rail-crawl 2.6s linear infinite'
                          }
                        : {background: 'rgba(255,255,255,0.16)'}
                    }
                  />

                  {/* The hinge wears a ring. Connect is not one more step in a
                      sequence — it is the moment the sequence changes kind, and
                      a second circle says that without a second colour. */}
                  {hinge ? (
                    <span
                      aria-hidden="true"
                      className="absolute h-[70px] w-[70px] rounded-full border"
                      style={{
                        borderColor: `color-mix(in srgb, ${TONE_VAR[tone]} 34%, transparent)`
                      }}
                    />
                  ) : null}

                  {/* The symbol *is* the station.
                      ------------------------------------------------------
                      It used to be a 10px dot on the rail with a 24px glyph
                      floating underneath — two marks doing one job, and the
                      glyph too small to be read as anything. One 56px disc
                      sitting on the line reads as a station on a route, which
                      is what a pipeline stage is. The solid fill is what lets
                      the rail run behind it rather than into it. */}
                  <span
                    className={cn(
                      'relative grid h-14 w-14 place-items-center rounded-full border',
                      live ? TONE_TEXT[tone] : 'text-muted'
                    )}
                    style={{
                      borderColor: live
                        ? `color-mix(in srgb, ${TONE_VAR[tone]} 55%, transparent)`
                        : 'rgba(255,255,255,0.18)',
                      background: hinge
                        ? `color-mix(in srgb, ${TONE_VAR[tone]} 12%, var(--color-bg))`
                        : 'var(--color-bg)'
                    }}
                  >
                    <Glyph name={stage.glyph} className="h-7 w-7" />
                  </span>
                </div>
              );
            })}
          </div>

          {/* The words. The symbol has moved up onto the rail, so this block
              carries nothing but the naming. */}
          <div className="grid grid-cols-8 gap-3">
            {LIFECYCLE.map((stage) => (
              <Reveal
                key={stage.index}
                delay={Number(stage.index) * 0.05}
                className="pt-5 text-center"
              >
                <div className="mono text-[10px] text-faint">{stage.index}</div>
                <div className="mt-1.5 font-display text-[19px] font-semibold uppercase leading-none text-ink">
                  {stage.name}
                </div>
                <div className="mt-2.5 text-[12px] font-light leading-[1.45] text-muted">
                  {stage.line}
                </div>
              </Reveal>
            ))}
          </div>

          {/* Where the industry stops. Drawn under the first three columns, so
              the length of what remains is the point. */}
          <div className="mt-10 grid grid-cols-8 gap-3">
            <div
              className="col-span-3 border-t pt-3"
              style={{borderColor: 'var(--color-line-2)'}}
            >
              <span className="mono text-[10.5px] uppercase tracking-[.14em] text-faint">
                A conventional installation ends about here
              </span>
            </div>
            <div
              className="col-span-5 border-t pt-3"
              style={{borderColor: `color-mix(in srgb, ${TONE_VAR.blue} 34%, transparent)`}}
            >
              <span className="mono text-[10.5px] uppercase tracking-[.14em] text-blue">
                Guardian Care runs all of this
              </span>
            </div>
          </div>
        </div>

        {/* ---------- Narrow: the same rail, stood on end ---------- */}
        <div className="min-[1180px]:hidden">
          {LIFECYCLE.map((stage, index) => {
            const phase = PHASE_BY_KEY[stage.phase];
            const opensPhase = index === 0 || LIFECYCLE[index - 1].phase !== stage.phase;
            const live = index >= CONVENTIONAL_END;
            const hinge = stage.phase === 'connect';

            return (
              <Fragment key={stage.index}>
                {opensPhase ? (
                  <div
                    className="mb-5 border-t pt-3"
                    style={{
                      marginTop: index === 0 ? 0 : 34,
                      borderColor: `color-mix(in srgb, ${TONE_VAR[phase.tone]} 34%, transparent)`
                    }}
                  >
                    <div
                      className={cn(
                        'mono text-[10.5px] font-semibold uppercase tracking-[.2em]',
                        TONE_TEXT[phase.tone]
                      )}
                    >
                      {phase.name}
                    </div>
                    <div className="mt-1.5 text-[12.5px] font-light text-faint">{phase.line}</div>
                  </div>
                ) : null}

                <Reveal delay={0.04} className="flex gap-5">
                  {/* The spine, running through the markers. */}
                  <div className="relative flex w-3.5 shrink-0 justify-center">
                    <span
                      aria-hidden="true"
                      className={cn('absolute inset-y-0', live ? 'w-0.5' : 'w-px')}
                      style={
                        live
                          ? {
                              backgroundImage: `linear-gradient(180deg, ${TONE_VAR[phase.tone]} 0 2px, transparent 2px)`,
                              backgroundSize: '2px 10px',
                              backgroundRepeat: 'repeat-y',
                              animation: 'rail-crawl-y 2.6s linear infinite'
                            }
                          : {background: 'rgba(255,255,255,0.16)'}
                      }
                    />
                    <span
                      aria-hidden="true"
                      className={cn(
                        'relative mt-1.5 border',
                        hinge ? 'h-3 w-3 rotate-45' : 'h-2.5 w-2.5 rounded-full'
                      )}
                      style={{
                        borderColor: TONE_VAR[phase.tone],
                        background: live ? TONE_VAR[phase.tone] : 'var(--color-bg)'
                      }}
                    />
                  </div>

                  <div className="min-w-0 flex-1 pb-7">
                    <div className="flex items-baseline gap-3">
                      <span className="mono text-[10px] text-faint">{stage.index}</span>
                      <span className="font-display text-[20px] font-semibold uppercase leading-none text-ink">
                        {stage.name}
                      </span>
                      <span className={cn('ml-auto shrink-0', TONE_TEXT[phase.tone])}>
                        <Glyph name={stage.glyph} className="h-5 w-5" />
                      </span>
                    </div>
                    <div className="mt-2 text-[13.5px] font-light leading-[1.5] text-muted">
                      {stage.line}
                    </div>
                  </div>
                </Reveal>
              </Fragment>
            );
          })}
        </div>

        {/* ---------- And back to the start ---------- */}
        {/* <Reveal className="mt-12 flex flex-col gap-4 border-t border-line-2 pt-7 min-[900px]:flex-row min-[900px]:items-center min-[900px]:gap-7">
          <span className="flex shrink-0 items-center gap-3 text-green">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 12a8 8 0 1 1-2.8-6.1" />
              <path d="M20 3v5h-5" />
            </svg>
            <span className="mono whitespace-nowrap text-[10.5px] font-semibold uppercase tracking-[.18em]">
              08 → 01
            </span>
          </span>

          <p className="max-w-[760px] text-[14.5px] font-light leading-[1.6] text-muted">
            {LIFECYCLE_LOOP}
          </p>
        </Reveal> */}
      </Wrap>
    </Section>
  );
}
