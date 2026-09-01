export type OnsiteGroup = {
  name: string;
  summary: string;
  body: string;
};

export const ONSITE: OnsiteGroup[] = [
  {
    name: 'Customer',
    summary: 'Who and where',
    body: 'Name, contact details, address, property type and occupancy pattern. Occupancy matters more than it appears — a household home all day has a fundamentally different consumption profile from one empty until six.'
  },
  {
    name: 'Solar system',
    summary: 'What is installed',
    body: 'Panel quantity, array capacity, installation date, inverter make and age, and which monitoring platform the system reports through.'
  },
  {
    name: 'Battery',
    summary: 'If fitted',
    body: 'Presence, capacity, manufacturer, state of charge, and observed charging and discharging behaviour. Recorded even where absent — no battery is itself a finding.'
  },
  {
    name: 'Electrical',
    summary: 'Infrastructure and protection',
    body: 'Consumer unit, sub-board, grid voltage, protective devices, smart meter and import/export metering arrangement.'
  },
  {
    name: 'Energy',
    summary: 'Commercial position',
    body: 'Annual consumption, tariff, import and export rates, standing charge and typical usage behaviour. This is what converts kilowatt-hours into currency.'
  },
  {
    name: 'Documents',
    summary: 'Evidence attached',
    body: 'Photographs, electricity bills, installation paperwork, certification, manufacturer documentation and any previous service records — all held against the same customer record.'
  }
];
