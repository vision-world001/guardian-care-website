import Reveal from '../../../components/Reveal';
import {BTN, BTN_LINE, BrowserFrame, Eyebrow, Wrap} from '../../../components/ui';
import {CC_KPIS, TONE_TEXT, type StatusTone} from '../../../data/command';

/**
 * The hero shows the first four of the Command Centre's own counters rather
 * than its own copy of them. They used to be duplicated literally — two arrays
 * holding the same figures two sections apart, either of which could be edited
 * without the other.
 */
const KPIS = CC_KPIS.slice(0, 4);

const ROWS: Array<{tone: StatusTone; title: string; sub: string}> = [
  {
    tone: 'green',
    title: 'High export detected — 8 customers',
    sub: 'Storage opportunity, modelled per property'
  },
  {
    tone: 'amber',
    title: 'Battery underutilised — 14 customers',
    sub: 'Configuration review, no site visit required'
  }
];

export default function Hero() {
  return (
    <header className="bg-business-glow py-15 min-[760px]:py-[100px]">
      <Wrap>
        <div className="grid items-center gap-11 min-[980px]:grid-cols-[1.05fr_1fr] min-[980px]:gap-[70px]">
          <div>
            <Reveal>
              <Eyebrow size="hero">Energy Intelligence &amp; Customer Concierge</Eyebrow>
            </Reveal>

            <Reveal
              as="h1"
              delay={0.06}
              className="mb-[22px] font-display text-[clamp(38px,5.4vw,64px)] font-semibold uppercase leading-[1.02]"
            >
              Don’t lose the customer
              <br />
              <span className="text-brand-gradient">after installation.</span>
            </Reveal>

            <Reveal
              as="p"
              delay={0.12}
              className="mb-9 max-w-[560px] text-[17px] font-light leading-[1.65] text-muted min-[760px]:text-[18px]"
            >
              You install the system. Guardian Care manages the relationship that follows —
              analysing each customer’s energy behaviour, identifying what needs attention, and
              giving your team the words and the reason to make contact.
            </Reveal>

            <Reveal delay={0.18} className="flex flex-wrap items-center gap-x-7 gap-y-2">
              <a href="#b-lifecycle" className={BTN}>
                See the lifecycle →
              </a>
              <a href="#b-concierge" className={BTN_LINE}>
                What the customer receives
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.16}>
            <BrowserFrame url="command.guardiancare.io" badge="Live" bodyClassName="p-5">
              <div className="mb-3.5 grid grid-cols-2 gap-px overflow-hidden rounded-tile border border-line-2 bg-line-2">
                {KPIS.map((kpi) => (
                  <div key={kpi.label} className="bg-bg/70 px-4 py-3.5">
                    <div className={`mono text-2xl font-semibold ${TONE_TEXT[kpi.tone]}`}>
                      {kpi.value}
                    </div>
                    <div className="mt-1 text-[11px] uppercase tracking-[.14em] text-faint">
                      {kpi.label}
                    </div>
                  </div>
                ))}
              </div>

              {ROWS.map((row, i) => (
                <div
                  key={row.title}
                  className={`glass flex items-start gap-3.5 rounded-tile border border-line-2 px-4 py-3.5 ${
                    i === ROWS.length - 1 ? '' : 'mb-2.5'
                  }`}
                >
                  <span
                    className={`mt-[7px] h-2 w-2 shrink-0 rounded-full ${
                      row.tone === 'green' ? 'bg-green' : 'bg-amber'
                    }`}
                  />
                  <div>
                    <div className="text-sm font-medium">{row.title}</div>
                    <div className="mt-1 text-[12.5px] font-light text-muted">{row.sub}</div>
                  </div>
                </div>
              ))}
            </BrowserFrame>
          </Reveal>
        </div>
      </Wrap>
    </header>
  );
}
