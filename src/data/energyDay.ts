import type {StatusTone} from './command';

/* ============================================================
   One illustrative household's day.

   Every figure on the consumer journey is derived from the two
   hourly series below, so the page cannot contradict itself: the
   tiles, the flow diagram, the chart, the money strip and the
   answers in "Ask Guardian" are all the same day seen from
   different angles. Change a reading here and the whole page moves
   with it.
   ============================================================ */

export type HourReading = {
  /** 0–23, local time. */
  hour: number;
  /** Average kW across the hour, so the value is also the hour's kWh. */
  solar: number;
  usage: number;
};

export const DAY: HourReading[] = [
  {hour: 0, solar: 0, usage: 0.25},
  {hour: 1, solar: 0, usage: 0.2},
  {hour: 2, solar: 0, usage: 0.2},
  {hour: 3, solar: 0, usage: 0.2},
  {hour: 4, solar: 0, usage: 0.2},
  {hour: 5, solar: 0, usage: 0.25},
  {hour: 6, solar: 0.1, usage: 0.45},
  {hour: 7, solar: 0.4, usage: 0.8},
  {hour: 8, solar: 1.0, usage: 0.7},
  {hour: 9, solar: 1.5, usage: 0.45},
  {hour: 10, solar: 2.0, usage: 0.4},
  {hour: 11, solar: 2.3, usage: 0.45},
  {hour: 12, solar: 2.5, usage: 0.55},
  {hour: 13, solar: 2.7, usage: 0.35},
  {hour: 14, solar: 2.5, usage: 0.35},
  {hour: 15, solar: 1.8, usage: 0.4},
  {hour: 16, solar: 1.1, usage: 0.55},
  {hour: 17, solar: 0.4, usage: 0.9},
  {hour: 18, solar: 0.1, usage: 1.3},
  {hour: 19, solar: 0, usage: 1.25},
  {hour: 20, solar: 0, usage: 1.0},
  {hour: 21, solar: 0, usage: 0.8},
  {hour: 22, solar: 0, usage: 0.5},
  {hour: 23, solar: 0, usage: 0.3}
];

/** Chart ceiling. Held constant rather than fitted, so a quiet day looks quiet. */
export const DAY_CEILING_KW = 3;

/**
 * The two hours where generation most exceeds usage. This is the whole
 * recommendation the page makes, so it is stated once and referenced
 * everywhere else rather than retyped into copy.
 */
export const SURPLUS_WINDOW = {from: 13, to: 15};

/** "1pm", "12am" — consumers do not read a 24-hour clock at a glance. */
export function clockLabel(hour: number): string {
  const period = hour < 12 ? 'am' : 'pm';
  const twelve = hour % 12 === 0 ? 12 : hour % 12;
  return `${twelve}${period}`;
}

/* ---------- Where the energy actually went ---------- */

export type FlowNodeKey = 'solar' | 'home' | 'battery' | 'grid';

export type FlowNode = {
  key: FlowNodeKey;
  name: string;
  /** The headline reading for the node, already formatted. */
  value: string;
  unit: string;
  tone: StatusTone;
};

/**
 * Each node carries its own total, never a figure that a flow line beside it
 * already states. The grid's is therefore its net position — 8.1 out against
 * 3.2 in — which is the one thing about the grid a solar owner should know and
 * the one thing neither arrow says on its own.
 */
export const FLOW_NODES: FlowNode[] = [
  {key: 'solar', name: 'Your panels', value: '18.4', unit: 'kWh', tone: 'green'},
  {key: 'home', name: 'Your home', value: '12.8', unit: 'kWh', tone: 'ink'},
  {key: 'battery', name: 'Your battery', value: '71', unit: '%', tone: 'purple'},
  {key: 'grid', name: 'The grid', value: '4.9', unit: 'kWh net', tone: 'blue'}
];

export type EnergyFlow = {
  from: FlowNodeKey;
  to: FlowNodeKey;
  kwh: number;
  /** Sentence-case, written the way a person would say it out loud. */
  label: string;
  tone: StatusTone;
};

/**
 * Solar 18.4 splits 5.2 / 5.1 / 8.1 and the home's 12.8 arrives as
 * 5.2 / 4.4 / 3.2 — the 0.7 kWh the battery keeps is round-trip loss,
 * which is why the two battery figures differ.
 */
export const ENERGY_FLOWS: EnergyFlow[] = [
  {from: 'solar', to: 'home', kwh: 5.2, label: 'Straight into your home', tone: 'green'},
  {from: 'solar', to: 'battery', kwh: 5.1, label: 'Stored in your battery', tone: 'purple'},
  {from: 'solar', to: 'grid', kwh: 8.1, label: 'Sent out to the grid', tone: 'blue'},
  {from: 'battery', to: 'home', kwh: 4.4, label: 'Given back after dark', tone: 'purple'},
  {from: 'grid', to: 'home', kwh: 3.2, label: 'Bought from the grid', tone: 'amber'}
];

/* ---------- What the day was worth ---------- */

/**
 * Australian example: 32c to buy a unit, 5c credited for one exported.
 * Rates are named on the page rather than buried, because the whole figure
 * is only as honest as the tariff behind it.
 */
export const TARIFF = {
  currency: 'A$',
  importRate: 0.32,
  exportRate: 0.05,
  market: 'Australia'
};

export type ValueLine = {
  label: string;
  value: string;
  note: string;
  tone: StatusTone;
};

export const TODAY_VALUE: ValueLine[] = [
  {
    label: 'Electricity you did not buy',
    value: 'A$3.07',
    note: '9.6 kWh covered by your panels and battery, at 32c',
    tone: 'green'
  },
  {
    label: 'Credit for what you exported',
    value: 'A$0.41',
    note: '8.1 kWh sent to the grid, at 5c',
    tone: 'blue'
  },
  {
    label: 'What you actually paid',
    value: 'A$1.02',
    note: '3.2 kWh imported, mostly between 6pm and 9pm',
    tone: 'amber'
  }
];

export const TODAY_HEADLINE = {
  /** Bill without solar, minus the bill with it. */
  worth: 'A$3.48',
  withoutSolar: 'A$4.10',
  actual: 'A$0.61'
};

/** The one change worth making, priced. Deliberately modest and checkable. */
export const SHIFT_OPPORTUNITY = {
  perRun: 'A$0.32',
  perYear: 'about A$50',
  detail:
    'A dishwasher cycle uses roughly 1.2 kWh. Run at 8pm you buy it at 32c; run at 1pm you use electricity you already made and would otherwise have exported for 5c.'
};
