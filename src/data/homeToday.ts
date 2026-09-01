import type {StatusTone} from './command';

export type HomeTile = {
  label: string;
  /**
   * What the number means, in words. The section promises there is nothing to
   * decode, so every reading says what it is rather than trusting a unit and a
   * noun to carry it.
   */
  caption: string;
  value: string;
  unit: string;
  tone: StatusTone;
};

/**
 * The day in four cells rather than five equal ones.
 *
 * Five identical tiles say the five readings matter equally, and they do not:
 * what the roof made is the headline, what the house used is the comparison,
 * and the two grid figures are one fact — you sent out far more than you bought
 * back — that only reads as a fact when they sit together. So the grid gets one
 * cell holding both directions, and the five numbers survive intact.
 */
export const HOME_TODAY: Record<'solar' | 'usage' | 'battery' | 'grid', HomeTile> = {
  solar: {
    label: 'Made by your roof',
    caption: 'Strongest between 11am and 3pm',
    value: '18.4',
    unit: 'kWh',
    tone: 'green'
  },
  usage: {
    label: 'Used by your home',
    caption: '70% of everything your roof made',
    value: '12.8',
    unit: 'kWh',
    tone: 'blue'
  },
  battery: {
    label: 'Battery tonight',
    caption: 'Covered 4.4 kWh after dark',
    value: '71',
    unit: '%',
    tone: 'purple'
  },
  grid: {
    label: 'The grid',
    caption: 'You sent out more than twice what you bought',
    value: '8.1',
    unit: 'kWh',
    tone: 'amber'
  }
};

/** The two halves of the grid cell, drawn against a shared scale. */
export const GRID_FLOWS = [
  {label: 'Sent out', value: 8.1, tone: 'blue'},
  {label: 'Bought', value: 3.2, tone: 'amber'}
] satisfies Array<{label: string; value: number; tone: StatusTone}>;

export type HowItWorksStep = {name: string; description: string; tone: StatusTone};

export const HOW_IT_WORKS: HowItWorksStep[] = [
  {
    name: 'They connect it',
    tone: 'blue',
    description:
      'Your installer records your system and links your monitoring. Nothing for you to configure.'
  },
  {
    name: 'It watches daily',
    tone: 'blue',
    description:
      'Your system is compared against its own normal behaviour, not a generic benchmark.'
  },
  {
    name: 'They contact you',
    tone: 'green',
    description:
      'If something changes, your solar company hears about it first — usually before you notice.'
  }
];
