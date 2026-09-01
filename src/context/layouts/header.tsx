import {Link, useLocation} from 'react-router';
import Lockup from '../../components/Lockup';

type NavLink = {href: string; label: string};
type Journey = {links: NavLink[]; cta: NavLink};

/** Nav contents differ per journey; the route decides which set is shown. */
const JOURNEYS: Record<string, Journey> = {
  '/business': {
    links: [
      {href: '#b-lifecycle', label: 'Lifecycle'},
      {href: '#b-onsite', label: 'Onboarding'},
      {href: '#b-command', label: 'Command Centre'},
      {href: '#b-concierge', label: 'Concierge'},
      {href: '#b-markets', label: 'Markets'}
    ],
    cta: {href: '#b-command', label: 'See the platform'}
  },
  '/consumers': {
    links: [
      {href: '#c-today', label: 'Your home today'},
      {href: '#c-day', label: 'Your solar day'},
      {href: '#c-ask', label: 'Ask Guardian'},
      {href: '#c-watch', label: 'Watching over it'},
      {href: '#c-how', label: 'How it works'}
    ],
    cta: {href: '#c-today', label: 'See a real day'}
  }
};

export default function Header() {
  const {pathname} = useLocation();
  const journey = JOURNEYS[pathname];

  if (!journey) return null;

  return (
    <nav className="sticky top-0 z-90 border-b border-line-2 bg-bg/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1220px] items-center gap-4 px-5 py-3 min-[760px]:px-[34px] min-[760px]:py-3.5">
        <Link to="/" aria-label="Guardian Care — home">
          <Lockup size="nav" />
        </Link>

        <div className="ml-auto hidden gap-[26px] text-[12.5px] font-medium uppercase tracking-[.08em] text-muted min-[1080px]:flex">
          {journey.links.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-green">
              {link.label}
            </a>
          ))}
        </div>

        <Link
          to="/"
          className="ml-auto rounded-pill border border-line-2 px-4 py-[9px] text-[11.5px] font-semibold uppercase tracking-[.08em] text-faint transition duration-200 min-[1080px]:ml-[22px] hover:border-line hover:bg-ink/5 hover:text-ink"
        >
          Switch journey
        </Link>

        <a
          href={journey.cta.href}
          className="ml-3 hidden whitespace-nowrap rounded-pill bg-brand-gradient px-5 py-[11px] text-[12px] font-bold uppercase tracking-[.07em] text-bg shadow-[0_8px_24px_-12px_var(--color-green-glow)] transition duration-200 hover:brightness-110 min-[620px]:inline-flex"
        >
          {journey.cta.label}
        </a>
      </div>
    </nav>
  );
}
