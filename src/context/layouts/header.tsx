import {Link, useLocation} from 'react-router';
import Lockup from '../../components/Lockup';

type NavLink = {href: string; label: string};
type Journey = {links: NavLink[]; cta: NavLink; switcher: boolean};

/** Nav contents differ per journey; the route decides which set is shown. */
const JOURNEYS: Record<string, Journey> = {
  /* Section anchors rather than a top-level site nav. There is no Company or
     Resources behind a link here yet, and a nav item that goes nowhere is worse
     than one less nav item. */
  '/': {
    links: [
      {href: '#journeys', label: 'Platform'},
      {href: '#flow', label: 'How it connects'},
      {href: '#intelligence', label: 'Intelligence'},
      {href: '#operations', label: 'Operations'},
      {href: '#record', label: 'Architecture'}
    ],
    /* Not "Explore Guardian Care" — that is the hero's button, and the two sit
       on screen together at the top of the page. */
    cta: {href: '#journeys', label: 'Choose your journey'},
    switcher: false
  },
  '/existing': {
    links: [
      {href: '#today', label: 'Your system today'},
      {href: '#check', label: 'System check'},
      {href: '#view', label: 'Bird’s-eye view'},
      {href: '#thinking', label: 'Intelligence'},
      {href: '#alerts', label: 'Alerts'}
    ],
    cta: {href: '#check', label: 'Check my system'},
    switcher: true
  },
  '/plan': {
    links: [
      {href: '#assess', label: 'Assessment'},
      {href: '#changes', label: 'What solar changes'},
      {href: '#storage', label: 'Storage'},
      {href: '#setup', label: 'Suggested setup'},
      {href: '#ask', label: 'Ask Guardian Care'}
    ],
    cta: {href: '#assess', label: 'See my estimate'},
    switcher: true
  },
  '/business': {
    links: [
      {href: '#assess', label: 'Assessment'},
      {href: '#pillars', label: 'Lifecycle'},
      {href: '#signals', label: 'Intelligence'},
      {href: '#portfolio', label: 'Portfolio'},
      {href: '#markets', label: 'Markets'}
    ],
    cta: {href: '#assess', label: 'Start my assessment'},
    switcher: true
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

        <div className="ml-auto hidden gap-[26px] text-[12.5px] font-medium uppercase tracking-[.08em] text-muted min-[1180px]:flex">
          {journey.links.map((link) => (
            <a key={link.href} href={link.href} className="whitespace-nowrap transition-colors hover:text-green">
              {link.label}
            </a>
          ))}
        </div>

        {journey.switcher ? (
          <Link
            to="/"
            className="ml-auto whitespace-nowrap rounded-pill border border-line-2 px-4 py-[9px] text-[11.5px] font-semibold uppercase tracking-[.08em] text-faint transition duration-200 min-[1180px]:ml-[22px] hover:border-line hover:bg-ink/5 hover:text-ink"
          >
            Switch journey
          </Link>
        ) : null}

        <a
          href={journey.cta.href}
          className={`${journey.switcher ? 'ml-3' : 'ml-auto min-[1180px]:ml-[22px]'} hidden whitespace-nowrap rounded-pill bg-brand-gradient px-5 py-[11px] text-[12px] font-bold uppercase tracking-[.07em] text-bg shadow-[0_8px_24px_-12px_var(--btn-glow)] transition duration-200 hover:brightness-110 min-[620px]:inline-flex`}
        >
          {journey.cta.label}
        </a>
      </div>
    </nav>
  );
}
