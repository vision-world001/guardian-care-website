import type {Answers, Step} from '../components/Assessment/types';
import {numberOf} from '../components/Assessment/types';
import type {GlyphName} from '../components/Glyph';
import type {StatusTone} from './command';

/* ============================================================
   "I already have solar." — the consumer journey.

   The system check, the summary it produces, and one example household
   followed through every step of the service. Every figure the page prints
   comes from here, so the page cannot contradict itself: the hero card, the
   bird's-eye view, the insight and the dashboard are all the same day at the
   same house.
   ============================================================ */

/* ---------- The system check ---------- */

export const EXISTING_STEPS: Step[] = [
  {
    key: 'installed',
    kind: 'choice',
    glyph: 'existing',
    title: 'When was your solar system installed?',
    lead: 'Select your installation period.',
    options: [
      {value: '2010-2011', label: '2010–2011'},
      {value: '2012-2015', label: '2012–2015'},
      {value: '2016-2019', label: '2016–2019'},
      {value: 'after-2019', label: 'After 2019'},
      {value: 'unsure', label: 'I’m not sure'}
    ],
    why: {
      heading: 'Why are we asking?',
      body: (
        <>
          The installation period tells Guardian Care the age of your system and whether it may have
          been installed under the UK Feed-in Tariff scheme. For eligible FIT installations, tariff
          entitlement depends on more than the installation date — the eligibility date, installed
          capacity and applicable tariff band all matter — so this is a <b>starting point</b>, and
          the actual FIT information is confirmed later where it is available. The scheme closed to
          new applications in 2019.
        </>
      )
    }
  },
  {
    key: 'panels',
    kind: 'choice',
    glyph: 'generation',
    title: 'How many solar panels do you have?',
    options: [
      {value: '6-8', label: '6–8 panels'},
      {value: '9-12', label: '9–12 panels'},
      {value: '13-16', label: '13–16 panels'},
      {value: '17-20', label: '17–20 panels'},
      {value: '20-plus', label: '20+ panels'},
      {value: 'exact', label: 'Enter my exact number', input: {suffix: 'panels', placeholder: '14'}},
      {value: 'unsure', label: 'I’m not sure'}
    ],
    why: {
      heading: 'Why does this matter?',
      body: 'The number of panels begins the estimate of your original system size and what it should be capable of generating. Guardian Care combines it with the installation period and, where available, your original capacity and generation records.'
    }
  },
  {
    key: 'original',
    kind: 'choice',
    glyph: 'health',
    title: 'Is this your original solar system?',
    options: [
      {value: 'original', label: 'Yes — it is still the original system'},
      {value: 'panels-added', label: 'Panels have been added'},
      {value: 'inverter', label: 'The inverter has been replaced'},
      {value: 'battery-added', label: 'Battery storage has been added'},
      {value: 'several', label: 'Several parts have been upgraded'},
      {value: 'unsure', label: 'I’m not sure'}
    ],
    why: {
      heading: 'Why are we asking?',
      body: 'Solar systems change significantly over their lifetime. Knowing whether equipment has been added or replaced lets Guardian Care separate the original installation from later improvements, which gives a far more accurate picture of what you currently have.'
    }
  },
  {
    key: 'battery',
    kind: 'choice',
    glyph: 'storage',
    title: 'Do you have battery storage?',
    options: [
      {value: 'yes', label: 'Yes'},
      {value: 'no', label: 'No'},
      {value: 'considering', label: 'I’m considering one'},
      {value: 'unsure', label: 'I’m not sure'}
    ],
    why: {
      heading: 'Why battery storage matters',
      body: (
        <>
          Solar electricity is generated during daylight hours. If it is not used at the moment it is
          made, it can either charge a battery or be exported. Guardian Care wants to understand
          whether your system lets you <b>retain enough of what you generate</b> to use later.
        </>
      )
    }
  },
  {
    key: 'capacity',
    kind: 'choice',
    glyph: 'storage',
    title: 'Approximately how much storage do you have?',
    showIf: (answers) => answers.choice.battery === 'yes',
    options: [
      {value: 'under-5', label: 'Under 5 kWh'},
      {value: '5-7', label: '5–7 kWh'},
      {value: '8-10', label: '8–10 kWh'},
      {value: '10-15', label: '10–15 kWh'},
      {value: '15-plus', label: '15+ kWh'},
      {value: 'exact', label: 'Enter exact capacity', input: {suffix: 'kWh', placeholder: '9.5'}},
      {value: 'unsure', label: 'I’m not sure'}
    ],
    why: {
      heading: 'Why does capacity matter?',
      body: 'Capacity decides how much of a day’s surplus can be held back for the evening. It is the difference between a battery that absorbs your whole midday surplus and one that fills by lunchtime and exports the rest.'
    }
  },
  {
    key: 'surplus',
    kind: 'choice',
    glyph: 'export',
    title: 'What happens to your excess solar?',
    lead: 'Choose the answer that best describes your system.',
    options: [
      {value: 'battery', label: 'It goes into my battery'},
      {value: 'grid', label: 'It goes back to the grid'},
      {value: 'split', label: 'Some to my battery, some exported'},
      {value: 'unknown', label: 'I don’t know'}
    ],
    why: {
      heading: 'Guardian Care explains',
      body: (
        <>
          Generating electricity is valuable. But Guardian Care also wants to know what happens
          <b> after</b> it is generated. If your home cannot use it immediately and your battery
          cannot store it, the surplus is normally exported — and the opportunity is in understanding
          whether your setup makes sensible use of that generation before you have to buy electricity
          back later.
        </>
      )
    }
  },
  {
    key: 'bill',
    kind: 'choice',
    glyph: 'cost',
    title: 'Approximately what is your electricity bill?',
    lead: 'What do you normally pay each month?',
    options: [
      {value: 'under-75', label: 'Under £75'},
      {value: '75-125', label: '£75–£125'},
      {value: '125-175', label: '£125–£175'},
      {value: '175-250', label: '£175–£250'},
      {value: '250-plus', label: '£250+'},
      {value: 'exact', label: 'Enter my approximate bill', input: {suffix: '/month', placeholder: '145'}}
    ],
    why: {
      heading: 'Why do we ask?',
      body: 'Your bill is an initial indication of how much grid electricity the property still relies on. It is an estimate at this stage — Guardian Care sharpens it once actual rates and monitoring data are available.'
    }
  },
  {
    key: 'rates',
    kind: 'fields',
    glyph: 'tariff',
    title: 'What do you pay for grid electricity?',
    lead: 'Only what you know. Anything left blank uses a national average until the real figure arrives.',
    fields: [
      {key: 'importRate', label: 'Import electricity rate', suffix: 'p/kWh', placeholder: '29'},
      {key: 'offPeakRate', label: 'Off-peak rate', note: 'if applicable', suffix: 'p/kWh', placeholder: '—'},
      {key: 'standingCharge', label: 'Standing charge', suffix: 'p/day', placeholder: '58'},
      {key: 'exportRate', label: 'Export rate', note: 'if known', suffix: 'p/kWh', placeholder: '15'},
      {key: 'fitRate', label: 'FIT generation rate', note: 'if applicable', suffix: 'p/kWh', placeholder: '—'}
    ],
    why: {
      heading: 'Why do we ask?',
      body: (
        <>
          Because 1 kWh does not have the same financial value in every situation. Guardian Care
          compares what electricity <b>costs you to buy</b> against what it is <b>worth when
          exported</b>, and against how much of your own generation you could use yourself.
        </>
      )
    }
  }
];

/* ---------- Reading the answers ---------- */

/**
 * Panel output by era. A 2011 module and a 2023 module are not the same object,
 * and using one average across fifteen years of hardware would put an old
 * system's estimate out by a third.
 */
const KW_PER_PANEL: Record<string, number> = {
  '2010-2011': 0.19,
  '2012-2015': 0.25,
  '2016-2019': 0.3,
  'after-2019': 0.4,
  unsure: 0.28
};

/** The middle of each installation band, for an age the page can actually print. */
const ERA_YEAR: Record<string, number> = {
  '2010-2011': 2011,
  '2012-2015': 2013,
  '2016-2019': 2017,
  'after-2019': 2021,
  unsure: 2015
};

const PANEL_COUNT: Record<string, number> = {
  '6-8': 7,
  '9-12': 11,
  '13-16': 14,
  '17-20': 18,
  '20-plus': 22,
  unsure: 12
};

const MONTHLY_BILL: Record<string, number> = {
  'under-75': 60,
  '75-125': 100,
  '125-175': 145,
  '175-250': 210,
  '250-plus': 300
};

export const ERA_LABEL: Record<string, string> = {
  '2010-2011': '2010–2011',
  '2012-2015': '2012–2015',
  '2016-2019': '2016–2019',
  'after-2019': 'After 2019',
  unsure: 'Not known'
};

/** The year the site's figures are stated against. */
export const ASSESSMENT_YEAR = 2026;

/**
 * UK yield per installed kWp, annualised. Deliberately a single conservative
 * national figure rather than a modelled one: the page is estimating from a
 * panel count and an era, and a four-decimal irradiance model layered on top of
 * that would be precision the inputs cannot support.
 */
const KWH_PER_KWP = 970;

/** Defaults used where a rate was left blank, so no figure is ever missing. */
export const DEFAULT_RATES = {
  importRate: 29,
  exportRate: 15,
  standingCharge: 58
};

export type ExistingPosition = {
  era: string | null;
  installYear: number | null;
  ageYears: number | null;
  panels: number | null;
  systemKw: number | null;
  annualKwh: number | null;
  hasBattery: boolean;
  batteryKwh: number | null;
  /** Eligible installations predate the scheme closing to new applications. */
  potentialFit: boolean;
  monthlyBill: number | null;
  annualSpend: number | null;
  importRate: number;
  exportRate: number;
  standingCharge: number;
  fitRate: number | null;
  /** Whether the visitor has said where their surplus goes. */
  surplusKnown: boolean;
  exporting: boolean;
};

export function readPosition(answers: Answers): ExistingPosition {
  const era = answers.choice.installed ?? null;
  const installYear = era ? ERA_YEAR[era] : null;

  const panelChoice = answers.choice.panels ?? null;
  const panels =
    panelChoice === 'exact'
      ? (numberOf(answers, 'panels', 0) || null)
      : panelChoice
        ? PANEL_COUNT[panelChoice]
        : null;

  const perPanel = era ? KW_PER_PANEL[era] : KW_PER_PANEL.unsure;
  const systemKw = panels ? Math.round(panels * perPanel * 10) / 10 : null;

  /* A battery may have arrived after the original install, so both questions
     can put one on the profile. */
  const hasBattery =
    answers.choice.battery === 'yes' || answers.choice.original === 'battery-added';

  const capacityChoice = answers.choice.capacity ?? null;
  const capacityBand: Record<string, number> = {
    'under-5': 4,
    '5-7': 6,
    '8-10': 9,
    '10-15': 12.5,
    '15-plus': 16,
    unsure: 0
  };
  const batteryKwh =
    capacityChoice === 'exact'
      ? (numberOf(answers, 'capacity', 0) || null)
      : capacityChoice
        ? capacityBand[capacityChoice] || null
        : null;

  const billChoice = answers.choice.bill ?? null;
  const monthlyBill =
    billChoice === 'exact'
      ? (numberOf(answers, 'bill', 0) || null)
      : billChoice
        ? MONTHLY_BILL[billChoice]
        : null;

  const fitRateRaw = numberOf(answers, 'fitRate', 0);

  return {
    era,
    installYear,
    ageYears: installYear ? ASSESSMENT_YEAR - installYear : null,
    panels,
    systemKw,
    annualKwh: systemKw ? Math.round((systemKw * KWH_PER_KWP) / 100) * 100 : null,
    hasBattery,
    batteryKwh,
    potentialFit: Boolean(installYear && installYear < 2019),
    monthlyBill,
    annualSpend: monthlyBill ? Math.round(monthlyBill * 12) : null,
    importRate: numberOf(answers, 'importRate', DEFAULT_RATES.importRate),
    exportRate: numberOf(answers, 'exportRate', DEFAULT_RATES.exportRate),
    standingCharge: numberOf(answers, 'standingCharge', DEFAULT_RATES.standingCharge),
    fitRate: fitRateRaw > 0 ? fitRateRaw : null,
    surplusKnown: Boolean(answers.choice.surplus && answers.choice.surplus !== 'unknown'),
    exporting: answers.choice.surplus === 'grid' || answers.choice.surplus === 'split'
  };
}

/* ---------- What the answers add up to ---------- */

export type SummaryRow = {key: string; label: string; value: string; note: string};

/**
 * The system summary, as seven lines.
 *
 * One function for both places it appears: the illustration in step 02 is this
 * function run over the example household, and the result under the system
 * check is the same function run over the visitor's own answers. So the page
 * never promises a summary that looks different from the one it delivers.
 *
 * Grid dependency is stated as a band rather than a percentage. Nothing in the
 * questionnaire measures consumption, and a precise-looking figure built from
 * a bill band would be precision the inputs cannot support.
 */
export function summaryOf(position: ExistingPosition): SummaryRow[] {
  const {hasBattery, exporting} = position;

  return [
    {
      key: 'age',
      label: 'System age',
      value: position.ageYears === null ? 'To be confirmed' : `${position.ageYears} years`,
      note: position.era ? `Installed ${ERA_LABEL[position.era]}` : 'Installation date not given'
    },
    {
      key: 'generation',
      label: 'Estimated generation',
      value:
        position.annualKwh === null
          ? 'To be confirmed'
          : `≈ ${position.annualKwh.toLocaleString('en-GB')} kWh / yr`,
      note:
        position.systemKw === null ? 'Needs a panel count' : `From a ${position.systemKw} kWp system`
    },
    {
      key: 'equipment',
      label: 'Current equipment',
      value: position.panels === null ? 'To be confirmed' : `${position.panels} panels · inverter`,
      note: hasBattery ? 'Plus battery storage' : 'No battery recorded'
    },
    {
      key: 'battery',
      label: 'Battery position',
      value: hasBattery
        ? position.batteryKwh
          ? `${position.batteryKwh} kWh battery`
          : 'Battery fitted'
        : 'No storage',
      note: hasBattery
        ? exporting
          ? 'Surplus is still being exported'
          : 'Holding surplus for later'
        : 'Surplus is exported as it is made'
    },
    {
      key: 'grid',
      label: 'Grid dependency',
      value: hasBattery ? (exporting ? 'Moderate' : 'Lower') : 'Higher',
      note: hasBattery ? 'Battery covers part of the evening' : 'Evenings are met from the grid'
    },
    {
      key: 'cost',
      label: 'Electricity costs',
      value:
        position.monthlyBill === null ? 'To be confirmed' : `≈ £${position.monthlyBill} / month`,
      note: `Grid rate ${position.importRate}p/kWh`
    },
    {
      key: 'fit',
      label: 'FIT or export position',
      value: position.potentialFit ? 'FIT likely' : 'Export payments',
      note: 'Rate to be confirmed'
    }
  ];
}

/* ---------- One household, followed all the way through ----------

   The page explains a service in seven steps, and seven steps told with seven
   unrelated examples read as seven claims. Told about one house they read as
   one story: this is what we learned about it, this is what we connected, this
   is what its day looked like, and this is what we told the people living in
   it. */

/** The example home. Installed 2014, battery added 2022. */
export const HOME = {
  installed: 2014,
  era: '2012-2015',
  panels: 14,
  batteryKwh: 5.2,
  batteryAdded: 2022,
  importRate: 30,
  exportRate: 15,
  monthlyBill: 70
};

const HOME_KW = Math.round(HOME.panels * KW_PER_PANEL[HOME.era] * 10) / 10;

/**
 * The example home, as the system check would read it.
 *
 * Built from the constants above rather than typed as a second set, then run
 * through `summaryOf` for step 02 — so the illustration and a visitor's real
 * result are produced by the same arithmetic.
 */
export const HOME_POSITION: ExistingPosition = {
  era: HOME.era,
  installYear: HOME.installed,
  ageYears: ASSESSMENT_YEAR - HOME.installed,
  panels: HOME.panels,
  systemKw: HOME_KW,
  annualKwh: Math.round((HOME_KW * KWH_PER_KWP) / 100) * 100,
  hasBattery: true,
  batteryKwh: HOME.batteryKwh,
  potentialFit: true,
  monthlyBill: HOME.monthlyBill,
  annualSpend: HOME.monthlyBill * 12,
  importRate: HOME.importRate,
  exportRate: HOME.exportRate,
  standingCharge: DEFAULT_RATES.standingCharge,
  fitRate: null,
  surplusKnown: true,
  exporting: true
};

/**
 * One sunny day at that home, in kWh.
 *
 * Generation splits exactly: 9 used as it was made, 5 into the battery and 4
 * out to the grid is all 18 off the roof. The battery's 5 went back into the
 * house that evening and 2 more had to be bought, so the house used 16 in total
 * and bought one eighth of it.
 */
export const DAY = {
  generated: 18,
  used: 9,
  stored: 5,
  exported: 4,
  imported: 2
};

/** Everything the house used: solar as it was made, the battery, and the grid. */
export const HOME_USE = DAY.used + DAY.stored + DAY.imported;

/** What the day's grid import cost, in pounds. Energy only. */
export const GRID_COST = (DAY.imported * HOME.importRate) / 100;

/** "£0.60" — money as a household reads it. */
export function pounds(value: number): string {
  return `£${value.toFixed(2)}`;
}

/* ---------- Why Guardian Care ---------- */

export type Part = {name: string; says: string; glyph: GlyphName};

/**
 * The parts a solar household already has, and what each one actually tells
 * them. Every line is true, and none of them answers the question the household
 * is really asking: is the whole thing working for me?
 */
export const PARTS: Part[] = [
  {name: 'Solar panels', says: 'Generating, quietly, on the roof', glyph: 'solarRoof'},
  {name: 'An inverter', says: 'A number on a screen in the loft', glyph: 'inverter'},
  {name: 'Battery storage', says: 'Its own app and its own login', glyph: 'storage'},
  {name: 'A generation meter', says: 'Read now and then for FIT', glyph: 'monitoring'},
  {name: 'An electricity supplier', says: 'A bill, weeks after the fact', glyph: 'cost'},
  {name: 'FIT or export payments', says: 'A statement a few times a year', glyph: 'fit'},
  {name: 'Monitoring apps', says: 'Graphs you are left to interpret', glyph: 'portfolio'}
];

/** What joining them up actually buys the household. */
export const ONE_PICTURE = [
  'Every part of your system in one place',
  'Explained in plain English, not graphs',
  'Watched every day in the background',
  'A clear next step when something matters'
];

/* ---------- How the service works ---------- */

export type PhaseKey = 'estimate' | 'connect' | 'measure';

export type StepPhase = {key: PhaseKey; name: string; line: string; tone: StatusTone};

/**
 * The seven steps fall into three phases, and the phases are the argument: two
 * steps work from what the household tells us, one step connects the house, and
 * four run on real readings for as long as the system does.
 */
export const STEP_PHASES: StepPhase[] = [
  {key: 'estimate', name: 'Estimate', line: 'Built from what you tell us', tone: 'amber'},
  {key: 'connect', name: 'Connect', line: 'Estimates become readings', tone: 'green'},
  {key: 'measure', name: 'Understand', line: 'Measured and explained, every day', tone: 'blue'}
];

export type ServiceStep = {
  index: string;
  key: 'understand' | 'summary' | 'connect' | 'track' | 'view' | 'opportunities' | 'next';
  name: string;
  lead: string;
  /** The line a hesitant reader is actually looking for. */
  reassurance: string;
  phase: PhaseKey;
  glyph: GlyphName;
};

export const SERVICE_STEPS: ServiceStep[] = [
  {
    index: '01',
    key: 'understand',
    name: 'We understand your existing system',
    lead: 'We start with what you already know about your installation — when it went in, what was fitted, what has changed since and what you pay for electricity. Together it becomes your Guardian Care system profile.',
    reassurance: 'Nothing technical is asked of you. “I’m not sure” is always an answer.',
    phase: 'estimate',
    glyph: 'capture'
  },
  {
    index: '02',
    key: 'summary',
    name: 'We build your system summary',
    lead: 'From your profile, Guardian Care builds an estimated bird’s-eye view of your current setup — how old it is, what it should generate, what is fitted and what it is costing you.',
    reassurance: 'Useful from day one, before anything is connected.',
    phase: 'estimate',
    glyph: 'insight'
  },
  {
    index: '03',
    key: 'connect',
    name: 'We connect energy monitoring',
    lead: 'Where suitable, we connect a CT clamp or compatible system monitoring. From then on we can see how electricity actually moves between your panels, your home, your battery and the grid.',
    reassurance: 'Nothing about how your system runs changes. It is simply being read.',
    phase: 'connect',
    glyph: 'connect'
  },
  {
    index: '04',
    key: 'track',
    name: 'We track your energy',
    lead: 'Once monitoring is active, estimates give way to actual system behaviour. Guardian Care builds a clear, continuous picture of six things.',
    reassurance: 'Six numbers that, together, explain your whole system.',
    phase: 'measure',
    glyph: 'monitoring'
  },
  {
    index: '05',
    key: 'view',
    name: 'We give you a bird’s-eye view',
    lead: 'Your whole system, simplified into one view. Here is one sunny day at an example home — and at a glance you can see exactly where its electricity went.',
    reassurance: 'Where your electricity is going, in the time it takes to read it.',
    phase: 'measure',
    glyph: 'generation'
  },
  {
    index: '06',
    key: 'opportunities',
    name: 'Guardian Care looks for opportunities',
    lead: 'We do not just display numbers. We look at what the data means for you and flag the patterns worth reviewing. Choose one to see how it would be explained.',
    reassurance: 'Numbers become advice.',
    phase: 'measure',
    glyph: 'goal'
  },
  {
    index: '07',
    key: 'next',
    name: 'We help you understand the next step',
    lead: 'Every Guardian Care insight explains three things: what we identified, why it matters and what we recommend.',
    reassurance: 'No technical graphs to decode. No apps to juggle.',
    phase: 'measure',
    glyph: 'question'
  }
];

/* ---------- Step 01: the profile ---------- */

/** Everything the profile holds, filled in for the example home. */
export const PROFILE_FIELDS: Array<[string, string]> = [
  ['Installation date', String(HOME.installed)],
  ['Number of panels', String(HOME.panels)],
  ['Original or upgraded', `Battery added ${HOME.batteryAdded}`],
  ['Inverter', 'String inverter'],
  ['Battery storage', `${HOME.batteryKwh} kWh`],
  ['Existing monitoring', 'Manufacturer app'],
  ['Generation information', 'FIT meter readings'],
  ['Electricity tariff', 'Standard variable'],
  ['Import rate', `${HOME.importRate}p/kWh`],
  ['Export rate', `${HOME.exportRate}p/kWh`],
  ['FIT information', 'Eligible · to confirm']
];

/* ---------- Step 04: what gets tracked ---------- */

export type Tracked = {
  key: string;
  name: string;
  line: string;
  glyph: GlyphName;
  tone: StatusTone;
};

export const TRACKED: Tracked[] = [
  {
    key: 'generation',
    name: 'Solar generation',
    line: 'How much electricity your system is producing.',
    glyph: 'generation',
    tone: 'amber'
  },
  {
    key: 'used',
    name: 'Free electricity used',
    line: 'How much solar electricity is used directly within your property.',
    glyph: 'consumption',
    tone: 'green'
  },
  {
    key: 'stored',
    name: 'Battery storage',
    line: 'How much energy is being stored for later use.',
    glyph: 'storage',
    tone: 'purple'
  },
  {
    key: 'exported',
    name: 'Grid export',
    line: 'How much surplus electricity is leaving the property.',
    glyph: 'export',
    tone: 'blue'
  },
  {
    key: 'imported',
    name: 'Grid import',
    line: 'How much electricity you are still purchasing.',
    glyph: 'import',
    tone: 'orange'
  },
  {
    key: 'cost',
    name: 'Grid cost',
    line: 'What that imported electricity is costing, based on your tariff.',
    glyph: 'cost',
    tone: 'ink'
  }
];

/* ---------- Steps 06 and 07: opportunities, explained ---------- */

export type Opportunity = {
  key: string;
  name: string;
  /** What the household may be experiencing. */
  seen: string;
  /** The short suggestion, as the card states it. */
  suggest: string;
  tone: StatusTone;
  glyph: GlyphName;
  /** The full explanation step 07 gives for it. */
  identified: string;
  matters: string;
  recommend: string;
};

/**
 * Four patterns, each carrying the three-part explanation that has to arrive
 * with it. The first is the example household's own day, so its figures are the
 * day's figures; the other three are illustrations of the same shape.
 */
export const OPPORTUNITIES: Opportunity[] = [
  {
    key: 'export',
    name: 'High export',
    seen: 'You may be sending significant surplus solar electricity back to the grid.',
    suggest: 'Review battery storage or existing battery capacity.',
    tone: 'blue',
    glyph: 'export',
    identified: `${DAY.exported} kWh of today’s ${DAY.generated} kWh left your home around midday, after your battery had already filled.`,
    matters: `Exported electricity earns around ${HOME.exportRate}p a unit. This evening you bought ${DAY.imported} kWh back at ${HOME.importRate}p — twice the price.`,
    recommend:
      'Review your battery settings and capacity, so more of the midday surplus is kept for the evening.'
  },
  {
    key: 'import',
    name: 'High grid consumption',
    seen: 'You may still be buying more electricity from the grid than expected.',
    suggest: 'Review generation, battery usage or tariff setup.',
    tone: 'orange',
    glyph: 'import',
    identified:
      'Your grid import this week is around a third above your usual level for the time of year, mostly between 6pm and 9pm.',
    matters: `At ${HOME.importRate}p/kWh that is money spent even though your panels are generating normally.`,
    recommend:
      'Review your generation, how your battery is used in the evening, and whether your tariff still suits how you live.'
  },
  {
    key: 'battery',
    name: 'Battery underused',
    seen: 'Your battery may not be storing or supplying as much energy as expected.',
    suggest: 'Review battery settings or energy strategy.',
    tone: 'purple',
    glyph: 'storage',
    identified:
      'On sunny days this week your battery reached only around 60% charge before surplus began leaving the property.',
    matters:
      'Storage you have already paid for is sitting partly empty, while cheap export goes out and full-price electricity comes back in.',
    recommend:
      'Review the battery’s charge settings and your energy strategy. This is usually a settings change, not a hardware fault.'
  },
  {
    key: 'generation',
    name: 'Generation change',
    seen: 'Your system may be generating differently from its expected position.',
    suggest: 'System performance review.',
    tone: 'amber',
    glyph: 'health',
    identified:
      'Over the last three weeks your system generated around 12% less than expected for the sunshine it received.',
    matters:
      'Less generation means less free electricity — and a small fault quietly costs more the longer it goes unnoticed.',
    recommend:
      'A system performance review, covering the inverter, any new shading and the condition of the panels.'
  }
];

/* ---------- Our aim ---------- */

export const AIMS: Array<{line: string; glyph: GlyphName}> = [
  {line: 'Use more of the electricity you generate', glyph: 'consumption'},
  {line: 'Reduce unnecessary grid consumption', glyph: 'import'},
  {line: 'Understand what your battery is doing', glyph: 'storage'},
  {line: 'Understand what you are exporting', glyph: 'export'},
  {line: 'See what electricity is costing you', glyph: 'cost'},
  {line: 'Identify changes in system performance', glyph: 'health'}
];

/** The seventh aim, which is the sum of the other six. */
export const AIM_SUM = 'Take better advantage of the solar system you already own';

/* ---------- After the system check ---------- */

export const NEXT_STEPS: Array<{index: string; name: string; line: string}> = [
  {index: '01', name: 'Your system summary', line: 'Built from your answers. You are here.'},
  {
    index: '02',
    name: 'Connect monitoring',
    line: 'A CT clamp or compatible monitoring, where suitable.'
  },
  {index: '03', name: 'Your Guardian Care login', line: 'Your dashboard, alerts and recommendations.'}
];
