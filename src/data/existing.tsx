import type {Answers, Step} from '../components/Assessment/types';
import {numberOf} from '../components/Assessment/types';
import type {GlyphName} from '../components/Glyph';
import type {StatusTone} from './command';

/* ============================================================
   "I already have solar."

   The system check, the position it produces, and one illustrative day seen
   from every angle the journey needs. Every figure the page prints comes from
   here, so the page cannot contradict itself: the tiles, the balance chart, the
   flow diagram, the money strip and the opportunity are all the same day.
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

/* ---------- One illustrative day ---------- */

export type HourReading = {hour: number; solar: number; usage: number};

/**
 * A 3.5 kWp system without storage, on a good spring day.
 *
 * The four headline readings the journey quotes — 16.8 generated, 8.7 used in
 * the house, 8.1 exported, 4.2 bought back — are not typed in anywhere. They
 * are summed from these two series, and they reconcile exactly: usage totals
 * 12.9, of which 8.7 is covered hour by hour by the roof and 4.2 is not.
 *
 * The shape is the argument the whole page makes. Generation peaks at one in
 * the afternoon against a household using well under half of it; demand holds
 * on into an evening where there is nothing left to meet it. That gap is why a
 * solar owner still gets a bill, and it is not a thing that can be argued into
 * somebody — it has to be seen.
 */
export const EXISTING_DAY: HourReading[] = [
  {hour: 0, solar: 0, usage: 0.14},
  {hour: 1, solar: 0, usage: 0.12},
  {hour: 2, solar: 0, usage: 0.12},
  {hour: 3, solar: 0, usage: 0.12},
  {hour: 4, solar: 0, usage: 0.12},
  {hour: 5, solar: 0, usage: 0.14},
  {hour: 6, solar: 0.15, usage: 0.25},
  {hour: 7, solar: 0.45, usage: 0.55},
  {hour: 8, solar: 0.95, usage: 0.85},
  {hour: 9, solar: 1.45, usage: 0.7},
  {hour: 10, solar: 1.8, usage: 0.75},
  {hour: 11, solar: 2.2, usage: 0.85},
  {hour: 12, solar: 2.45, usage: 1.0},
  {hour: 13, solar: 2.4, usage: 0.85},
  {hour: 14, solar: 1.95, usage: 0.75},
  {hour: 15, solar: 1.45, usage: 0.85},
  {hour: 16, solar: 0.85, usage: 0.8},
  {hour: 17, solar: 0.45, usage: 0.7},
  {hour: 18, solar: 0.2, usage: 0.85},
  {hour: 19, solar: 0.05, usage: 0.75},
  {hour: 20, solar: 0, usage: 0.62},
  {hour: 21, solar: 0, usage: 0.49},
  {hour: 22, solar: 0, usage: 0.32},
  {hour: 23, solar: 0, usage: 0.21}
];

/** Chart ceiling. Held constant rather than fitted, so a quiet day looks quiet. */
export const DAY_CEILING_KW = 3;

function sum(pick: (row: HourReading) => number): number {
  return Math.round(EXISTING_DAY.reduce((total, row) => total + pick(row), 0) * 10) / 10;
}

/** Every headline figure, derived rather than asserted. */
export const DAY_TOTALS = {
  generated: sum((row) => row.solar),
  used: sum((row) => row.usage),
  direct: sum((row) => Math.min(row.solar, row.usage)),
  exported: sum((row) => Math.max(0, row.solar - row.usage)),
  imported: sum((row) => Math.max(0, row.usage - row.solar)),
  stored: 0
};

/** The widest part of the gap: where generation most exceeds the household. */
export const SURPLUS_WINDOW = {from: 11, to: 15};

/** Where the most electricity is bought back — four hours after sundown. */
export const IMPORT_PEAK_HOUR = 19;

/** "1pm", "12am" — consumers do not read a 24-hour clock at a glance. */
export function clockLabel(hour: number): string {
  const period = hour < 12 ? 'am' : 'pm';
  const twelve = hour % 12 === 0 ? 12 : hour % 12;
  return `${twelve}${period}`;
}

/* ---------- The bird's-eye view ---------- */

export type Reading = {
  key: string;
  glyph: GlyphName;
  label: string;
  value: string;
  unit: string;
  tone: StatusTone;
  note: string;
};

export const TODAY_READINGS: Reading[] = [
  {
    key: 'generated',
    glyph: 'generation',
    label: 'Solar generated',
    value: DAY_TOTALS.generated.toFixed(1),
    unit: 'kWh',
    tone: 'green',
    note: 'What the roof produced'
  },
  {
    key: 'used',
    glyph: 'consumption',
    label: 'Used within your home',
    value: DAY_TOTALS.direct.toFixed(1),
    unit: 'kWh',
    tone: 'ink',
    note: 'Electricity you did not have to buy'
  },
  {
    key: 'stored',
    glyph: 'storage',
    label: 'Battery stored',
    value: '0',
    unit: 'kWh',
    tone: 'purple',
    note: 'No storage on this system'
  },
  {
    key: 'exported',
    glyph: 'export',
    label: 'Exported',
    value: DAY_TOTALS.exported.toFixed(1),
    unit: 'kWh',
    tone: 'blue',
    note: 'Surplus that left the property'
  },
  {
    key: 'imported',
    glyph: 'import',
    label: 'Purchased from grid',
    value: DAY_TOTALS.imported.toFixed(1),
    unit: 'kWh',
    tone: 'amber',
    note: 'Mostly after the sun had gone'
  },
  {
    key: 'cost',
    glyph: 'cost',
    label: 'Estimated grid cost',
    value: `£${((DAY_TOTALS.imported * DEFAULT_RATES.importRate) / 100).toFixed(2)}`,
    unit: `at ${DEFAULT_RATES.importRate}p/kWh`,
    tone: 'orange',
    note: 'Energy only — standing charge is separate'
  }
];

/* ---------- Where the day's electricity went ---------- */

export type FlowNodeKey = 'solar' | 'home' | 'battery' | 'grid';

export type FlowNode = {
  key: FlowNodeKey;
  name: string;
  value: string;
  unit: string;
  tone: StatusTone;
  /** Drawn as an empty slot rather than a reading — the gap is the point. */
  absent?: boolean;
};

export const FLOW_NODES: FlowNode[] = [
  {key: 'solar', name: 'Your panels', value: DAY_TOTALS.generated.toFixed(1), unit: 'kWh', tone: 'green'},
  {key: 'home', name: 'Your home', value: DAY_TOTALS.used.toFixed(1), unit: 'kWh', tone: 'ink'},
  {key: 'battery', name: 'No storage', value: '—', unit: 'not installed', tone: 'purple', absent: true},
  {
    key: 'grid',
    name: 'The grid',
    value: (DAY_TOTALS.exported - DAY_TOTALS.imported).toFixed(1),
    unit: 'kWh net out',
    tone: 'blue'
  }
];

export type EnergyFlow = {
  from: FlowNodeKey;
  to: FlowNodeKey;
  kwh: number;
  label: string;
  tone: StatusTone;
};

export const ENERGY_FLOWS: EnergyFlow[] = [
  {from: 'solar', to: 'home', kwh: DAY_TOTALS.direct, label: 'Straight into your home', tone: 'green'},
  {from: 'solar', to: 'grid', kwh: DAY_TOTALS.exported, label: 'Sent out to the grid', tone: 'blue'},
  {from: 'grid', to: 'home', kwh: DAY_TOTALS.imported, label: 'Bought back after dark', tone: 'amber'}
];

/* ---------- The opportunity, priced ---------- */

/**
 * Deliberately modest. The page could claim the whole 4.2 kWh back, and it
 * would be arithmetic rather than a forecast; assuming roughly half of an
 * evening's import is displaceable by a battery is a claim that survives
 * contact with a real installation.
 */
const REDUCED_IMPORT = 2.0;
const REDUCTION = Math.round((DAY_TOTALS.imported - REDUCED_IMPORT) * 10) / 10;
const SAVED_PER_DAY = (REDUCTION * DEFAULT_RATES.importRate) / 100;

export const OPPORTUNITY = {
  currentImport: DAY_TOTALS.imported,
  reducedImport: REDUCED_IMPORT,
  reduction: REDUCTION,
  perDay: SAVED_PER_DAY,
  perMonth: SAVED_PER_DAY * 30.4,
  perYear: SAVED_PER_DAY * 365
};

/* ---------- What gets tracked once connected ---------- */

export type Tracked = {glyph: GlyphName; name: string; line: string; tone: StatusTone};

export const TRACKED: Tracked[] = [
  {glyph: 'generation', name: 'Solar generation', line: 'How much electricity your system produces.', tone: 'green'},
  {glyph: 'consumption', name: 'Free electricity use', line: 'How much of that generation is used within your property.', tone: 'ink'},
  {glyph: 'import', name: 'Grid import', line: 'How much electricity you are still buying.', tone: 'amber'},
  {glyph: 'export', name: 'Grid export', line: 'How much surplus is leaving the property.', tone: 'blue'},
  {glyph: 'storage', name: 'Battery behaviour', line: 'Where storage monitoring is available, how energy is stored and used.', tone: 'purple'},
  {glyph: 'cost', name: 'Grid cost', line: 'What imported electricity costs on the tariff you provided.', tone: 'orange'}
];

/* ---------- Alerts ---------- */

export type Alert = {
  key: string;
  name: string;
  trigger: string;
  tone: StatusTone;
  identified: string;
  matters: string;
  suggests: string;
};

export const ALERTS: Alert[] = [
  {
    key: 'generation',
    name: 'Generation changes',
    trigger: 'Your system moves away from its expected performance position.',
    tone: 'orange',
    identified: 'Your system generated materially less than its own recent average for this time of year.',
    matters: 'Sustained underperformance costs you twice — less free electricity now, and a fault that gets more expensive the longer it stands.',
    suggests: 'Review inverter reporting, shading that has grown in since installation, and panel condition.'
  },
  {
    key: 'import',
    name: 'Grid consumption increases',
    trigger: 'You are buying more electricity than the established baseline.',
    tone: 'amber',
    identified: 'Your grid import has risen above the baseline Guardian Care established for your property.',
    matters: 'At your import rate this is a direct cost, and it may have nothing to do with your solar system at all.',
    suggests: 'Check whether new load has arrived in the property, and whether any of it could be moved into daylight hours.'
  },
  {
    key: 'export',
    name: 'Export becomes unusually high',
    trigger: 'More of your solar electricity is leaving the property.',
    tone: 'blue',
    identified: 'Your system exported a higher amount of solar electricity than its recent average.',
    matters: 'You are also purchasing electricity from the grid outside solar-generation periods, at several times what the exported units earned.',
    suggests: 'Review whether more of your available solar generation could be retained or used within the property.'
  },
  {
    key: 'battery',
    name: 'Battery utilisation changes',
    trigger: 'Your available storage may not be operating as effectively as expected.',
    tone: 'purple',
    identified: 'Your battery is reaching a lower state of charge than its established pattern.',
    matters: 'Storage that is not filling is storage you paid for and are not using.',
    suggests: 'Review charge windows against your tariff periods before assuming a hardware fault — most cases are configuration.'
  },
  {
    key: 'monitoring',
    name: 'Monitoring is interrupted',
    trigger: 'Guardian Care loses visibility of the system.',
    tone: 'red',
    identified: 'Readings from your property have stopped arriving.',
    matters: 'Without data, nothing else on this page can be trusted — and a silent monitor looks identical to a healthy system.',
    suggests: 'Confirm the monitoring connection before drawing any conclusion about generation.'
  }
];

/* ---------- What the customer ends up seeing ---------- */

export type SummaryGroup = {name: string; glyph: GlyphName; rows: string[]; tone: StatusTone};

export const SUMMARY: SummaryGroup[] = [
  {
    name: 'System',
    glyph: 'existing',
    tone: 'green',
    rows: ['System age', 'Panel count', 'Solar capacity', 'Inverter', 'Battery', 'Monitoring']
  },
  {
    name: 'Performance',
    glyph: 'health',
    tone: 'orange',
    rows: ['Estimated generation', 'Actual generation', 'Difference', 'System status']
  },
  {
    name: 'Energy',
    glyph: 'generation',
    tone: 'blue',
    rows: ['Generated', 'Used free', 'Stored', 'Exported', 'Grid import']
  },
  {
    name: 'Money',
    glyph: 'cost',
    tone: 'amber',
    rows: [
      'Grid rate',
      'Estimated grid cost',
      'FIT income',
      'Export income',
      'Estimated electricity cost avoided'
    ]
  },
  {
    name: 'Guardian Care intelligence',
    glyph: 'insight',
    tone: 'purple',
    rows: ['Current status', 'Opportunity identified', 'Estimated impact', 'Recommended next action']
  }
];

/* ---------- The journey ---------- */

export type JourneyStep = {index: string; name: string; line: string};

export const CUSTOMER_JOURNEY: JourneyStep[] = [
  {index: '01', name: 'Tell us about your system', line: 'A simple interactive system check.'},
  {index: '02', name: 'Receive your initial estimate', line: 'Age, potential generation and current energy position.'},
  {index: '03', name: 'Connect monitoring', line: 'Move from estimates towards actual system data.'},
  {index: '04', name: 'See your bird’s-eye view', line: 'Generation, usage, export and grid dependency in one place.'},
  {index: '05', name: 'Receive intelligence', line: 'Guardian Care identifies meaningful patterns and opportunities.'},
  {index: '06', name: 'Take action', line: 'Decide about your solar, battery, tariff or system requirements.'},
  {index: '07', name: 'Stay connected', line: 'Guardian Care keeps the intelligence around your system current.'}
];

/* ---------- Before and after ---------- */

export const BEFORE = [
  'Your solar system operates.',
  'You may occasionally check the inverter.',
  'You receive an electricity bill.',
  'You may receive FIT payments.',
  'You may have battery information.'
];

export const AFTER = [
  'We know what you have.',
  'We establish what it should be capable of producing.',
  'We monitor what is actually happening.',
  'We understand what you pay the grid.',
  'We identify where generated electricity is going.',
  'We calculate relevant energy opportunities.',
  'We explain what the numbers mean.',
  'We suggest what should happen next.'
];

/** The parts a solar household already has, each reporting to nobody. */
export const SCATTERED = [
  {name: 'Solar panels', line: 'Generating electricity'},
  {name: 'An inverter', line: 'Displaying generation'},
  {name: 'A battery', line: 'With a separate monitoring app'},
  {name: 'An electricity supplier', line: 'Showing grid usage'},
  {name: 'A FIT provider', line: 'Recording generation payments'}
];
