import Glyph from '../../../components/Glyph';
import {Heading, LABEL_BASE, tint} from '../../../components/kit';
import Reveal from '../../../components/Reveal';
import {Section, Wrap} from '../../../components/ui';
import {TONE_TEXT, TONE_VAR} from '../../../data/command';
import {FINDINGS, PROMISE} from '../../../data/guardian';
import {cn} from '../../../lib/cn';

/**
 * Evidence, then the fix. Never the fix on its own.
 *
 * Six real findings from the engineer's requirements screen, each printed as
 * the reading that produced it followed by what it leads to. That pairing is
 * the entire product, and it is the only defence against the thing a
 * homeowner is braced for — somebody arriving at the door to sell them a
 * battery.
 *
 * "Install surge protection" is a sales line. "No surge protection found →
 * protection review" is a finding that happens to have a fix, and a reader can
 * tell the difference instantly. So the left column is always a measurement
 * and the right is always its consequence; the arrow between them does the
 * arguing.
 *
 * The promise underneath is quoted from the app, where it sits next to the
 * recommendations themselves. That is the only place such a sentence is worth
 * anything, and it is why it can be repeated here.
 */
export default function Findings() {
  return (
    <Section id="findings" hairline className="py-16 min-[760px]:py-24">
      <Wrap>
        <Heading
          eyebrow="What your engineer finds"
          title="Every fix starts"
          accent="as a reading."
          body="Nothing is recommended because it is for sale. It is recommended because something was measured."
        />

        <ul className="mx-auto max-w-[920px] overflow-hidden rounded-frame ring-1 ring-line-2">
          {FINDINGS.map((finding, index) => (
            <Reveal
              key={finding.key}
              as="li"
              delay={index * 0.05}
              className="grid items-center gap-x-4 gap-y-3 border-b border-line-2 bg-panel/40 px-5 py-4 last:border-b-0 min-[760px]:grid-cols-[132px_1fr_auto] min-[760px]:px-6 min-[760px]:py-5"
            >
              {/* ---------- How urgent ---------- */}
              <span
                className={cn(
                  LABEL_BASE,
                  'inline-flex w-fit rounded-pill px-2.5 py-1 text-[9.5px] tracking-[.14em]'
                )}
                style={{
                  color: TONE_VAR[finding.tone],
                  background: tint(TONE_VAR[finding.tone], 12)
                }}
              >
                {finding.priority}
              </span>

              {/* ---------- What was measured ---------- */}
              <span className="flex items-center gap-3">
                <span className={cn('shrink-0', TONE_TEXT[finding.tone])}>
                  <Glyph name={finding.glyph} className="h-5 w-5" />
                </span>
                <span className="text-[15.5px] font-light leading-[1.4] text-ink">
                  {finding.evidence}
                </span>
              </span>

              {/* ---------- And what it leads to ---------- */}
              <span className="flex items-center gap-2.5 min-[760px]:justify-end">
                <span aria-hidden="true" className="mono text-[13px] text-faint">
                  &#8594;
                </span>
                <span className="mono text-[12.5px] font-semibold uppercase tracking-[.1em] text-muted">
                  {finding.solution}
                </span>
              </span>
            </Reveal>
          ))}
        </ul>

        {/* ---------- The promise ---------- */}
        <Reveal delay={0.2} className="mx-auto mt-10 max-w-[720px] text-center">
          <p className="font-display text-[clamp(22px,3.4vw,34px)] font-semibold uppercase leading-[1.15] tracking-[-0.01em] text-ink">
            &ldquo;<span className="text-brand-gradient">{PROMISE}</span>&rdquo;
          </p>
        </Reveal>
      </Wrap>
    </Section>
  );
}
