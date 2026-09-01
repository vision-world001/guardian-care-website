import type {StatusTone} from './command';

/**
 * The one thing a homeowner cannot do for themselves: notice, at 2pm on a
 * Tuesday, that their roof is quietly underperforming. This is that story told
 * as it happens to them — four moments, none of which they had to start.
 */
export type AlertStep = {
  /** When it happened, from the household's point of view. */
  when: string;
  title: string;
  body: string;
  tone: StatusTone;
  /** Who acted. The point of the section is that it is rarely the customer. */
  actor: 'Guardian Care' | 'Nordbrook Solar' | 'You';
};

export const ALERT_TIMELINE: AlertStep[] = [
  {
    when: 'Tuesday, 2:14pm',
    title: 'Something changed',
    body: 'Generation ran 22% under its own range for the third clear day running. Weather did not explain it.',
    tone: 'amber',
    actor: 'Guardian Care'
  },
  {
    when: 'Tuesday, 2:15pm',
    title: 'Your installer was told',
    body: 'It reached Nordbrook Solar’s operations queue with the readings, the likely cause and a next step attached.',
    tone: 'blue',
    actor: 'Guardian Care'
  },
  {
    when: 'Wednesday, 9:05am',
    title: 'Someone called you',
    body: 'Not a ticket you opened — a call from the company that installed your system, about a west-facing string losing its afternoon.',
    tone: 'green',
    actor: 'Nordbrook Solar'
  },
  {
    when: 'Friday',
    title: 'Back to normal',
    body: 'A branch trimmed on site. Generation returned inside its expected range that afternoon, and you were told it had.',
    tone: 'green',
    actor: 'Nordbrook Solar'
  }
];

/** What the household did across the whole sequence, stated plainly. */
export const ALERT_EFFORT = [
  {label: 'Apps you checked', value: '0'},
  {label: 'Tickets you raised', value: '0'},
  {label: 'Days before someone called', value: '1'}
];
