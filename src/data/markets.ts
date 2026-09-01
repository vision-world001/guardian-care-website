export type Market = {
  name: string;
  summary: string;
  fields: Array<[string, string]>;
};

export const MARKETS: Market[] = [
  {
    name: 'Australia',
    summary: 'State feed-in tariffs',
    fields: [
      ['Currency', 'AUD (A$)'],
      ['Export scheme', 'State FiT, retailer-set'],
      ['Units', 'kWh'],
      ['Typical driver', 'High export, storage retrofit']
    ]
  },
  {
    name: 'Thailand',
    summary: 'VSPP export',
    fields: [
      ['Currency', 'THB (฿)'],
      ['Export scheme', 'VSPP / net billing'],
      ['Units', 'kWh'],
      ['Typical driver', 'Self-consumption optimisation']
    ]
  },
  {
    name: 'United States',
    summary: 'Net metering, state-level',
    fields: [
      ['Currency', 'USD ($)'],
      ['Export scheme', 'NEM, varies by state'],
      ['Units', 'kWh'],
      ['Typical driver', 'NEM transition, storage']
    ]
  },
  {
    name: 'UAE',
    summary: 'Shams / net metering',
    fields: [
      ['Currency', 'AED (د.إ)'],
      ['Export scheme', 'Net metering'],
      ['Units', 'kWh'],
      ['Typical driver', 'Cooling load, performance']
    ]
  },
  {
    name: 'United Kingdom',
    summary: 'FIT legacy & SEG',
    fields: [
      ['Currency', 'GBP (£)'],
      ['Export scheme', 'SEG, legacy FIT'],
      ['Units', 'kWh'],
      ['Typical driver', 'Legacy tariff protection']
    ]
  }
];
