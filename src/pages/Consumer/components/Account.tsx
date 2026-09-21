import Counter from '../../../components/Counter';
import Glyph, {type GlyphName} from '../../../components/Glyph';
import Reveal from '../../../components/Reveal';
import {Section, Wrap} from '../../../components/ui';
import {TONE_TEXT, type StatusTone} from '../../../data/command';
import {DAY, GRID_COST, HOME, HOME_USE, pounds} from '../../../data/consumer';
import {cn} from '../../../lib/cn';
import {LiveDot} from '../../Home/components/Conduit';
import {Heading, LABEL, LABEL_BASE, Tile} from '../../../components/kit';

/**
 * Your Guardian Care account.
 *
 * Two promises that pull against each other, and the section has to make both:
 * you can look whenever you like, and you never have to. Most monitoring
 * products only make the first, which quietly hands the household a job —
 * check the app, read the graph, notice the dip. So the copy leads with the
 * second, and the dashboard beside it shows everything the brief lists without
 * asking the reader to interpret any of it.
 *
 * Same household, same day, same colours as every earlier section. By now a
 * reader has met 18 kWh four times, which is the point: it is one system, and
 * the dashboard is simply where it lives.
 */

type Reading = {
  label: string;
  value: string;
  unit: string;
  note: string;
  tone: StatusTone;
  glyph: GlyphName;
};

const TILES: Reading[] = [
  {label: 'Solar generation', value: DAY.generated.toFixed(1), unit: 'kWh', note: 'Today', tone: 'amber', glyph: 'generation'},
  {label: 'Home energy use', value: HOME_USE.toFixed(1), unit: 'kWh', note: 'Solar, battery and grid', tone: 'green', glyph: 'consumption'},
  {label: 'Battery', value: DAY.stored.toFixed(1), unit: 'kWh', note: 'Stored, used this evening', tone: 'purple', glyph: 'storage'},
  {label: 'Export', value: DAY.exported.toFixed(1), unit: 'kWh', note: 'Sent to the grid', tone: 'blue', glyph: 'export'},
  {label: 'Grid import', value: DAY.imported.toFixed(1), unit: 'kWh', note: 'Bought after dark', tone: 'orange', glyph: 'import'},
  {label: 'Energy costs', value: pounds(GRID_COST), unit: '', note: `At ${HOME.importRate}p/kWh`, tone: 'ink', glyph: 'cost'}
];

/** Who does what, stated as plainly as it can be. */
const ROLES = [
  {who: 'You', what: 'Look in whenever you choose — today, this month or this year. There is nothing you have to check.'},
  {who: 'Guardian Care', what: 'Watches your system every day in the background, and tells you when something is worth your attention.'}
];

export default function Account() {
  return (
    <Section id="account" hairline className="py-16 min-[760px]:py-24">
      <Wrap>
        <div className="grid items-center gap-12 min-[1080px]:grid-cols-[0.82fr_1.18fr] min-[1080px]:gap-16">
          <div>
            <Heading
              align="left"
              eyebrow="◇ Your Guardian Care account"
              title="Your dashboard."
              accent="Whenever you like."
              body="Once your monitoring profile is activated, you receive your own Guardian Care login. Your solar, your home, your battery and your costs — in one place, on any device."
              spacing="mb-10"
            />

            <Reveal delay={0.08} as="dl" className="space-y-3">
              {ROLES.map((role, index) => (
                <div
                  key={role.who}
                  className={cn(
                    'rounded-card border px-5 py-4',
                    index === 1 ? 'border-amber/30 bg-amber/[0.06]' : 'border-line-2 bg-panel/55'
                  )}
                >
                  <dt className={cn(LABEL, index === 1 ? 'text-amber' : 'text-faint')}>{role.who}</dt>
                  <dd className="mt-2 text-[15px] font-light leading-[1.55] text-ink/90">{role.what}</dd>
                </div>
              ))}
            </Reveal>

            <Reveal delay={0.14} as="p" className="mt-6 text-[14.5px] font-light leading-[1.6] text-faint">
              You do not need to constantly watch your system yourself. Guardian Care handles the
              ongoing intelligence in the background.
            </Reveal>
          </div>

          <Reveal animation="animate-card-in" delay={0.1} className="min-w-0">
            <Dashboard />
          </Reveal>
        </div>
      </Wrap>
    </Section>
  );
}

/* ---------- The dashboard ---------- */

function Dashboard() {
  return (
    <div className="glass shadow-lift ring-lit overflow-hidden rounded-frame">
      {/* ---------- Chrome ---------- */}
      <div className="glass-solid flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line-2 px-5 py-3.5 min-[520px]:px-6">
        <span className={cn(LABEL, 'text-amber')}>◇ Guardian Care</span>
        <span className="mono text-[10.5px] uppercase tracking-[.14em] text-faint">My system · Today</span>
        <span className="ml-auto flex items-center gap-2">
          <LiveDot />
          <span className="mono text-[10px] font-semibold uppercase tracking-[.16em] text-green">
            System healthy
          </span>
        </span>
      </div>

      {/* ---------- The six readings ---------- */}
      <div className="grid grid-cols-2 gap-px bg-line-2 min-[620px]:grid-cols-3">
        {TILES.map((tile) => (
          <div key={tile.label} className="bg-panel px-4 py-5 min-[520px]:px-5">
            <div className="flex items-center justify-between gap-2">
              <span className="mono text-[9.5px] font-semibold uppercase tracking-[.14em] text-faint">
                {tile.label}
              </span>
              <Glyph name={tile.glyph} className={cn('h-5 w-5 shrink-0 opacity-70', TONE_TEXT[tile.tone])} />
            </div>
            <div
              className={cn(
                'mono mt-3 text-[clamp(22px,2.6vw,28px)] font-semibold leading-none',
                TONE_TEXT[tile.tone]
              )}
            >
              <Counter value={tile.value} />
              {tile.unit ? (
                <span className="mono ml-1.5 text-[11px] font-normal text-faint">{tile.unit}</span>
              ) : null}
            </div>
            <div className="mt-2 text-[12px] font-light leading-snug text-muted">{tile.note}</div>
          </div>
        ))}
      </div>

      {/* ---------- Alerts and advice ---------- */}
      <div className="grid gap-px border-t border-line-2 bg-line-2 min-[620px]:grid-cols-2">
        <div className="bg-panel px-5 py-5 min-[520px]:px-6">
          <div className={cn(LABEL_BASE, 'text-[10px] tracking-[.2em] text-faint')}>System alerts</div>
          <div className="mt-3 flex items-center gap-3">
            <Tile tone="green" size="sm">
              <Glyph name="health" bold className="h-5 w-5" />
            </Tile>
            <span className="text-[14px] leading-snug text-ink">
              No faults
              <span className="mt-0.5 block text-[12.5px] font-light text-muted">
                Monitoring online · inverter reporting
              </span>
            </span>
          </div>
        </div>

        <div className="bg-panel px-5 py-5 min-[520px]:px-6">
          <div className={cn(LABEL_BASE, 'text-[10px] tracking-[.2em] text-amber')}>Guardian Care recommends</div>
          <div className="mt-3 flex items-center gap-3">
            <Tile tone="amber" size="sm">
              <Glyph name="insight" bold className="h-5 w-5" />
            </Tile>
            <span className="text-[14px] leading-snug text-ink">
              Review battery settings
              <span className="mt-0.5 block text-[12.5px] font-light text-muted">
                {DAY.exported} kWh exported while {DAY.imported} kWh was bought back
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
