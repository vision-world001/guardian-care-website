import type {ReactNode} from 'react';

export type LifecycleStage = {
  name: string;
  headline: string;
  body: ReactNode;
};

export const LIFECYCLE: LifecycleStage[] = [
  {
    name: 'Acquire',
    headline: 'Capture the customer',
    body: 'Lead forms, QR onboarding, landing pages, referral links, campaign tracking, installer capture and migration of your existing database. Every route arrives in the same place, with source attached, so nothing is worked twice or lost between systems.'
  },
  {
    name: 'Onboard',
    headline: 'Understand the customer',
    body: 'A structured onsite assessment records the property, the system, the electrical infrastructure and the tariff position. Documents, photographs and certification are attached to the same record.'
  },
  {
    name: 'Capture',
    headline: 'Establish the baseline',
    body: (
      <>
        What was recorded on site becomes the reference the platform measures against. There is no
        separate configuration step — the assessment <b>is</b> the setup.
      </>
    )
  },
  {
    name: 'Analyse',
    headline: 'Interpret the behaviour',
    body: 'Generation, consumption, import, export, storage behaviour, voltage and system health are evaluated daily against that customer’s own established pattern rather than a fixed threshold.'
  },
  {
    name: 'Alert',
    headline: 'Surface only what matters',
    body: 'Material deviation becomes a classified exception with a severity, a reason and a recommended action. Everything else stays quiet, so the queue remains credible.'
  },
  {
    name: 'Assist',
    headline: 'Communicate usefully',
    body: 'A message is drafted from that customer’s actual readings and queued for approval. The customer hears from you about something real, in your organisation’s name.'
  },
  {
    name: 'Recommend',
    headline: 'Identify the opportunity',
    body: 'Where the data supports it — sustained export without storage, an ageing inverter, a tariff mismatch — a commercial opportunity is raised with its reasoning and estimated value attached.'
  },
  {
    name: 'Retain',
    headline: 'Maintain the relationship',
    body: 'Reports, service scheduling, annual reviews and renewal prompts run on a cadence, so contact continues without depending on anyone remembering.'
  },
  {
    name: 'Revenue',
    headline: 'Convert the relationship',
    body: 'Care agreements, upgrades, servicing and referrals arise from evidenced need rather than campaigns — revenue from customers you have already won.'
  }
];
