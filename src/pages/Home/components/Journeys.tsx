/* Note: the mark-and-number block below is commented out, so `Glyph` is not
   imported. Restoring that block needs `import Glyph from '../../../components/Glyph';`
   back at the top — lint fails on the unused import otherwise. */
import {Link} from 'react-router';
import Reveal from '../../../components/Reveal';
import {Section, Wrap} from '../../../components/ui';
import {TONE_TEXT, TONE_VAR} from '../../../data/command';
import {JOURNEYS} from '../../../data/platform';
import {cn} from '../../../lib/cn';

/**
 * One platform, three journeys.
 *
 * Routed by who the reader is rather than by which product they end up using,
 * so the eyebrow is the question — *Already have solar?* — and the headline is
 * what they get for answering it. A visitor arrives knowing their own
 * situation, not knowing our product names, and a card that leads with the
 * product name asks them to translate before they can choose.
 *
 * Equal weight, all three. An earlier version drew the middle card larger
 * because it was the operational brain between two ends of a lifecycle; these
 * are three audiences, and there is no argument for telling one of them they
 * matter less.
 *
 * The symbol sits in its own tile at 40px rather than loose at 32px. These are
 * the only three decisions on the page and the marks carry most of the
 * recognition, so they are given the room to be read.
 */
export default function Journeys() {
  return (
    <Section id="journeys" hairline className="py-16 min-[760px]:py-24">
      <Wrap>
        <Reveal className="mx-auto mb-14 max-w-[640px] text-center">
          <h2 className="font-display text-[clamp(32px,5vw,58px)] font-semibold uppercase leading-[0.96] tracking-[-0.015em] text-ink">
            One platform.
            <br />
            Three journeys.
          </h2>
          <p className="mt-5 text-[16.5px] font-light leading-[1.6] text-muted">
            Choose where you are in the energy lifecycle.
          </p>
        </Reveal>

        <div className="grid gap-4 min-[1000px]:grid-cols-3 min-[1000px]:items-stretch">
          {JOURNEYS.map((journey, index) => (
            /* The three arrive in sequence rather than together. The stagger is
               0.14s rather than the 0.07s used between paragraphs — at a card's
               size the shorter gap is not read as an order, it is read as three
               things failing to appear at the same moment. */
            <Reveal
              key={journey.key}
              animation="animate-card-in"
              delay={index * 0.14}
              className="flex"
            >
              <Link
                to={journey.to}
                className="group glass shadow-lift relative flex w-full flex-col overflow-hidden rounded-frame border border-line-2 p-7 transition duration-250 ease-brand hover:-translate-y-1 hover:border-line hover:shadow-lift-hover min-[760px]:p-9"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-40 transition-opacity duration-250 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${TONE_VAR[journey.tone]}, transparent)`
                  }}
                />

                {/* ---- Mark and number ---- */}
                {/* <div className="flex items-center justify-between gap-4">
                  <span
                    className={cn(
                      'grid h-16 w-16 place-items-center rounded-card border bg-bg/50',
                      TONE_TEXT[journey.tone]
                    )}
                    style={{
                      borderColor: `color-mix(in srgb, ${TONE_VAR[journey.tone]} 38%, transparent)`
                    }}
                  >
                    <Glyph name={journey.glyph} className="h-10 w-10" />
                  </span>
                  <span className="mono text-[11px] font-semibold tracking-[.16em] text-faint">
                    ◇ {journey.index}
                  </span>
                </div> */}

                {/* ---- Who this is for ----

                    Two lines are reserved whether or not this one needs them.
                    Only the middle question wraps, and without a floor its
                    headline starts a line lower than the two beside it — which
                    reads as a mistake rather than as a longer question. */}
                <div
                  className={cn(
                    'mono text-[11px] font-semibold uppercase leading-[1.5] tracking-[.18em] min-[1000px]:min-h-[33px]',
                    TONE_TEXT[journey.tone]
                  )}
                >
                  {journey.eyebrow}
                </div>

                {/* ---- And what they get ---- */}
                <h3 className="mt-3.5 font-display text-[clamp(25px,2.9vw,31px)] font-semibold uppercase leading-[1.04] tracking-[-0.01em] text-ink">
                  {journey.headline}
                </h3>

                {journey.paras.map((para) => (
                  <p key={para} className="mt-4 text-[14.5px] font-light leading-[1.62] text-muted">
                    {para}
                  </p>
                ))}

                {/* ---- What that actually means ----

                    `flex-1` sits on this block rather than on the paragraph, so
                    the three cards' actions line up along the bottom however
                    much copy each one carries. */}
                {/* <div className="flex-1">
                  {journey.list ? (
                    <div className="mt-7 border-t border-line-2 pt-6">
                      <div className="mono text-[10px] font-semibold uppercase tracking-[.18em] text-faint">
                        {journey.list.label}
                      </div>
                      <ul className="mt-4 space-y-2.5">
                        {journey.list.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-[13.5px] font-light leading-[1.45] text-ink/80"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-[7px] h-1 w-1 shrink-0 rounded-full"
                              style={{background: TONE_VAR[journey.tone]}}
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {journey.close ? (
                    <p className="mt-5 text-[14px] font-light leading-[1.55] text-muted">
                      {journey.close}
                    </p>
                  ) : null}
                </div> */}

                {/* ---- The action ----

                    `mt-auto` on the wrapper is what holds the three buttons on
                    one line along the foot of the cards. The cards are stretched
                    to a common height by the grid, so without it each button
                    simply follows its own paragraph and the three land at three
                    different heights — which is what the `flex-1` on the
                    now-commented list block used to prevent.

                    The gap lives on the wrapper as padding rather than on the
                    button as margin, so `mt-auto` has nothing to collapse
                    against and the button keeps its own height. */}
                <div className="mt-auto pt-8">
                  <span
                    className="relative inline-flex items-center gap-2.5 overflow-hidden rounded-pill border px-6 py-3.5 text-left text-[12px] font-bold uppercase leading-[1.3] tracking-[.08em] text-ink transition-colors duration-250 ease-brand group-hover:text-bg"
                    style={{
                      borderColor: `color-mix(in srgb, ${TONE_VAR[journey.tone]} 40%, transparent)`
                    }}
                  >
                    {/* The fill arrives on hover rather than sitting there, so
                        three full-strength buttons do not compete for the one
                        decision the section is asking for. Positioned rather
                        than given a negative z-index: `-z-10` inside the card
                        would put it behind the card's own background instead of
                        behind the label. */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 opacity-0 transition-opacity duration-250 group-hover:opacity-100"
                      style={{background: TONE_VAR[journey.tone]}}
                    />
                    <span className="relative">{journey.cta} →</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Wrap>
    </Section>
  );
}
