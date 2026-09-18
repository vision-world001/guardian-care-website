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

/* ---------- Acquire · Capture · Retain ---------- */

export type Pillar = {
  key: string;
  glyph: GlyphName;
  name: string;
  headline: string;
  lead: string;
  tone: StatusTone;
  columns: Array<{heading: string; items: string[]}>;
  close: string;
};

export const PILLARS: Pillar[] = [
  {
    key: 'acquire',
    glyph: 'acquire',
    name: 'Acquire',
    headline: 'Bring new and existing customers into one intelligent journey',
    lead: 'The customer is not filling in a lead form. They are beginning an energy assessment — and what they tell you is the start of their profile rather than the end of a capture.',
    tone: 'green',
    columns: [
      {
        heading: 'From an existing solar customer',
        items: [
          'Current solar system',
          'Battery storage',
          'Inverter',
          'Installation age',
          'Monitoring',
          'Import and export position',
          'Electricity tariff',
          'Current system concerns'
        ]
      },
      {
        heading: 'From a new customer',
        items: [
          'What they currently pay for electricity',
          'Whether they are considering solar',
          'Whether they are interested in battery storage',
          'What they want to reduce or improve',
          'What questions they have before they buy'
        ]
      }
    ],
    close: 'Both routes arrive in the same place, with source attached, so nothing is worked twice or lost between systems.'
  },
  {
    key: 'capture',
    glyph: 'capture',
    name: 'Capture',
    headline: 'Give your team a better understanding of every system',
    lead: 'Your engineers and advisors capture the important information around each customer through one structured onsite process — and what they record today becomes tomorrow’s customer intelligence.',
    tone: 'blue',
    columns: [
      {
        heading: 'One structured profile',
        items: [
          'Solar',
          'Battery',
          'Inverter',
          'Generation',
          'Grid import',
          'Grid export',
          'Electricity rates',
          'Monitoring',
          'System condition',
          'Customer objectives'
        ]
      }
    ],
    close: 'Instead of valuable system information sitting inside engineer notes, spreadsheets and separate apps, it becomes a usable customer profile the platform can measure against.'
  },
  {
    key: 'retain',
    glyph: 'retain',
    name: 'Retain',
    headline: 'Make installation the start of the relationship, not the end',
    lead: 'Once a customer is connected, your business can keep understanding what is happening across their system — and contact them when there is something real to say.',
    tone: 'purple',
    columns: [
      {
        heading: 'What keeps surfacing',
        items: [
          'Performance changes',
          'Battery behaviour',
          'High grid usage',
          'High export',
          'Monitoring issues',
          'Review opportunities',
          'Future upgrade requirements'
        ]
      }
    ],
    close: 'Reports, service scheduling, reviews and renewal prompts run on a cadence, so contact continues without depending on anyone remembering.'
  }
];

/** The shape of the relationship, with and without the platform. */
export const WITHOUT_CHAIN = ['Lead', 'Sale', 'Installation', 'Handover'];
export const WITH_CHAIN = [
  'Acquire',
  'Capture',
  'Install',
  'Monitor',
  'Understand',
  'Engage',
  'Retain'
];

/* ---------- Signals ---------- */

export type Signal = {
  key: string;
  glyph: GlyphName;
  name: string;
  tone: StatusTone;
  observed: string;
  review: string;
};

export const SIGNALS: Signal[] = [
  {
    key: 'import',
    glyph: 'import',
    name: 'High grid import',
    tone: 'amber',
    observed: 'Your customer has solar but continues to purchase significant electricity.',
    review: 'Generation, storage or tariff position.'
  },
  {
    key: 'export',
    glyph: 'export',
    name: 'High solar export',
    tone: 'blue',
    observed: 'Your customer regularly sends surplus energy back to the grid.',
    review: 'Battery storage or self-consumption opportunity.'
  },
  {
    key: 'battery',
    glyph: 'storage',
    name: 'Battery underutilised',
    tone: 'purple',
    observed: 'Available storage does not appear to be used effectively.',
    review: 'Battery configuration or tariff strategy.'
  },
  {
    key: 'performance',
    glyph: 'health',
    name: 'System performance change',
    tone: 'orange',
    observed: 'Generation has changed from the expected or recent baseline.',
    review: 'System performance.'
  }
];

/** Every insight answers the same three questions, in the same order. */
export const INSIGHT_QUESTIONS = [
  {q: 'What happened?', a: 'Guardian Care identifies the change or opportunity.'},
  {q: 'Why does it matter?', a: 'We explain the impact in simple terms.'},
  {q: 'What should your team do?', a: 'Guardian Care suggests the next action.'}
];

/** The worked example the whole Retain argument rests on. */
export const EXAMPLE_INSIGHT = {
  title: 'High export detected',
  tone: 'blue' as StatusTone,
  sees: 'Your customer is exporting a significant amount of surplus solar energy during the day.',
  matters: 'The customer is also purchasing electricity from the grid later, at several times what those exported units earned.',
  action:
    'Review whether battery storage, additional capacity or configuration could help the customer use more of their own generated electricity.',
  options: ['Contact customer', 'Send energy review', 'Book assessment', 'Create quote', 'Monitor further']
};

/** What a conversation sounds like before and after the platform. */
export const CONVERSATION = {
  before: 'Would you like another product?',
  after: 'We have reviewed your energy position and noticed that your system is exporting a high amount of solar while you are still purchasing electricity from the grid later in the day.'
};

/* ---------- The portfolio view ---------- */

export type PortfolioGroup = {
  name: string;
  glyph: GlyphName;
  tone: StatusTone;
  rows: string[];
};

export const PORTFOLIO: PortfolioGroup[] = [
  {
    name: 'Your portfolio',
    glyph: 'portfolio',
    tone: 'green',
    rows: [
      'Customers connected',
      'Systems healthy',
      'Customers requiring attention',
      'Monitoring active',
      'Reviews due'
    ]
  },
  {
    name: 'Energy intelligence',
    glyph: 'insight',
    tone: 'blue',
    rows: [
      'High export',
      'High grid import',
      'Battery opportunities',
      'Performance reviews',
      'Monitoring issues'
    ]
  },
  {
    name: 'Customer engagement',
    glyph: 'retain',
    tone: 'purple',
    rows: ['Customers to contact', 'Assessments due', 'Open recommendations', 'Quotes', 'Follow-ups']
  }
];

/* ---------- Markets ---------- */

export type BusinessMarket = {
  key: string;
  name: string;
  line: string;
  fields: Array<[string, string]>;
};

export const BUSINESS_MARKETS: BusinessMarket[] = [
  {
    key: 'us',
    name: 'United States',
    line: 'Understand utility rates, solar generation, storage and customer grid dependency.',
    fields: [
      ['Currency', 'USD ($)'],
      ['Export scheme', 'Net metering, state-level'],
      ['Typical driver', 'NEM transition, storage retrofit']
    ]
  },
  {
    key: 'au',
    name: 'Australia',
    line: 'Understand feed-in tariffs, solar export, battery opportunities and self-consumption.',
    fields: [
      ['Currency', 'AUD (A$)'],
      ['Export scheme', 'State FiT, retailer-set'],
      ['Typical driver', 'High export without storage']
    ]
  },
  {
    key: 'sea',
    name: 'Southeast Asia',
    line: 'Understand solar usage, grid cost, storage requirements and energy resilience.',
    fields: [
      ['Currency', 'Local (฿, RM, ₱)'],
      ['Export scheme', 'Net billing / VSPP'],
      ['Typical driver', 'Self-consumption, resilience']
    ]
  },
  {
    key: 'uae',
    name: 'Dubai / UAE',
    line: 'Understand high-consumption properties, solar opportunity, monitoring and optimisation.',
    fields: [
      ['Currency', 'AED (د.إ)'],
      ['Export scheme', 'Shams / net metering'],
      ['Typical driver', 'Cooling load, performance']
    ]
  },
  {
    key: 'uk',
    name: 'United Kingdom',
    line: 'Understand legacy FIT positions, export arrangements and grid-cost exposure.',
    fields: [
      ['Currency', 'GBP (£)'],
      ['Export scheme', 'SEG, legacy FIT'],
      ['Typical driver', 'Legacy tariff protection']
    ]
  }
];

/* ---------- What changes ---------- */

export const SHIFTS: Array<[string, string]> = [
  ['Knowing who your customers are', 'Understanding what is happening across their systems'],
  ['Waiting for customers to contact you', 'Knowing when there is a reason to engage'],
  ['Completed installations', 'An actively managed customer portfolio']
];

/** The rollout Guardian Care suggests to a business with a dormant database. */
export const ROLLOUT = [
  'Recapturing customer system information',
  'Building digital system profiles',
  'Connecting suitable monitoring',
  'Identifying energy and support opportunities',
  'Creating structured customer follow-up'
];
