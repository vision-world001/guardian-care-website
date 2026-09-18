import Glyph from '../../../components/Glyph';
import Reveal from '../../../components/Reveal';
import {HAIRLINE_GRID, PanelEdge, Section, SectionHead, Wrap} from '../../../components/ui';
import {
  CONVERSATION,
  EXAMPLE_INSIGHT,
  INSIGHT_QUESTIONS,
  SIGNALS
} from '../../../data/businessFlow';
import {TONE_TEXT} from '../../../data/command';
import {cn} from '../../../lib/cn';

/**
 * Turning customer data into something a person can act on.
 *
 * The four signals are what the platform notices. The three questions are the
 * shape every insight is required to take. The worked example is both of them
 * at once on one real customer — and the two quotations at the bottom are the
 * only measurable difference any of it makes: what your team is able to say
 * when they pick up the phone.
 */
export default function Signals() {
  return (
    <Section id="signals" hairline>
      <Wrap>
        <SectionHead
          eyebrow="Turn customer data into energy intelligence"
          tone="blue"
          index="03 / 05"
          title="Guardian Care does more than show the data"
          body="Once system information is available, the platform starts identifying meaningful patterns. Every one of them answers the same three questions before it reaches anybody on your team."
        />

        {/* ---------- What it notices ---------- */}
        <div className={cn(HAIRLINE_GRID, 'grid-cols-1 min-[620px]:grid-cols-2 min-[1100px]:grid-cols-4')}>
          {SIGNALS.map((signal, index) => (
            <Reveal key={signal.key} delay={index * 0.05} className="glass px-6 py-7">
              <span className={cn('mb-5 inline-block', TONE_TEXT[signal.tone])}>
                <Glyph name={signal.glyph} className="h-8 w-8" />
              </span>
              <div className="mb-3 font-display text-[20px] font-semibold uppercase leading-[1.12] text-ink">
                {signal.name}
              </div>
              <p className="text-[14px] font-light leading-[1.55] text-muted">{signal.observed}</p>
              <div className="mt-5 border-t border-line-2 pt-4">
                <div className="text-[10px] font-bold uppercase tracking-[.16em] text-faint">
                  Suggested review
                </div>
                <div className={cn('mt-1.5 text-[13.5px] font-medium', TONE_TEXT[signal.tone])}>
                  {signal.review}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ---------- The three questions ---------- */}
        <Reveal className="mt-4 grid gap-px overflow-hidden rounded-frame bg-line-2 ring-lit min-[760px]:grid-cols-3">
          {INSIGHT_QUESTIONS.map((item, index) => (
            <div key={item.q} className="glass p-6 min-[760px]:p-8">
              <span className="mono text-[11px] text-faint">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="mt-3 font-display text-[22px] font-semibold uppercase leading-[1.1] text-ink">
                {item.q}
              </div>
              <p className="mt-3 text-[14.5px] font-light leading-[1.55] text-muted">{item.a}</p>
            </div>
          ))}
        </Reveal>

        {/* ---------- One of them, worked ---------- */}
        <Reveal delay={0.1} className="group ring-lit relative mt-4 overflow-hidden rounded-frame glass">
          <PanelEdge tone="blue" />

          <div className="border-b border-line-2 px-6 py-5 min-[760px]:px-9">
            <div className="flex flex-wrap items-center gap-3">
              <span className={cn('text-[10.5px] font-bold uppercase tracking-[.18em]', TONE_TEXT[EXAMPLE_INSIGHT.tone])}>
                Example customer insight
              </span>
              <span className="rounded-pill border border-blue/35 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[.1em] text-blue">
                {EXAMPLE_INSIGHT.title}
              </span>
            </div>
          </div>

          <div className="grid gap-px bg-line-2 min-[900px]:grid-cols-3">
            <Part heading="What Guardian Care sees" body={EXAMPLE_INSIGHT.sees} lead />
            <Part heading="Why it matters" body={EXAMPLE_INSIGHT.matters} />
            <Part heading="Suggested action" body={EXAMPLE_INSIGHT.action} />
          </div>

          <div className="border-t border-line-2 px-6 py-6 min-[760px]:px-9">
            <div className="text-[10.5px] font-bold uppercase tracking-[.18em] text-faint">
              Your options
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {EXAMPLE_INSIGHT.options.map((option, index) => (
                <span
                  key={option}
                  className={cn(
                    'rounded-pill px-4 py-2 text-[12px] font-semibold uppercase tracking-[.06em]',
                    index === 0
                      ? 'bg-brand-gradient text-bg'
                      : 'border border-line-2 text-muted'
                  )}
                >
                  {option}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ---------- What your team gets to say ---------- */}
        <div className="mt-16">
          <Reveal className="mb-8 max-w-[620px]">
            <div className="text-[10.5px] font-bold uppercase tracking-[.18em] text-green">
              Build better customer conversations
            </div>
            <h3 className="mt-3 font-display text-[clamp(24px,3.2vw,36px)] font-semibold uppercase leading-[1.06] text-ink">
              A reason to call that is not a campaign
            </h3>
          </Reveal>

          <div className="grid gap-4 min-[900px]:grid-cols-[1fr_1.4fr]">
            <Reveal className="glass ring-lit rounded-frame p-6 min-[760px]:p-8">
              <div className="text-[10.5px] font-bold uppercase tracking-[.18em] text-faint">
                Instead of
              </div>
              <blockquote className="mt-5 border-l-2 border-line-2 pl-5 text-[17px] font-light italic leading-[1.5] text-faint">
                “{CONVERSATION.before}”
              </blockquote>
            </Reveal>

            <Reveal
              delay={0.06}
              className="ring-lit rounded-frame bg-[linear-gradient(120deg,var(--color-green-glow),var(--color-blue-glow))] p-6 min-[760px]:p-8"
            >
              <div className="text-[10.5px] font-bold uppercase tracking-[.18em] text-green">
                Your team can say
              </div>
              <blockquote className="mt-5 border-l-2 border-green pl-5 text-[17px] font-light leading-[1.55] text-ink min-[760px]:text-[18.5px]">
                “{CONVERSATION.after}”
              </blockquote>
              <p className="mt-6 border-t border-line pt-5 text-[14px] font-light leading-[1.6] text-muted">
                The discussion starts with their system and their energy position. Not with a sales
                pitch.
              </p>
            </Reveal>
          </div>
        </div>
      </Wrap>
    </Section>
  );
}

function Part({heading, body, lead}: {heading: string; body: string; lead?: boolean}) {
  return (
    <div className="glass p-6 min-[760px]:p-8">
      <div className="text-[10.5px] font-bold uppercase tracking-[.18em] text-blue">{heading}</div>
      <p
        className={cn(
          'mt-3.5 leading-[1.6]',
          lead ? 'text-[16px] font-normal text-ink' : 'text-[15px] font-light text-muted'
        )}
      >
        {body}
      </p>
    </div>
  );
}
