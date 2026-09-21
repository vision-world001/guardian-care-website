import Glyph from '../../../components/Glyph';
import {Heading, LABEL, dottedRail, ramp} from '../../../components/kit';
import Reveal from '../../../components/Reveal';
import {Section, Wrap} from '../../../components/ui';
import {JOURNEY, JOURNEY_HINGE} from '../../../data/plan';
import {cn} from '../../../lib/cn';

/**
 * The whole arc, in one object.
 *
 * A recap rather than a roadmap — it sits near the end, after a reader has
 * been through every stage it names, so it is naming what they were shown
 * rather than promising what is coming.
 *
 * The rail carries the argument the page has been making since the hero. Up to
 * stage four the line is a plain hairline, because nothing is flowing:
 * everything is estimated, and the page has labelled it so on every figure.
 * Stage five wears a ring — the moment the sequence changes kind — and from
 * there the line becomes the crawling dotted current the rest of the site
 * draws energy with, because from there the property is being read.
 *
 * Most solar journeys stop at four. That is the entire point of drawing it.
 */

const HAIRLINE = {background: 'var(--color-line-2)'};

export default function Journey() {
  return (
    <Section id="journey" hairline className="py-16 min-[760px]:py-24">
      <Wrap>
        <Heading
          eyebrow="◇ The complete energy journey"
          title="Seven stages."
          accent="Most stop at four."
          body="The line changes at stage five, where estimates become readings — and where almost every other solar journey ends."
        />

        <ol className="mx-auto max-w-[900px]">
          {JOURNEY.map((stage, index) => {
            const last = index === JOURNEY.length - 1;
            const hinge = index === JOURNEY_HINGE;
            const colour = ramp(index, JOURNEY.length);

            /* The line *above* a stage belongs to the stage before it, so the
               hinge station is the first one with current running into it. */
            const above = index > 0 && JOURNEY[index - 1].measured;

            return (
              <li key={stage.index} className="grid grid-cols-[44px_minmax(0,1fr)] gap-x-5 min-[760px]:grid-cols-[64px_minmax(0,1fr)] min-[760px]:gap-x-8">
                {/* ---------- The station ---------- */}
                <div className="relative flex justify-center">
                  {index > 0 ? (
                    <span
                      aria-hidden="true"
                      className={cn('absolute top-0 h-5 min-[760px]:h-7', above ? 'w-0.5' : 'w-px')}
                      style={above ? dottedRail(colour) : HAIRLINE}
                    />
                  ) : null}

                  {!last ? (
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute bottom-0 top-[60px] min-[760px]:top-[84px]',
                        stage.measured ? 'w-0.5' : 'w-px'
                      )}
                      style={stage.measured ? dottedRail(colour) : HAIRLINE}
                    />
                  ) : null}

                  {/* Stage five wears a ring: not one more step, the step where
                      the journey changes kind. */}
                  {hinge ? (
                    <span
                      aria-hidden="true"
                      className="absolute top-2.5 h-[52px] w-[52px] rounded-full border min-[760px]:top-3.5 min-[760px]:h-[70px] min-[760px]:w-[70px]"
                      style={{borderColor: `color-mix(in srgb, ${colour} 38%, transparent)`}}
                    />
                  ) : null}

                  <span
                    className="relative mt-5 grid h-11 w-11 place-items-center rounded-full border min-[760px]:mt-7 min-[760px]:h-14 min-[760px]:w-14"
                    style={{
                      borderColor: `color-mix(in srgb, ${colour} ${stage.measured ? 60 : 28}%, transparent)`,
                      background: hinge
                        ? `color-mix(in srgb, ${colour} 12%, var(--color-bg))`
                        : 'var(--color-bg)',
                      color: stage.measured ? colour : 'var(--color-muted)'
                    }}
                  >
                    <Glyph name={stage.glyph} className="h-5 w-5 min-[760px]:h-6 min-[760px]:w-6" />
                  </span>
                </div>

                {/* ---------- The stage ---------- */}
                <Reveal
                  delay={index * 0.04}
                  className={cn('py-5 min-[760px]:py-7', !last && 'border-b border-line-2')}
                >
                  <div className="flex items-baseline gap-3.5">
                    <span
                      className="mono text-[11px] font-semibold tracking-[.14em]"
                      style={{color: colour}}
                    >
                      {stage.index}
                    </span>
                    <h3 className="font-display text-[clamp(21px,2.6vw,29px)] font-semibold uppercase leading-none tracking-[-0.01em] text-ink">
                      {stage.name}
                    </h3>
                    {hinge ? (
                      <span className={cn(LABEL, 'ml-auto hidden shrink-0 text-green min-[760px]:block')}>
                        Readings begin
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2.5 text-[14.5px] font-light leading-[1.5] text-muted min-[760px]:text-[15.5px]">
                    {stage.line}
                  </p>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </Wrap>
    </Section>
  );
}
