import {Heading, LABEL, LABEL_BASE, PRIMARY, tint} from '../../../components/kit';
import Reveal from '../../../components/Reveal';
import {Section, Wrap} from '../../../components/ui';
import {OPPORTUNITY} from '../../../data/businessFlow';
import {cn} from '../../../lib/cn';

/**
 * The upgrade conversation, before and after.
 *
 * Both messages on this section sell the same battery to the same customer.
 * The first is the one the whole market is already sending, and it is ignored
 * because it could have been sent to anybody. The second could only have been
 * sent to this house, and the difference between them is the only thing a
 * sales director needs to understand about this platform.
 *
 * The two bars are the evidence, and they are drawn to the same scale on
 * purpose: seeing 2,200 sold cheap sitting above 1,800 bought dear is the
 * entire argument for storage, and it makes itself in about a second. The
 * money is deliberately absent — it differs by market and by tariff, and an
 * invented figure here would undo the credibility the drawing just bought.
 */
export default function Revenue() {
  const scale = Math.max(OPPORTUNITY.exported, OPPORTUNITY.imported);

  return (
    <Section id="revenue" hairline className="py-16 min-[760px]:py-24">
      <Wrap>
        <Heading
          eyebrow="Upgrade intelligence"
          title="Never say"
          accent="&ldquo;buy a battery&rdquo; again."
          body="Guardian Care finds the customers who already need one, and hands your team the reason."
        />

        <div className="mx-auto grid max-w-[1000px] gap-4 min-[900px]:grid-cols-[0.85fr_1.15fr]">
          {/* ---------- The evidence ---------- */}
          <Reveal className="glass ring-lit rounded-frame p-6 min-[760px]:p-7">
            <div className={cn(LABEL, 'text-faint')}>One customer, {OPPORTUNITY.window}</div>

            <div className="mt-7 space-y-7">
              <Bar
                label="Sold to the grid"
                value={OPPORTUNITY.exported}
                scale={scale}
                colour="var(--color-blue)"
                note="At export rates"
              />
              <Bar
                label="Bought back after dark"
                value={OPPORTUNITY.imported}
                scale={scale}
                colour="var(--color-orange)"
                note="At retail rates"
              />
            </div>

            <p className="mt-7 border-t border-line-2 pt-5 text-[13.5px] font-light leading-[1.55] text-muted">
              The same electricity, leaving cheap and returning dear. Guardian Care sees this
              across your whole portfolio at once.
            </p>
          </Reveal>

          {/* ---------- The two messages ---------- */}
          <Reveal delay={0.08} className="flex flex-col gap-4">
            <Message
              label="What everyone sends"
              tone="var(--color-faint)"
              body={OPPORTUNITY.weak}
              faded
            />
            <Message
              label="What Guardian Care sends"
              tone="var(--color-green)"
              body={OPPORTUNITY.strong}
            />

            <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-2">
              <a href="#join" className={PRIMARY}>
                Put this in front of your team →
              </a>
              <span className={cn(LABEL, 'text-faint')}>Their data. Your offer.</span>
            </div>
          </Reveal>
        </div>
      </Wrap>
    </Section>
  );
}

/** One quantity, drawn against the larger of the two so the pair compare. */
function Bar({
  label,
  value,
  scale,
  colour,
  note
}: {
  label: string;
  value: number;
  scale: number;
  colour: string;
  note: string;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="text-[14px] font-light text-muted">{label}</span>
        <span className="mono text-[19px] font-semibold" style={{color: colour}}>
          {value.toLocaleString('en-GB')}
          <span className="mono ml-1.5 text-[10.5px] font-normal text-faint">kWh</span>
        </span>
      </div>

      <div className="mt-3 h-2.5 overflow-hidden rounded-pill bg-line-2">
        <span
          className="block h-full rounded-pill"
          style={{width: `${(value / scale) * 100}%`, background: colour}}
        />
      </div>

      <div className="mono mt-2 text-[10px] uppercase tracking-[.14em] text-faint">{note}</div>
    </div>
  );
}

/**
 * A message, as it would land.
 *
 * The weak one is held back rather than struck through: an installer reading
 * this page probably sent it last week, and crossing it out reads as being
 * told off by a supplier.
 */
function Message({
  label,
  tone,
  body,
  faded
}: {
  label: string;
  tone: string;
  body: string;
  faded?: boolean;
}) {
  return (
    <div
      className={cn('rounded-frame px-6 py-5', faded && 'opacity-60')}
      style={{
        background: tint(tone, faded ? 4 : 7),
        boxShadow: `inset 0 0 0 1px ${tint(tone, faded ? 14 : 26)}`
      }}
    >
      <div className={cn(LABEL_BASE, 'text-[10px] tracking-[.18em]')} style={{color: tone}}>
        {label}
      </div>
      <p
        className={cn(
          'mt-3 leading-[1.55]',
          faded
            ? 'text-[15px] font-light text-muted'
            : 'text-[16.5px] font-light text-ink min-[760px]:text-[17.5px]'
        )}
      >
        &ldquo;{body}&rdquo;
      </p>
    </div>
  );
}
