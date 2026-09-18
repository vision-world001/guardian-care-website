import Counter from '../../../components/Counter';
import Reveal from '../../../components/Reveal';
import {Section, SectionHead, Wrap} from '../../../components/ui';
import {
  AFTERCARE_LABEL,
  INSTALLED_LABEL,
  MARKET_LABEL,
  type BusinessPosition
} from '../../../data/businessFlow';
import {cn} from '../../../lib/cn';

/**
 * What the six answers add up to.
 *
 * The suggestion is adaptive because the honest answer genuinely differs. A
 * company that already monitors has a different first move from one with two
 * thousand dormant records and no visibility at all, and telling both of them
 * to "start with the existing customer base" would be advice for one of them
 * and filler for the other.
 */
export default function Profile({position}: {position: BusinessPosition}) {
  const suggestion = suggest(position);

  return (
    <Section id="model" hairline>
      <Wrap>
        <SectionHead
          eyebrow="Your Guardian Care model"
          tone="blue"
          title="Where the opportunity probably is"
          body="Built from what you told us, and deliberately specific about the first stage rather than about the platform as a whole."
        />

        <div className="grid gap-4 min-[1000px]:grid-cols-[1fr_1.25fr]">
          <Reveal className="glass ring-lit rounded-frame p-6 min-[760px]:p-8">
            <div className="text-[10.5px] font-bold uppercase tracking-[.18em] text-green">
              Your business profile
            </div>

            <dl className="mt-6 divide-y divide-line-2">
              <Row
                label="Market"
                value={position.market ? MARKET_LABEL[position.market] : 'Not given'}
              />
              <Row
                label="Installed customers"
                value={
                  position.installedBand ? INSTALLED_LABEL[position.installedBand] : 'Not given'
                }
              />
              <Row
                label="Current aftercare"
                value={position.aftercare ? AFTERCARE_LABEL[position.aftercare] : 'Not given'}
                tone={position.reactive ? 'text-amber' : undefined}
              />
              <Row label="Monitoring coverage" value={position.monitoringCoverage} />
              <Row label="Primary goal" value={position.primaryGoal ?? 'Not given'} />
            </dl>

            {position.installedCount ? (
              <div className="mt-7 border-t border-line-2 pt-6">
                <div className="text-[10.5px] font-bold uppercase tracking-[.18em] text-faint">
                  Active energy systems in your portfolio
                </div>
                <div className="mono mt-3 text-[clamp(32px,4.6vw,48px)] font-semibold leading-none text-green">
                  ~<Counter value={position.installedCount.toLocaleString('en-US')} />
                </div>
                <p className="mt-3 text-[13px] font-light leading-[1.55] text-faint">
                  Every completed installation is still a running system. None of them stopped
                  producing data when the job was signed off.
                </p>
              </div>
            ) : null}
          </Reveal>

          <Reveal delay={0.06} className="overflow-hidden rounded-frame ring-lit">
            <div className="bg-[linear-gradient(120deg,var(--color-green-glow),var(--color-blue-glow))] p-6 min-[760px]:p-9">
              <div className="text-[10.5px] font-bold uppercase tracking-[.18em] text-green">
                Guardian Care suggestion
              </div>
              <p className="mt-5 font-display text-[clamp(21px,2.7vw,30px)] font-medium uppercase leading-[1.16] text-ink">
                {suggestion.headline}
              </p>
              <p className="mt-5 max-w-[620px] text-[15.5px] font-light leading-[1.68] text-muted">
                {suggestion.body}
              </p>
            </div>

            {/* Where a reactive process is replaced by a sequence. Drawn as the
                chain it is, because the order is the product. */}
            {position.reactive ? (
              <div className="border-t border-line bg-glass-2 p-6 backdrop-blur-[14px] min-[760px]:px-9 min-[760px]:py-7">
                <div className="text-[10.5px] font-bold uppercase tracking-[.18em] text-blue">
                  Guardian Care moves you toward
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2">
                  {['System data', 'Insight', 'Suggested action', 'Customer contact'].map(
                    (stage, index) => (
                      <span key={stage} className="flex items-center gap-2">
                        {index > 0 ? <span className="text-faint">→</span> : null}
                        <span className="rounded-pill border border-line px-3.5 py-1.5 text-[12.5px] font-medium text-ink">
                          {stage}
                        </span>
                      </span>
                    )
                  )}
                </div>
              </div>
            ) : null}

            {/* The rollout itself lives with the smart note at the bottom of the
                page rather than being printed twice. */}
            <div className="border-t border-line-2 bg-bg-2/70 p-6 min-[760px]:px-9 min-[760px]:py-7">
              <a
                href="#note"
                className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[.1em] text-green transition-transform duration-200 hover:translate-x-1"
              >
                Tell us more about your business →
              </a>
            </div>
          </Reveal>
        </div>
      </Wrap>
    </Section>
  );
}

function Row({label, value, tone}: {label: string; value: string; tone?: string}) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-3">
      <dt className="text-[14px] font-light text-muted">{label}</dt>
      <dd className={cn('mono shrink-0 text-right text-[14px] font-semibold text-ink', tone)}>
        {value}
      </dd>
    </div>
  );
}

/* ---------- What the answers add up to ---------- */

function suggest(position: BusinessPosition): {headline: string; body: string} {
  if (position.reactive && position.installedCount && position.installedCount >= 500) {
    return {
      headline: 'Your strongest opportunity may already exist inside your current customer base',
      body: 'A large installed base with a reactive aftercare process is the clearest case Guardian Care sees. Those systems are still producing data nobody is reading, and the customers are reachable — which means the first stage is recapture and monitoring rather than acquisition.'
    };
  }

  if (position.reactive) {
    return {
      headline: 'Your customer relationship is currently reactive',
      body: 'Your team is waiting for the customer to say something has happened, which means contact only ever begins with a problem. Connecting monitoring to the systems you have already installed gives you a reason to make contact that is not a sales call.'
    };
  }

  if (position.monitoringCoverage === 'Broad') {
    return {
      headline: 'You already monitor. The gap is what happens next',
      body: 'Monitoring tells you that something changed. Guardian Care classifies it, explains why it matters for that specific customer on their specific tariff, and drafts the conversation — which is the step that turns a dashboard into revenue.'
    };
  }

  return {
    headline: 'Start by making the customer base visible',
    body: 'Before anything can be automated, the platform needs to know what each customer has and what it should be doing. Guardian Care begins with structured capture — and the assessment your engineers already carry out becomes the setup.'
  };
}
