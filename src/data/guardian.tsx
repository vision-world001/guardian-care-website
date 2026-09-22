import type {GlyphName} from '../components/Glyph';
import type {StatusTone} from './command';

/* ============================================================
   Guardian Care, as the product actually is.

   Taken from the working dashboard rather than from a pitch. That matters,
   because the two had drifted: the site was telling an international story —
   five markets, four currencies, customers in Brisbane and Phoenix — about a
   product whose screens say MCS, DNO, consumer unit, Feed-in Tariff and
   p/kWh. It is a UK FIT-era job, and the honest version of it is the better
   story anyway.

   Everything below is a fact a visitor could check against the app.
   ============================================================ */

/* ---------- The promise, in the product's own words ---------- */

/**
 * Three lines from the dashboard's own rail, where they sit beside every one
 * of the ten stages. Not written for this website, which is exactly why they
 * are worth using on it.
 */
export const PILLARS: Array<{glyph: GlyphName; line: string}> = [
  {glyph: 'insight', line: 'Understand your system'},
  {glyph: 'savings', line: 'Unlock its true potential'},
  {glyph: 'retain', line: 'For a cleaner, brighter tomorrow'}
];

/** The line the app writes in script across its hero. */
export const SCRIPT = ['Same home.', 'Real insights.', 'A brighter tomorrow.'];

/**
 * The sentence the whole proposition rests on.
 *
 * It appears on the dashboard's requirements screen, next to the list of
 * things it is recommending — which is the only place a claim like this counts
 * for anything.
 */
export const PROMISE = 'We don’t recommend anything your system doesn’t need.';

/* ---------- The gap ---------- */

/**
 * The number that makes the case, and it is the app's own worked example.
 *
 * A system promised a figure at installation. Nobody has compared it to
 * reality since. 62% is not a fault anybody would notice from indoors — the
 * panels are on the roof, the lights are on, the FIT statement still arrives —
 * which is precisely why it can run for twelve years unmentioned.
 */
export const GAP = {
  expected: 100,
  actual: 62,
  years: 12,
  line: 'Generation at 62% of the level this system was sold on. Twelve years, unnoticed.'
};

/* ---------- What the engineer finds ---------- */

export type Finding = {
  key: string;
  /** HIGH PRIORITY · RECOMMENDED · OPPORTUNITY, as the app badges them. */
  priority: 'High priority' | 'Recommended' | 'Opportunity';
  tone: StatusTone;
  glyph: GlyphName;
  /** The evidence. Always a reading, never an opinion. */
  evidence: string;
  /** What it leads to. */
  solution: string;
};

/**
 * Six real findings from the app's requirements screen.
 *
 * Every one pairs a recommendation with the measurement that produced it, and
 * that pairing is the product. "Install surge protection" is a sales line;
 * "your engineer found no surge protection device" is a finding that happens
 * to have a fix. The site should never show one without the other.
 */
export const FINDINGS: Finding[] = [
  {
    key: 'surge',
    priority: 'High priority',
    tone: 'red',
    glyph: 'health',
    evidence: 'No surge protection found',
    solution: 'Protection review'
  },
  {
    key: 'voltage',
    priority: 'High priority',
    tone: 'red',
    glyph: 'grid',
    evidence: '244 V recorded, against a 235 V threshold',
    solution: 'Voltage regulation'
  },
  {
    key: 'inverter',
    priority: 'Recommended',
    tone: 'orange',
    glyph: 'inverter',
    evidence: 'Generation at 62% of expected, original inverter',
    solution: 'Monitored inverter'
  },
  {
    key: 'isolator',
    priority: 'Recommended',
    tone: 'orange',
    glyph: 'tool',
    evidence: 'AC isolator needs attention',
    solution: 'Isolator update'
  },
  {
    key: 'manufacturer',
    priority: 'Recommended',
    tone: 'amber',
    glyph: 'connect',
    evidence: 'Inverter manufacturer no longer trading',
    solution: 'Supported equipment'
  },
  {
    key: 'battery',
    priority: 'Opportunity',
    tone: 'green',
    glyph: 'storage',
    evidence: 'No battery, surplus exported daily',
    solution: 'Battery storage'
  }
];

/* ---------- What Guardian Care then does ---------- */

export type Provision = {key: string; glyph: GlyphName; name: string; line: string};

/**
 * The seven things the subscription actually provides, from the activation
 * screen. Four words each: a homeowner deciding on £69.99 a month is
 * scanning this list, not reading it.
 */
export const PROVIDES: Provision[] = [
  {key: 'generation', glyph: 'generation', name: 'Generation tracking', line: 'Against what it should make'},
  {key: 'intelligence', glyph: 'insight', name: 'Energy intelligence', line: 'Made, used, bought, sold, stored'},
  {key: 'cost', glyph: 'cost', name: 'Cost tracking', line: 'What the grid still costs you'},
  {key: 'reports', glyph: 'portfolio', name: 'Weekly reporting', line: 'In plain English'},
  {key: 'alerts', glyph: 'monitoring', name: 'Performance alerts', line: 'When something changes'},
  {key: 'faults', glyph: 'tool', name: 'Fault support', line: 'Someone to call'},
  {key: 'fit', glyph: 'tariff', name: 'FIT visibility', line: 'For the rest of your term'}
];

/**
 * The price, stated once.
 *
 * On the page as plainly as the app states it. A monitoring subscription whose
 * cost a visitor has to request is a monitoring subscription they assume is
 * expensive.
 */
export const PRICE = {free: '30 days free', then: '£69.99', per: '/month'};

/* ---------- The thing nobody else says ---------- */

/**
 * "Not sure" as a first-class answer.
 *
 * Every question in the app offers it, and the results screen then shows its
 * working — *worked out from answers marked "Not sure"* — rather than hiding
 * the guess. For a homeowner who has no idea what an inverter is, this is the
 * single most reassuring thing about the product, and the site had never
 * mentioned it.
 */
export const NOT_SURE = {
  label: 'Not sure',
  line: 'Every question takes “not sure” for an answer. Your engineer confirms the rest.'
};
