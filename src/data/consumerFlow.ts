import type {StatusTone} from './command';

/* ============================================================
   The adaptive consumer journey.

   Every question, branch and generated block lives here rather than in the
   components, because the whole page is one decision tree and a tree scattered
   across nine files cannot be read or changed. A component asks this module
   what to show; it never decides for itself.
   ============================================================ */

/* ---------- What they have ---------- */

export type SystemKey = 'solar' | 'solar-battery' | 'older' | 'unsure';

export type SystemOption = {
  key: SystemKey;
  label: string;
  /** How it reads on a card, where the sentence around it is gone. */
  short: string;
  /** The line the hero switches to once this is chosen. */
  lead: string;
  cta: string;
};

export const SYSTEMS: SystemOption[] = [
  {
    key: 'solar',
    label: 'I have solar only',
    short: 'Solar only',
    lead: 'Let’s look at how much of what your roof makes actually stays in your home.',
    cta: 'Check my solar and usage'
  },
  {
    key: 'solar-battery',
    label: 'I have solar and battery storage',
    short: 'Solar + battery',
    lead: 'Let’s check whether your battery is helping you use more of your own electricity.',
    cta: 'Check my battery and energy usage'
  },
  {
    key: 'older',
    label: 'I have an older solar system',
    short: 'Older system',
    lead: 'Let’s understand how your system is performing today and whether anything needs reviewing.',
    cta: 'Review my existing system'
  },
  {
    key: 'unsure',
    label: 'I am not sure what I have',
    short: 'Not sure',
    lead: 'That is fine — most people are not told. Let’s work out what you have and what it is doing.',
    cta: 'Help me understand my system'
  }
];

/* ---------- What they want solved ---------- */

export type ConcernKey = 'bill' | 'export' | 'battery' | 'performance' | 'installer' | 'visibility';

export type ConcernRoute = {
  key: ConcernKey;
  label: string;
  /** The generated explanation this concern opens. */
  heading: string;
  body: string;
  /** What Guardian Care would look at. Rendered as a list. */
  checks: string[];
  /** The CTA changes with intent — see the three-step ladder in `cta`. */
  cta: [string, string, string];
};

export const CONCERNS: ConcernRoute[] = [
  {
    key: 'bill',
    label: 'Why is my bill still high?',
    heading: 'Why you may still be buying from the grid',
    body: 'Your roof produces at midday. Your home uses most of its electricity in the evening. That gap is what you are paying for.',
    checks: [
      'When you import electricity',
      'When your solar produces most',
      'Whether your battery covers evening demand',
      'Whether tariff timing could be improved',
      'Whether your household usage has increased'
    ],
    cta: ['Analyse my grid usage', 'Review my energy profile', 'Book my energy assessment']
  },
  {
    key: 'export',
    label: 'Am I giving away too much?',
    heading: 'Are you sending away energy you could use later?',
    body: 'You are paid a little for what you send out, and charged a lot for what you buy back. It is worth knowing the difference.',
    checks: [
      'How much you export, and when',
      'How much you buy back afterwards',
      'What your recorded export rate is',
      'Whether storage would keep more of it on site'
    ],
    cta: ['Check my export pattern', 'Review my energy profile', 'Book my energy assessment']
  },
  {
    key: 'battery',
    label: 'Is my battery actually helping?',
    heading: 'Is your battery working around your home?',
    body: 'A battery only helps if it charges and empties around the hours you are actually home.',
    checks: [
      'When your battery charges',
      'When it discharges',
      'How much it stores',
      'Whether it empties too early',
      'Whether it charges from solar or grid',
      'Whether timing matches your tariff'
    ],
    cta: ['Check my battery usage', 'See battery opportunities', 'Book my battery and energy review']
  },
  {
    key: 'performance',
    label: 'Is my solar still working?',
    heading: 'Is your system still doing what it did?',
    body: 'Panels rarely fail outright. They make a little less each month, on a roof nobody looks at.',
    checks: [
      'Generation against your own established range',
      'Whether any string is underperforming',
      'Inverter reporting and age',
      'Shading that has developed since installation'
    ],
    cta: ['Check my system', 'Generate my system health summary', 'Book my existing system assessment']
  },
  {
    key: 'installer',
    label: 'My installer has disappeared',
    heading: 'Nobody is watching your system',
    body: 'When the installer goes, the monitoring usually goes too. Nobody is left watching.',
    checks: [
      'What monitoring your system still has',
      'What documentation and warranty position exists',
      'Whether the system is still reporting at all',
      'What would need reconnecting'
    ],
    cta: ['Check my system', 'Generate my system health summary', 'Book my existing system assessment']
  },
  {
    key: 'visibility',
    label: 'I just want to understand it',
    heading: 'What your system is actually doing',
    body: 'You were given an app, not an explanation. Guardian Care reads the same data and says what it means.',
    checks: [
      'What you generate, use, store and export',
      'What still comes from the grid, and when',
      'What is normal for your system specifically',
      'What is worth acting on and what is not'
    ],
    cta: ['Help me understand my system', 'Build my energy profile', 'Speak to Guardian Care']
  }
];

/* ---------- The assessment ---------- */

export type FieldKey =
  | 'battery'
  | 'installYear'
  | 'inverter'
  | 'annualUsage'
  | 'annualGeneration'
  | 'smartMeter'
  | 'supplier'
  | 'importTariff'
  | 'exportScheme'
  | 'priority';

export type Question = {
  key: FieldKey;
  step: number;
  label: string;
  options: string[];
};

export const STEPS = [
  {title: 'Your system', blurb: 'What is on the roof, and how long it has been there.'},
  {title: 'Your energy', blurb: 'Roughly what the house uses and what the roof makes.'},
  {title: 'Your tariff', blurb: 'What you pay to buy, and what you are paid to export.'},
  {title: 'Your concern', blurb: 'Where Guardian Care should look first.'}
];

/** Every answer is a choice, including "not sure" — nobody is asked to look up a bill. */
export const QUESTIONS: Question[] = [
  {key: 'battery', step: 0, label: 'Do you have a battery?', options: ['Yes', 'No', 'Not sure']},
  {
    key: 'installYear',
    step: 0,
    label: 'Roughly when was it installed?',
    options: ['Within 3 years', '3–8 years ago', '8–15 years ago', 'Over 15 years ago', 'Not sure']
  },
  {
    key: 'inverter',
    step: 0,
    label: 'Do you know your inverter brand?',
    options: ['Yes, I know it', 'I could find it', 'No']
  },
  {
    key: 'annualUsage',
    step: 1,
    label: 'Roughly what does your home use a year?',
    options: ['Under 2,500 kWh', '2,500–4,000 kWh', '4,000–6,000 kWh', 'Over 6,000 kWh', 'Not sure']
  },
  {
    key: 'annualGeneration',
    step: 1,
    label: 'Do you know what your system generates a year?',
    options: ['Yes, roughly', 'I can see it in an app', 'No idea']
  },
  {
    key: 'smartMeter',
    step: 1,
    label: 'Do you have a smart meter?',
    options: ['Yes', 'No', 'Not sure']
  },
  {
    key: 'supplier',
    step: 2,
    label: 'Do you know who supplies your electricity?',
    options: ['Yes', 'No']
  },
  {
    key: 'importTariff',
    step: 2,
    label: 'Do you know what you pay per unit?',
    options: ['Yes', 'Roughly', 'No']
  },
  {
    key: 'exportScheme',
    step: 2,
    label: 'How are you paid for what you export?',
    options: ['FIT', 'SEG', 'Deemed export', 'Not sure']
  },
  {
    key: 'priority',
    step: 3,
    label: 'What should Guardian Care help with most?',
    options: [
      'Reduce grid usage',
      'Improve battery use',
      'Understand export',
      'Check solar performance',
      'Monitor system health',
      'Understand everything'
    ]
  }
];

/* ---------- What a day of Guardian Care sounds like ---------- */

export type AdviceMoment = {time: string; reading: string; action: string; tone: StatusTone};

export const DAILY_ADVICE: AdviceMoment[] = [
  {
    time: '11:30',
    reading: 'Solar generation is strong.',
    action: 'Use higher-energy appliances now where practical.',
    tone: 'green'
  },
  {
    time: '16:45',
    reading: 'Battery charge is lower than your recent average.',
    action: 'Review whether your evening reserve is sufficient.',
    tone: 'amber'
  },
  {
    time: '19:10',
    reading: 'Grid import has increased.',
    action: 'Check which household appliances are running.',
    tone: 'orange'
  },
  {
    time: '21:00',
    reading: 'System operating normally.',
    action: 'No action required.',
    tone: 'blue'
  }
];

/* ---------- Tariff explainers, shown only when they apply ---------- */

export const TARIFF_NOTES: Record<string, {heading: string; body: string; cta: string}> = {
  FIT: {
    heading: 'Your feed-in tariff',
    body: 'Guardian Care can help record your generation and export information so you can better understand how your existing tariff relates to your system performance.',
    cta: 'Review my FIT position'
  },
  SEG: {
    heading: 'Your export tariff',
    body: 'Guardian Care can help you understand what energy is exported and what your recorded export rate means for your home.',
    cta: 'Review my export'
  },
  'Deemed export': {
    heading: 'Deemed export',
    body: 'You are paid on an assumed share of what you generate rather than what you actually send out. Guardian Care can help you see what you are really exporting.',
    cta: 'Compare deemed against actual'
  },
  'Not sure': {
    heading: 'Not sure what tariff you have?',
    body: 'That is fine. Guardian Care can help you identify what information you need to locate and record.',
    cta: 'Help me understand my tariff'
  }
};
