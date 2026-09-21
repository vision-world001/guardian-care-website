import type {Answers, Step} from '../components/Assessment/types';
import type {GlyphName} from '../components/Glyph';
import type {StatusTone} from './command';

/* ============================================================
   "I'm a solar or energy company."

   The operator's journey. Same platform, same six quantities, read across a
   portfolio instead of a property — and the assessment at the top is asking
   about a business rather than a house, which is the only structural
   difference between this page and the other two.
   ============================================================ */

/* ---------- The business assessment ---------- */

export const BUSINESS_STEPS: Step[] = [
  {
    key: 'market',
    kind: 'choice',
    glyph: 'portfolio',
    title: 'Where do you operate?',
    lead: 'Select your market.',
    options: [
      {value: 'us', label: 'United States'},
      {value: 'au', label: 'Australia'},
      {value: 'sea', label: 'Southeast Asia'},
      {value: 'uae', label: 'Dubai / UAE'},
      {value: 'uk', label: 'United Kingdom'},
      {value: 'multiple', label: 'Multiple markets'}
    ],
    why: {
      heading: 'Why we ask',
      body: 'Every energy market is different. Tariffs, export arrangements, system sizes, battery usage and customer behaviour vary significantly by region, and Guardian Care adapts the customer journey around the market you actually operate in.'
    }
  },
  {
    key: 'customers',
    kind: 'multi',
    glyph: 'acquire',
    title: 'What type of customers do you work with?',
    lead: 'Choose all that apply.',
    options: [
      {value: 'new', label: 'New solar customers'},
      {value: 'existing', label: 'Existing solar consumers'},
      {value: 'storage', label: 'Battery and storage customers'},
      {value: 'cost', label: 'Customers looking to reduce electricity costs'},
      {value: 'aftercare', label: 'Customers needing aftercare or monitoring'},
      {value: 'mixture', label: 'A mixture of all'}
    ],
    why: {
      heading: 'Guardian Care learns from this',
      body: 'Your answer decides where the strongest opportunity is likely to be: acquiring new customers, re-engaging existing ones, improving aftercare, connecting monitoring, or creating more value from the customer base you have already installed.'
    }
  },
  {
    key: 'installed',
    kind: 'choice',
    glyph: 'business',
    title: 'How many customers have you already installed?',
    options: [
      {value: 'under-100', label: 'Under 100'},
      {value: '100-500', label: '100–500'},
      {value: '500-2000', label: '500–2,000'},
      {value: '2000-10000', label: '2,000–10,000'},
      {value: '10000-plus', label: '10,000+'}
    ],
    why: {
      heading: 'Why this matters',
      body: (
        <>
          Every completed installation is still an active energy system. Guardian Care turns finished
          jobs into a <b>visible customer portfolio</b> — so instead of only knowing who you installed
          for, you begin to know what they have, how it is performing, and when your team should
          contact them.
        </>
      )
    }
  },
  {
    key: 'aftercare',
    kind: 'choice',
    glyph: 'retain',
    title: 'What happens after you complete an installation?',
    lead: 'Choose the answer closest to your current process.',
    options: [
      {value: 'monitor', label: 'We actively monitor customers'},
      {value: 'occasional', label: 'We provide occasional aftercare'},
      {value: 'reactive', label: 'Customers contact us if something goes wrong'},
      {value: 'rarely', label: 'We rarely speak to them again'},
      {value: 'better', label: 'We want a better process'}
    ],
    why: {
      heading: 'Why we ask',
      body: (
        <>
          A relationship where the customer has to raise their hand first is a reactive one — your
          team is waiting to be told. Guardian Care moves that to{' '}
          <b>system data → insight → suggested action → customer contact</b>, which gives your
          business a genuine reason to make contact before the relationship disappears.
        </>
      )
    }
  },
  {
    key: 'improve',
    kind: 'multi',
    glyph: 'goal',
    title: 'What would you like to improve?',
    lead: 'Choose what matters most to your business.',
    options: [
      {value: 'retention', label: 'Customer retention'},
      {value: 'monitoring', label: 'Better system monitoring'},
      {value: 'battery', label: 'More battery opportunities'},
      {value: 'engineer', label: 'Better engineer data capture'},
      {value: 'aftercare', label: 'Improved customer aftercare'},
      {value: 'recurring', label: 'More recurring customer engagement'},
      {value: 'visibility', label: 'Better visibility across existing customers'},
      {value: 'sales', label: 'More structured sales opportunities'}
    ],
    why: {
      heading: 'Why we ask',
      body: 'Guardian Care is deployed in stages rather than all at once. Knowing what you want first decides which stage is worth running before the others.'
    }
  },
  {
    key: 'process',
    kind: 'choice',
    glyph: 'capture',
    title: 'How would you describe your current customer process?',
    options: [
      {value: 'move-on', label: 'We install and move on'},
      {value: 'manual', label: 'We provide aftercare but it is manual'},
      {value: 'some', label: 'We monitor some customers'},
      {value: 'database', label: 'We have a large existing database'},
      {value: 'repeat', label: 'We want to generate more repeat business'},
      {value: 'retention', label: 'We want stronger customer retention'}
    ],
    why: {
      heading: 'Why we ask',
      body: 'The starting point decides the rollout. A business with a large dormant database has a different first move from one that already monitors and wants to act on what it sees.'
    }
  }
];

/* ---------- Reading the answers ---------- */

export const MARKET_LABEL: Record<string, string> = {
  us: 'United States',
  au: 'Australia',
  sea: 'Southeast Asia',
  uae: 'Dubai / UAE',
  uk: 'United Kingdom',
  multiple: 'Multiple markets'
};

export const INSTALLED_LABEL: Record<string, string> = {
  'under-100': 'Under 100',
  '100-500': '100–500',
  '500-2000': '500–2,000',
  '2000-10000': '2,000–10,000',
  '10000-plus': '10,000+'
};

export const AFTERCARE_LABEL: Record<string, string> = {
  monitor: 'Active',
  occasional: 'Occasional',
  reactive: 'Reactive',
  rarely: 'Minimal',
  better: 'Under review'
};

const IMPROVE_LABEL: Record<string, string> = {
  retention: 'Customer retention',
  monitoring: 'System monitoring',
  battery: 'Battery opportunities',
  engineer: 'Engineer data capture',
  aftercare: 'Customer aftercare',
  recurring: 'Recurring engagement',
  visibility: 'Portfolio visibility',
  sales: 'Structured sales opportunities'
};

/** The midpoint of each band, so the page can print a portfolio rather than a range. */
const INSTALLED_COUNT: Record<string, number> = {
  'under-100': 60,
  '100-500': 300,
  '500-2000': 1200,
  '2000-10000': 6000,
  '10000-plus': 14000
};

export type BusinessPosition = {
  market: string | null;
  installedBand: string | null;
  installedCount: number | null;
  aftercare: string | null;
  /** Whether the current process waits for the customer to make contact. */
  reactive: boolean;
  monitoringCoverage: string;
  primaryGoal: string | null;
  goals: string[];
  customerTypes: string[];
};

export function readBusiness(answers: Answers): BusinessPosition {
  const aftercare = answers.choice.aftercare ?? null;
  const improve = answers.multi.improve ?? [];
  const installedBand = answers.choice.installed ?? null;

  const coverage =
    aftercare === 'monitor'
      ? 'Broad'
      : aftercare === 'occasional' || aftercare === 'some'
        ? 'Partial'
        : aftercare
          ? 'Limited'
          : '—';

  return {
    market: answers.choice.market ?? null,
    installedBand,
    installedCount: installedBand ? INSTALLED_COUNT[installedBand] : null,
    aftercare,
    reactive: aftercare === 'reactive' || aftercare === 'rarely',
    monitoringCoverage: coverage,
    primaryGoal: improve[0] ? IMPROVE_LABEL[improve[0]] : null,
    goals: improve.map((key) => IMPROVE_LABEL[key]).filter(Boolean),
    customerTypes: answers.multi.customers ?? []
  };
}
/* ============================================================
   What the page says, in as few words as it can say it.

   The reader here runs an installation company. They are not reading; they
   are deciding whether to keep scrolling, and every section below therefore
   carries one idea, drawn, with a line of text under it rather than a
   paragraph beside it. Where a sentence could be a diagram it is a diagram.
   ============================================================ */

/* ---------- Where the relationship stops today ---------- */

/**
 * The two chains the page opens on.
 *
 * `TODAY_CHAIN` is four stages and then nothing, which is the whole argument:
 * every company reading this already runs it, and already knows what follows
 * the last box. `GUARDIAN_CHAIN` is drawn on the same rail so the eye reads it
 * as the same line continuing rather than as a different product.
 *
 * None of the seven is a sales stage. That is deliberate, and it is the part
 * an installer will check for.
 */
export const TODAY_CHAIN = ['Lead', 'Sale', 'Install', 'Handover'];

export const GUARDIAN_CHAIN = [
  'Capture',
  'Connect',
  'Monitor',
  'Detect',
  'Advise',
  'Resolve',
  'Retain'
];

/* ---------- The three products ---------- */

export type Product = {
  key: string;
  glyph: GlyphName;
  tone: StatusTone;
  name: string;
  /** Two words. What this product does, as an instruction. */
  verb: string;
  who: string;
  line: string;
  /** Three capabilities, four words each. Scanned, never read. */
  points: string[];
};

export const PRODUCTS: Product[] = [
  {
    key: 'onsite',
    glyph: 'capture',
    tone: 'amber',
    name: 'Onsite',
    verb: 'Capture it',
    who: 'Your engineers',
    line: 'One visit turns an unknown installation into a digital record.',
    points: ['System profile', 'Electrical condition', 'Findings raised automatically']
  },
  {
    key: 'operations',
    glyph: 'portfolio',
    tone: 'green',
    name: 'Operations',
    verb: 'Run it',
    who: 'Your team',
    line: 'One screen for every system you have ever installed.',
    points: ['Portfolio at a glance', 'Alerts by priority', 'Tasks that assign themselves']
  },
  {
    key: 'customer',
    glyph: 'insight',
    tone: 'blue',
    name: 'My Guardian Care',
    verb: 'Show them',
    who: 'Your customer',
    line: 'The customer sees their own energy, in their own words.',
    points: ['Today at a glance', 'Plain-English advice', 'A monthly report']
  }
];

/* ---------- What it watches, so nobody has to ---------- */

export type Watch = {
  key: string;
  glyph: GlyphName;
  tone: StatusTone;
  /** The condition, in four or five words. */
  trigger: string;
  /** What the platform does about it, in five or six. */
  action: string;
};

/**
 * The rules engine as six lines.
 *
 * The specification lists nine or ten conditions and a paragraph for each.
 * Six, at five words, make the same point faster: this is already running, and
 * none of it needs a person to notice first. The `action` column is the half
 * that matters — a platform that only detects things has moved the work rather
 * than removed it.
 */
export const WATCH: Watch[] = [
  {
    key: 'offline',
    glyph: 'connect',
    tone: 'amber',
    trigger: 'Monitoring goes quiet',
    action: 'Raised before the customer notices'
  },
  {
    key: 'generation',
    glyph: 'health',
    tone: 'orange',
    trigger: 'Generation drifts below baseline',
    action: 'Weather-adjusted first, then escalated'
  },
  {
    key: 'fault',
    glyph: 'inverter',
    tone: 'red',
    trigger: 'An inverter reports a fault',
    action: 'Engineer task, same day'
  },
  {
    key: 'battery',
    glyph: 'storage',
    tone: 'purple',
    trigger: 'A battery never empties',
    action: 'Schedule reviewed remotely, no visit'
  },
  {
    key: 'export',
    glyph: 'export',
    tone: 'blue',
    trigger: 'Exports high, imports higher',
    action: 'Storage opportunity, with the evidence'
  },
  {
    key: 'tariff',
    glyph: 'tariff',
    tone: 'green',
    trigger: 'A tariff stops matching use',
    action: 'Advice sent, in plain English'
  }
];

/* ---------- One event, two readings ---------- */

/**
 * The same fault, written twice.
 *
 * This is the shortest possible statement of what the platform is for, and it
 * is why the page can carry both a consumer product and an operations console
 * without contradicting itself. The customer is protected from the detail; the
 * team is given all of it. Neither is a simplification of the other — they are
 * two renderings of one record.
 */
export const EVENT = {
  raw: 'Inverter fault 205',
  customer: {
    who: 'What your customer sees',
    tone: 'blue' as StatusTone,
    glyph: 'insight' as GlyphName,
    line: 'We have spotted something on your solar system. Guardian Care is looking into it.'
  },
  operator: {
    who: 'What your team sees',
    tone: 'orange' as StatusTone,
    glyph: 'tool' as GlyphName,
    line: 'Fault 205 — fourth occurrence in 72 hours. Engineering review triggered.',
    fields: [
      ['Customer', 'R. Delgado'],
      ['System', '6.4 kWp hybrid'],
      ['Last visit', '14 months ago']
    ] as Array<[string, string]>
  }
};

/* ---------- Revenue that argues for itself ---------- */

/**
 * The upgrade conversation, before and after.
 *
 * Both sentences sell the same battery. The first is the one every installer
 * in the market is already sending, and it is ignored because it could have
 * been sent to anybody. The second could only have been sent to this customer,
 * and that is the entire difference the platform makes to a sales team.
 */
export const OPPORTUNITY = {
  exported: 2200,
  imported: 1800,
  window: 'the last 12 months',
  weak: 'Have you considered adding a battery?',
  strong:
    'Your system sold 2,200 kWh to the grid this year and bought 1,800 kWh back after dark. Storage would keep most of it.'
};

/* ---------- Joining ---------- */

export type JoinStep = {
  key: string;
  glyph: GlyphName;
  name: string;
  line: string;
  /** The objection this step answers, in two words. */
  note: string;
};

/**
 * Four steps, because the honest answer is four steps.
 *
 * Each one carries the objection it exists to remove — no rebuild, your
 * branding, day one — because an installer's first three questions about a
 * platform are always how long, how much work, and whose name is on it.
 */
export const JOIN: JoinStep[] = [
  {
    key: 'talk',
    glyph: 'question',
    name: 'Talk',
    line: 'Tell us the shape of your installed base.',
    note: 'One call'
  },
  {
    key: 'connect',
    glyph: 'connect',
    name: 'Connect',
    line: 'We link your monitoring and your existing records.',
    note: 'No rebuild'
  },
  {
    key: 'onboard',
    glyph: 'retain',
    name: 'Onboard',
    line: 'Your customers get a dashboard with your name on it.',
    note: 'Your branding'
  },
  {
    key: 'operate',
    glyph: 'portfolio',
    name: 'Operate',
    line: 'You open the console and it is already running.',
    note: 'Day one'
  }
];

/* ---------- Where it runs ---------- */

/** Compact enough to be a strip rather than a section of its own. */
export const MARKETS: Array<{name: string; currency: string; driver: string}> = [
  {name: 'United Kingdom', currency: 'GBP', driver: 'Legacy FIT positions'},
  {name: 'United States', currency: 'USD', driver: 'NEM transition'},
  {name: 'Australia', currency: 'AUD', driver: 'High export, no storage'},
  {name: 'Dubai / UAE', currency: 'AED', driver: 'Cooling load'},
  {name: 'Southeast Asia', currency: 'THB', driver: 'Self-consumption'}
];

/* ---------- What the assessment suggests first ---------- */

/** The rollout Guardian Care suggests to a business with a dormant database. */
export const ROLLOUT = [
  'Recapture customer system information',
  'Build digital system profiles',
  'Connect suitable monitoring',
  'Identify energy and support opportunities',
  'Create structured customer follow-up'
];
