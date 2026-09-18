import type {Answers, Step} from '../components/Assessment/types';
import {numberOf} from '../components/Assessment/types';
import type {GlyphName} from '../components/Glyph';
import type {StatusTone} from './command';

/* ============================================================
   "I'm looking for solar, battery or energy storage."

   This journey deliberately does not start with panels. It starts with what
   the property already pays the grid, because that — not a system size — is
   the number solar has to change. Everything below is either a question about
   that position or a consequence of it.
   ============================================================ */

/* ---------- The energy assessment ---------- */

export const PLAN_STEPS: Step[] = [
  {
    key: 'bill',
    kind: 'choice',
    glyph: 'cost',
    title: 'What is your average monthly electricity bill?',
    options: [
      {value: 'under-75', label: 'Under £75'},
      {value: '75-125', label: '£75–£125'},
      {value: '125-175', label: '£125–£175'},
      {value: '175-250', label: '£175–£250'},
      {value: '250-plus', label: '£250+'},
      {value: 'exact', label: 'Enter exact amount', input: {suffix: '/month', placeholder: '165'}}
    ],
    why: {
      heading: 'Why we ask',
      body: 'Your monthly bill is the starting point for understanding your current electricity cost. From it, Guardian Care builds an estimated annual grid-cost position — the figure everything else on this page is measured against.'
    }
  },
  {
    key: 'rates',
    kind: 'fields',
    glyph: 'tariff',
    title: 'What do you pay for electricity?',
    lead: 'Anything you leave blank uses a national average until the real figure arrives.',
    fields: [
      {key: 'importRate', label: 'Import rate', suffix: 'p/kWh', placeholder: '29'},
      {key: 'offPeakRate', label: 'Off-peak rate', note: 'if applicable', suffix: 'p/kWh', placeholder: '—'},
      {key: 'standingCharge', label: 'Standing charge', suffix: 'p/day', placeholder: '58'}
    ],
    why: {
      heading: 'Why this matters',
      body: (
        <>
          Solar does not reduce a bill simply because panels are installed. The opportunity comes
          from reducing how much electricity you need to <b>purchase at your normal grid rate</b>.
          Guardian Care uses your actual tariff so the assessment is about your property rather than
          about an average one.
        </>
      )
    }
  },
  {
    key: 'goal',
    kind: 'choice',
    glyph: 'goal',
    title: 'What are you looking to achieve?',
    lead: 'Choose the option that best describes you. It shapes the rest of the journey.',
    options: [
      {value: 'bill', label: 'Reduce my electricity bill'},
      {value: 'renewable', label: 'Use more renewable electricity'},
      {value: 'independent', label: 'Become less dependent on the grid'},
      {value: 'battery', label: 'Add battery storage'},
      {value: 'ev', label: 'Prepare for an electric vehicle'},
      {value: 'worth-it', label: 'Understand whether solar is worth it'},
      {value: 'guide', label: 'I’m not sure — guide me'}
    ],
    why: {
      heading: 'Why we ask',
      body: 'The same property can be assessed for different outcomes. Somebody reducing a bill and somebody preparing for an electric vehicle need different system shapes, and Guardian Care would rather ask than assume.'
    }
  },
  {
    key: 'equipment',
    kind: 'multi',
    glyph: 'property',
    title: 'Do you have any renewable energy equipment already?',
    lead: 'Choose everything that applies.',
    options: [
      {value: 'none', label: 'Nothing installed'},
      {value: 'battery', label: 'Battery only'},
      {value: 'ev-charger', label: 'EV charger'},
      {value: 'heat-pump', label: 'Heat pump'},
      {value: 'solar-elsewhere', label: 'Existing solar elsewhere on the property'},
      {value: 'other', label: 'Other'}
    ],
    why: {
      heading: 'Why we ask',
      body: 'This tells Guardian Care whether a new system has to work alongside equipment that is already there. A heat pump or an EV charger changes both the size of the opportunity and the shape of the day it has to cover.'
    }
  },
  {
    key: 'property',
    kind: 'choice',
    glyph: 'property',
    title: 'What type of property is it?',
    options: [
      {value: 'detached', label: 'Detached'},
      {value: 'semi', label: 'Semi-detached'},
      {value: 'terraced', label: 'Terraced'},
      {value: 'bungalow', label: 'Bungalow'},
      {value: 'other', label: 'Other'}
    ],
    why: {
      heading: 'Why we ask',
      body: 'Property type is a first indication of available roof area and typical household consumption. It is not the final word — the usable capacity is confirmed during assessment — but it keeps the initial estimate realistic.'
    }
  },
  {
    key: 'roof',
    kind: 'choice',
    glyph: 'generation',
    title: 'Roughly how many panels could your roof support?',
    options: [
      {value: 'under-8', label: 'Under 8'},
      {value: '8-12', label: '8–12'},
      {value: '13-16', label: '13–16'},
      {value: '16-plus', label: '16+'},
      {value: 'unknown', label: 'I don’t know'}
    ],
    why: {
      heading: 'Not sure? That is fine.',
      body: 'Guardian Care can begin from your energy position alone and size the system to it. The final solar capacity is confirmed during the property assessment, when the roof is actually measured.'
    }
  },
  {
    key: 'storage',
    kind: 'choice',
    glyph: 'storage',
    title: 'Do you want battery storage?',
    options: [
      {value: 'yes', label: 'Yes'},
      {value: 'no', label: 'No'},
      {value: 'maybe', label: 'Maybe — explain it'}
    ],
    why: {
      heading: 'What storage actually does',
      body: (
        <>
          Battery storage lets suitable surplus solar generated during the day be retained and used
          later, when production has dropped away. That matters most where the property keeps using
          electricity into the evening — which is <b>most</b> properties.
        </>
      )
    }
  }
];

/* ---------- Reading the answers ---------- */

const MONTHLY_BILL: Record<string, number> = {
  'under-75': 60,
  '75-125': 100,
  '125-175': 150,
  '175-250': 210,
  '250-plus': 300
};

const ROOF_PANELS: Record<string, number> = {
  'under-8': 7,
  '8-12': 10,
  '13-16': 14,
  '16-plus': 18
};

/** A current-generation module, in kW. */
const KW_PER_PANEL = 0.44;

/** UK yield per installed kWp for a new, well-sited array. */
const KWH_PER_KWP = 900;

/**
 * How much of what a system generates the household actually uses itself.
 *
 * These are the two numbers the entire saving rests on, so they are stated
 * plainly and kept conservative. Published UK self-consumption for solar
 * without storage sits around 30–50%; with a correctly sized battery it rises
 * to roughly 60–80%. Guardian Care estimates at the lower-middle of both bands,
 * because a figure the installation then beats is a better product than one it
 * has to apologise for.
 */
export const SELF_USE = {without: 0.42, with: 0.68};

export const DEFAULT_RATES = {importRate: 29, exportRate: 15, standingCharge: 58};

export type PlanPosition = {
  monthlyBill: number | null;
  annualSpend: number | null;
  importRate: number;
  standingCharge: number;
  offPeakRate: number | null;
  /** The part of the bill that is standing charge, which solar cannot touch. */
  annualStanding: number;
  /** The part solar can influence. */
  annualEnergy: number | null;
  annualKwh: number | null;
  goal: string | null;
  wantsBattery: boolean;
  systemKw: number | null;
  panels: number | null;
  annualGeneration: number | null;
  directKwh: number | null;
  directValue: number | null;
  batteryExtraKwh: number | null;
  batteryExtraValue: number | null;
  combinedValue: number | null;
  /** Recommended storage, in kWh, sized to the surplus rather than to a menu. */
  batteryKwh: number | null;
  equipment: string[];
};

export const GOAL_LABEL: Record<string, string> = {
  bill: 'Reduce electricity bills',
  renewable: 'Use more renewable electricity',
  independent: 'Less dependent on the grid',
  battery: 'Add battery storage',
  ev: 'Prepare for an electric vehicle',
  'worth-it': 'Understand whether solar is worth it',
  guide: 'Guide me'
};

export function readPlan(answers: Answers): PlanPosition {
  const billChoice = answers.choice.bill ?? null;
  const monthlyBill =
    billChoice === 'exact'
      ? (numberOf(answers, 'bill', 0) || null)
      : billChoice
        ? MONTHLY_BILL[billChoice]
        : null;

  const importRate = numberOf(answers, 'importRate', DEFAULT_RATES.importRate);
  const standingCharge = numberOf(answers, 'standingCharge', DEFAULT_RATES.standingCharge);
  const offPeakRaw = numberOf(answers, 'offPeakRate', 0);

  const annualSpend = monthlyBill ? Math.round(monthlyBill * 12) : null;
  const annualStanding = Math.round((standingCharge * 365) / 100);
  /* Standing charge first, because dividing a whole bill by a unit rate
     silently credits solar with a cost it can never remove. */
  const annualEnergy = annualSpend ? Math.max(0, annualSpend - annualStanding) : null;
  const annualKwh = annualEnergy ? Math.round((annualEnergy / importRate) * 100) : null;

  const roofChoice = answers.choice.roof ?? null;
  const roofPanels = roofChoice && roofChoice !== 'unknown' ? ROOF_PANELS[roofChoice] : null;

  /* With no roof answer, the system is sized to the consumption it is meant to
     offset rather than left blank — capped at a capacity a domestic roof can
     plausibly carry. */
  const impliedKw = annualKwh ? Math.min(6.5, Math.round((annualKwh / KWH_PER_KWP) * 10) / 10) : null;
  const systemKw = roofPanels
    ? Math.round(roofPanels * KW_PER_PANEL * 10) / 10
    : impliedKw;
  const panels = roofPanels ?? (systemKw ? Math.round(systemKw / KW_PER_PANEL) : null);

  const annualGeneration = systemKw ? Math.round((systemKw * KWH_PER_KWP) / 50) * 50 : null;

  /* Self-consumption cannot exceed what the property actually uses — a large
     array on a small household is capped by the house, not by the roof. */
  const directKwh =
    annualGeneration && annualKwh
      ? Math.round(Math.min(annualGeneration * SELF_USE.without, annualKwh))
      : null;
  const withBatteryKwh =
    annualGeneration && annualKwh
      ? Math.round(Math.min(annualGeneration * SELF_USE.with, annualKwh))
      : null;

  const directValue = directKwh ? (directKwh * importRate) / 100 : null;
  const batteryExtraKwh =
    withBatteryKwh && directKwh ? Math.max(0, withBatteryKwh - directKwh) : null;
  const batteryExtraValue = batteryExtraKwh ? (batteryExtraKwh * importRate) / 100 : null;

  const wantsBattery = answers.choice.storage === 'yes' || answers.choice.goal === 'battery';

  /* Storage sized to a day's worth of the surplus it would be catching, rounded
     to something a manufacturer actually sells. */
  const batteryKwh = batteryExtraKwh
    ? Math.max(5, Math.min(15, Math.round((batteryExtraKwh / 365) * 2.2)))
    : null;

  return {
    monthlyBill,
    annualSpend,
    importRate,
    standingCharge,
    offPeakRate: offPeakRaw > 0 ? offPeakRaw : null,
    annualStanding,
    annualEnergy,
    annualKwh,
    goal: answers.choice.goal ?? null,
    wantsBattery,
    systemKw,
    panels,
    annualGeneration,
    directKwh,
    directValue,
    batteryExtraKwh,
    batteryExtraValue,
    combinedValue:
      directValue !== null ? directValue + (batteryExtraValue ?? 0) : null,
    batteryKwh,
    equipment: answers.multi.equipment ?? []
  };
}

/* ---------- What solar actually changes ---------- */

/**
 * The teaching example, at one slice of one day. Deliberately small numbers:
 * the mechanism is what has to land, and an annual figure hides it.
 */
export const SWAP = {
  usage: 12,
  solarSupplies: 7,
  gridWithSolar: 5,
  rate: DEFAULT_RATES.importRate
};

/** Ten kilowatt-hours, and where they can go. */
export const DIRECT_USE_EXAMPLE = {generated: 10, usedDirectly: 6, surplus: 4};

/** The same day with and without a battery — the doc's central comparison. */
export const STORAGE_COMPARISON = [
  {
    key: 'without',
    name: 'Solar without battery',
    tone: 'amber' as StatusTone,
    rows: [
      {label: 'Solar generated', value: 15},
      {label: 'Used directly', value: 8},
      {label: 'Exported', value: 7},
      {label: 'Later grid import', value: 5}
    ],
    line: 'Surplus is produced during the day, but some of it leaves the property before you need it in the evening.'
  },
  {
    key: 'with',
    name: 'Solar with battery',
    tone: 'green' as StatusTone,
    rows: [
      {label: 'Solar generated', value: 15},
      {label: 'Used directly', value: 8},
      {label: 'Stored', value: 5},
      {label: 'Exported', value: 2},
      {label: 'Later grid import', value: 1}
    ],
    line: 'The same generation, held back for the hours the property actually uses it. An estimated energy-flow opportunity, not a guaranteed saving.'
  }
];

/* ---------- What the customer would be recommended ---------- */

export type Recommendation = {
  key: string;
  glyph: GlyphName;
  name: string;
  tone: StatusTone;
  /** Filled from the visitor's own position where one exists. */
  value: (position: PlanPosition) => string;
  why: string;
};

export const RECOMMENDATIONS: Recommendation[] = [
  {
    key: 'solar',
    glyph: 'generation',
    name: 'Solar',
    tone: 'green',
    value: (position) =>
      position.systemKw ? `${position.systemKw} kWp for assessment` : 'Sized during assessment',
    why: 'Your current grid consumption and electricity cost suggest a meaningful proportion of your own electricity could be generated at the property.'
  },
  {
    key: 'battery',
    glyph: 'storage',
    name: 'Battery storage',
    tone: 'purple',
    value: (position) =>
      position.batteryKwh ? `${position.batteryKwh} kWh for review` : 'Recommended for review',
    why: 'Storage may allow more daytime generation to be retained for use later, instead of purchasing as much electricity from the grid in the evening.'
  },
  {
    key: 'monitoring',
    glyph: 'monitoring',
    name: 'Energy monitoring',
    tone: 'blue',
    value: () => 'Recommended',
    why: 'Monitoring is what lets Guardian Care tell generated, used, stored, exported and purchased apart after the system is installed.'
  },
  {
    key: 'intelligence',
    glyph: 'insight',
    name: 'Guardian Care intelligence',
    tone: 'amber',
    value: () => 'Recommended',
    why: 'A system should not simply be installed and forgotten. Guardian Care keeps analysing the energy position so you can see whether it is being used effectively over time.'
  }
];

/* ---------- Ask Guardian Care ---------- */

export type Question = {q: string; a: string};

export const QUESTIONS: Question[] = [
  {
    q: 'How much could solar reduce my electricity bill?',
    a: 'Guardian Care answers this from your own figures rather than a brochure: your estimated annual consumption, the generation the proposed system would produce, how much of it you could realistically use yourself, and the rate you currently pay for every unit that displaces.'
  },
  {
    q: 'How many panels might I need?',
    a: 'An indicative range now, from your energy position and what your roof can carry. The final capacity depends on the property assessment — roof pitch, orientation, shading and structure are measured before anything is specified.'
  },
  {
    q: 'Do I need a battery?',
    a: 'It depends on the relationship between your surplus and your evening usage. If you generate well beyond what the house uses at midday and then buy electricity back after dark, storage has something to do. If your consumption already sits in daylight hours, it has less.'
  },
  {
    q: 'How much battery storage could I need?',
    a: 'Enough to absorb a typical day’s surplus without sitting half-empty. Guardian Care gives an indicative range from the proposed system size and your estimated evening import, then confirms it during assessment.'
  },
  {
    q: 'What happens when I generate more than I use?',
    a: 'It goes to the nearest place that will take it: first your home, then a battery if you have one, then the grid. Anything exported earns the export rate, which is normally well below what the same unit costs to buy back.'
  },
  {
    q: 'Will I still need electricity from the grid?',
    a: 'Almost certainly. Most grid-connected homes still import at some points in the year, and complete independence is not the objective — reducing unnecessary dependence is.'
  },
  {
    q: 'What happens after installation?',
    a: 'Guardian Care connects monitoring and keeps building the picture: what the system produces, how much you use directly, what the battery stores, what you export, what you still purchase and what that grid electricity costs.'
  }
];

/* ---------- From estimate to installation ---------- */

export const INSTALL_STEPS = [
  {index: '01', name: 'Energy assessment', line: 'Confirm property and electricity information.'},
  {index: '02', name: 'Solar & storage design', line: 'Create the appropriate system specification.'},
  {index: '03', name: 'Installation', line: 'Install and commission the selected equipment.'},
  {index: '04', name: 'Connect monitoring', line: 'Connect compatible system and energy monitoring.'},
  {index: '05', name: 'Activate Guardian Care', line: 'Create the customer’s energy intelligence profile.'}
];

/* ---------- The dashboard that arrives afterwards ---------- */

export type DashReading = {
  key: string;
  glyph: GlyphName;
  label: string;
  value: string;
  unit: string;
  tone: StatusTone;
};

/**
 * One day on a system with storage. Generated splits exactly across used,
 * stored and exported — 9.6 + 5.1 + 3.7 — and the cost is the import priced at
 * the same rate the rest of the journey quotes.
 */
export const DASHBOARD: DashReading[] = [
  {key: 'generated', glyph: 'generation', label: 'Generated', value: '18.4', unit: 'kWh', tone: 'green'},
  {key: 'free', glyph: 'consumption', label: 'Used free', value: '9.6', unit: 'kWh', tone: 'ink'},
  {key: 'stored', glyph: 'storage', label: 'Stored', value: '5.1', unit: 'kWh', tone: 'purple'},
  {key: 'exported', glyph: 'export', label: 'Exported', value: '3.7', unit: 'kWh', tone: 'blue'},
  {key: 'import', glyph: 'import', label: 'Grid import', value: '1.8', unit: 'kWh', tone: 'amber'},
  {key: 'cost', glyph: 'cost', label: 'Grid energy cost', value: '£0.52', unit: 'at 29p/kWh', tone: 'orange'}
];

export const CONTINUES = [
  {name: 'High grid import', line: 'Could more solar or stored energy be used?', tone: 'amber' as StatusTone},
  {name: 'High export', line: 'Could additional surplus be retained?', tone: 'blue' as StatusTone},
  {name: 'Battery underutilisation', line: 'Are the current battery settings appropriate?', tone: 'purple' as StatusTone},
  {name: 'Tariff opportunity', line: 'Could lower-cost periods work better with the battery?', tone: 'green' as StatusTone},
  {name: 'System performance change', line: 'Is generation moving away from the expected position?', tone: 'orange' as StatusTone}
];

/* ---------- The ladder ---------- */

export const STAGES = [
  {
    name: 'Before solar',
    line: 'You depend heavily on electricity purchased from the grid. Your bill tells you what you owe.',
    tone: 'amber' as StatusTone
  },
  {
    name: 'With solar',
    line: 'You begin generating electricity at the property. Your grid dependency may reduce.',
    tone: 'green' as StatusTone
  },
  {
    name: 'With solar + battery',
    line: 'You may be able to retain more of the electricity you generate for later use.',
    tone: 'purple' as StatusTone
  },
  {
    name: 'With Guardian Care',
    line: 'You understand what is happening, what it is costing, what you are saving, what you are exporting, what could be improved and what should happen next.',
    tone: 'blue' as StatusTone
  }
];

/** The point of the whole journey, as a sequence rather than a paragraph. */
export const GOAL_STEPS = [
  'Generate more of your own electricity.',
  'Use more of it yourself.',
  'Store suitable surplus electricity.',
  'Reduce unnecessary grid purchases.',
  'Understand what your energy system is doing.',
  'Continue improving it after installation.'
];
