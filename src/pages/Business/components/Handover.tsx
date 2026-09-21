import {Heading, LABEL, LABEL_BASE, ramp, tint} from '../../../components/kit';
import Reveal from '../../../components/Reveal';
import {Section, Wrap} from '../../../components/ui';
import {GUARDIAN_CHAIN, TODAY_CHAIN} from '../../../data/businessFlow';
import {cn} from '../../../lib/cn';

/**
 * The gap, drawn as two rails.
 *
 * Every company reading this page already runs the first rail, and already
 * knows what follows the last box on it, which is why the drawing does the
 * arguing and the copy underneath is one line. The second rail starts where
 * the first one stopped and is lit down the brand's own ramp, so the eye reads
 * it as the same line continuing rather than as a competing process.
 *
 * Not one of the seven stages is a sales stage. An installer will check for
 * that before they read anything else on this page, and finding "Retain" at
 * the end of a chain that contains no selling is a more persuasive answer than
 * a paragraph promising not to spam their customers.
 */
export default function Handover() {
  return (
    <Section id="after" hairline className="py-16 min-[760px]:py-24">
      <Wrap>
        <Heading
          eyebrow="After the handover"
          title="Your best customers"
          accent="go dark on the same day."
          body="The install completes, the relationship stops, and the next time you hear from them something has already gone wrong."
        />

        <div className="mx-auto max-w-[1000px] space-y-10">
          <Reveal>
            <Rail
              label="Today"
              tone="var(--color-faint)"
              stages={TODAY_CHAIN.map((name) => ({name, colour: 'var(--color-faint)'}))}
              trailing="Silence"
            />
          </Reveal>

          <Reveal delay={0.08}>
            <Rail
              label="With Guardian Care"
              tone="var(--color-green)"
              stages={GUARDIAN_CHAIN.map((name, index) => ({
                name,
                colour: ramp(index, GUARDIAN_CHAIN.length)
              }))}
              loops
            />
          </Reveal>
        </div>
      </Wrap>
    </Section>
  );
}

type RailStage = {name: string; colour: string};

/**
 * One sequence.
 *
 * Wraps rather than scrolls. A rail that runs off the side of a phone has
 * hidden the half of the argument that matters — and on the second rail the
 * part that matters is precisely that it keeps going.
 */
function Rail({
  label,
  tone,
  stages,
  trailing,
  loops
}: {
  label: string;
  tone: string;
  stages: RailStage[];
  /** What comes after the last stage, where nothing does. */
  trailing?: string;
  /** Whether the sequence returns to its own start. */
  loops?: boolean;
}) {
  return (
    <div>
      <div className={cn(LABEL, 'mb-4')} style={{color: tone}}>
        {label}
      </div>

      <ul className="flex flex-wrap items-center gap-y-3">
        {stages.map((stage, index) => (
          <li key={stage.name} className="flex items-center">
            {index > 0 ? (
              <span
                aria-hidden="true"
                className="h-px w-5 shrink-0 min-[620px]:w-8"
                style={{background: tint(stage.colour, 45)}}
              />
            ) : null}

            <span
              className={cn(
                LABEL_BASE,
                'inline-flex items-center gap-2.5 whitespace-nowrap rounded-pill border px-3.5 py-2 text-[10.5px] tracking-[.14em]'
              )}
              style={{
                borderColor: tint(stage.colour, 42),
                background: tint(stage.colour, 9),
                color: stage.colour
              }}
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{background: stage.colour}}
              />
              {stage.name}
            </span>
          </li>
        ))}

        {/* Where the first rail stops. Drawn rather than left off the end: an
            absence the reader has to infer is an absence they can miss. */}
        {trailing ? (
          <li className="flex items-center">
            <span
              aria-hidden="true"
              className="h-px w-5 shrink-0 min-[620px]:w-8"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, var(--color-line-2) 0 3px, transparent 3px)',
                backgroundSize: '6px 1px'
              }}
            />
            <span className={cn(LABEL_BASE, 'text-[10.5px] tracking-[.14em] text-faint/60')}>
              {trailing}
            </span>
          </li>
        ) : null}

        {loops ? (
          <li className="flex items-center">
            <span
              aria-hidden="true"
              className="h-px w-5 shrink-0 min-[620px]:w-8"
              style={{background: tint('var(--color-green)', 45)}}
            />
            <span
              className={cn(LABEL_BASE, 'text-[10.5px] tracking-[.14em] text-green')}
              title="and round again"
            >
              &#8635; Keeps going
            </span>
          </li>
        ) : null}
      </ul>
    </div>
  );
}
