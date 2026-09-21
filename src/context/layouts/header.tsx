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
  '/consumer': {
    links: [
      {href: '#why', label: 'Why Guardian Care'},
      {href: '#how', label: 'How it works'},
      {href: '#view', label: 'Bird’s-eye view'},
      {href: '#account', label: 'Your account'},
      {href: '#aim', label: 'Our aim'}
    ],
    cta: {href: '#check', label: 'Start my system check'},
    switcher: true
  },
  '/plan': {
    links: [
      {href: '#changes', label: 'What solar changes'},
      {href: '#storage', label: 'Storage'},
      {href: '#assess', label: 'Assessment'},
      {href: '#quote', label: 'Your quote'},
      {href: '#after', label: 'After installation'}
    ],
    cta: {href: '#assess', label: 'Get my quote'},
    switcher: true
  },
  '/business': {
    links: [
      {href: '#after', label: 'After handover'},
      {href: '#products', label: 'The platform'},
      {href: '#console', label: 'The console'},
      {href: '#revenue', label: 'Revenue'},
      {href: '#join', label: 'How you join'}
    ],
    cta: {href: '#join', label: 'Join Guardian Care'},
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

        {/* White, per the palette — not the supporting grey. A nav is the one
            place on the page where every item is equally the thing you came
            for, so none of them is set back. */}
        <div className="ml-auto hidden gap-[26px] text-[12.5px] font-medium uppercase tracking-[.08em] text-ink min-[1180px]:flex">
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
          className={`${journey.switcher ? 'ml-3' : 'ml-auto min-[1180px]:ml-[22px]'} hidden whitespace-nowrap rounded-pill bg-[var(--cta)] px-5 py-[11px] text-[12px] font-bold uppercase tracking-[.07em] text-[var(--cta-ink)] shadow-[0_8px_24px_-12px_var(--btn-glow)] transition duration-200 hover:bg-[var(--cta-hover)] min-[620px]:inline-flex`}
        >
          {journey.cta.label}
        </a>
      </div>
    </nav>
  );
}
