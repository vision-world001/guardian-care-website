import {Link} from 'react-router';
import Reveal from '../../../components/Reveal';
import {cn} from '../../../lib/cn';

type Panel = {
  to: string;
  tag: string;
  heading: [string, string];
  summary: string;
  cta: string;
  meta: string;
  accent: string;
  tagColor: string;
  delay: number;
};

const PANELS: Panel[] = [
  {
    to: '/consumers',
    tag: 'For Solar Consumers',
    heading: ['Understand your', 'home energy'],
    summary:
      'See what your solar is generating, what your home is using, what your battery is doing and whether anything needs attention — explained in plain language, not kilowatt-hours you have to interpret yourself.',
    cta: 'I’m a Solar Consumer →',
    meta: 'Provided through your own solar company, powered by Guardian Care. Check in real time.',
    accent: 'bg-[linear-gradient(90deg,var(--color-blue),var(--color-purple))]',
    tagColor: 'text-blue',
    delay: 0.18
  },
  {
    to: '/business',
    tag: 'For Solar Businesses',
    heading: ['Keep the customer', 'after installation'],
    summary:
      'Acquire, onboard, monitor and retain your solar customers through one intelligent customer-care platform — deployed across your entire portfolio, in every market you operate in, under your own brand.',
    cta: 'I’m a Solar Business →',
    meta: 'Operating in Australia, Thailand, the United States, the UAE and the United Kingdom.',
    accent: 'bg-[linear-gradient(90deg,var(--color-green),var(--color-blue))]',
    tagColor: 'text-green',
    delay: 0.24
  }
];

/** The two-up splitter that sends the visitor down one journey or the other. */
export default function JourneyPanels() {
  return (
    <div className="mx-auto grid max-w-[1060px] grid-cols-1 gap-5 px-6 min-[820px]:grid-cols-2">
      {PANELS.map((panel) => (
        <Reveal key={panel.to} delay={panel.delay} className="flex">
          <Link
            to={panel.to}
            className="group glass shadow-lift relative flex w-full flex-col overflow-hidden rounded-frame border border-line-2 p-6 text-left transition duration-250 ease-brand hover:-translate-y-1.5 hover:border-line hover:shadow-lift-hover min-[760px]:px-10 min-[760px]:py-11"
          >
            <span
              className={cn(
                'absolute inset-x-0 top-0 h-px opacity-40 transition-opacity duration-250 group-hover:opacity-100',
                panel.accent
              )}
            />

            <div
              className={cn('mb-5 text-[10.5px] font-bold uppercase tracking-[.2em]', panel.tagColor)}
            >
              {panel.tag}
            </div>

            <div className="mb-3.5 font-display text-[31px] font-semibold uppercase leading-[1.06]">
              {panel.heading[0]}
              <br />
              {panel.heading[1]}
            </div>

            <p className="mb-[26px] flex-1 text-[15.5px] font-light leading-[1.65] text-muted">
              {panel.summary}
            </p>

            <span
              className={cn(
                'inline-flex items-center gap-2.5 self-start rounded-pill px-[26px] py-[15px] text-[13px] font-bold uppercase tracking-[.08em] text-bg transition duration-250 ease-brand group-hover:brightness-110',
                panel.accent
              )}
            >
              {panel.cta}
            </span>

            <div className="mt-[22px] border-t border-line-2 pt-5 text-[12.5px] font-light leading-[1.6] text-faint">
              {panel.meta}
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
