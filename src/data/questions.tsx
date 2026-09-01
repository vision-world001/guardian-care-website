import type {ReactNode} from 'react';

export type ConsumerQuestion = {
  question: string;
  answer: ReactNode;
  /**
   * The readings the answer was built from. Shown under every answer, because
   * "we used your data, not a general article about solar" is a claim the page
   * should demonstrate rather than assert.
   */
  basis: string[];
};

export const CONSUMER_QUESTIONS: ConsumerQuestion[] = [
  {
    question: 'Why am I importing electricity?',
    answer: (
      <>
        Your panels produced <b>18.4 kWh</b> today and your home used <b>12.8 kWh</b> — but not at
        the same times. Most of your generation came between 10am and 3pm, most of your usage after
        6pm. Your battery covered part of that gap; the remaining <b>3.2 kWh</b> came from the grid.
      </>
    ),
    basis: ['Solar 18.4 kWh', 'Usage 12.8 kWh', 'Battery discharge 4.4 kWh', 'Import 3.2 kWh']
  },
  {
    question: 'Is my solar working correctly?',
    answer: (
      <>
        Yes. Your system generated <b>18.4 kWh</b> today — in line with what we expect for your
        array size, the season and today’s conditions. We compare it against its own history, not a
        generic benchmark. Nothing is out of pattern.
      </>
    ),
    basis: ['Solar 18.4 kWh', 'Expected range 16.9–19.8 kWh', '30-day history']
  },
  {
    question: 'Should I get a battery?',
    answer: (
      <>
        You already have one. It was at <b>71%</b> this evening and covered <b>4.4 kWh</b> of your
        after-dark usage. You still exported <b>8.1 kWh</b>, so more capacity would capture more —
        but your current setup is not the limiting factor most days.
      </>
    ),
    basis: ['Battery 71%', 'Battery discharge 4.4 kWh', 'Export 8.1 kWh']
  },
  {
    question: 'Why did my generation fall?',
    answer:
      'It has not, materially. Variation this size is normal, and tracks cloud cover rather than your system. We would tell you if it fell below your established range for several days running — that is where it stops being weather.',
    basis: ['Solar 18.4 kWh', '7-day average 17.6 kWh', 'Cloud cover, local station']
  },
  {
    question: 'What can I do today to save energy?',
    answer: (
      <>
        Your panels produce more than your home needs between <b>1pm and 3pm</b> — today that
        surplus was <b>4.5 kWh</b>. Run your dishwasher, washing machine or dryer then, and you use
        electricity you already made instead of exporting it at 5c and buying it back at 32c.
      </>
    ),
    basis: ['Surplus 1pm–3pm 4.5 kWh', 'Import rate 32c', 'Export rate 5c']
  },
  {
    question: 'What happens if something breaks?',
    answer:
      'Your solar company is notified before you are. If your system stops reporting or generation drops outside its normal range, an alert reaches their operations team the same day, and they call you — usually before you have noticed.',
    basis: ['Live reporting status', 'Expected range, per string', 'Installer alert routing']
  }
];
