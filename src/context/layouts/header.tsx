import {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router';
import Lockup from '../../components/Lockup';
import {useTheme} from '../../lib/theme';
import ThemeToggle from '../../components/ThemeToggle';
import {cn} from '../../lib/cn';

/**
 * Whether the page has left the top.
 *
 * The bar sits over the hero, so at rest it should be part of it — no
 * background, no rule, generous height. The moment content starts passing
 * underneath it has a different job: hold its own against whatever is
 * scrolling past. So it takes on a ground, a hairline and a shadow, and
 * tightens up.
 *
 * Twelve pixels rather than zero, because a threshold of zero flickers on the
 * sub-pixel scroll a trackpad produces at rest. The state is only ever set
 * when the answer actually changes, so the listener costs one comparison per
 * scroll event rather than a render.
 */
function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const read = () => {
      const past = window.scrollY > threshold;
      setScrolled((was) => (was === past ? was : past));
    };

    /* Read once on mount: a reload part-way down a page, or a back button
       landing at an offset, both start already scrolled. */
    read();
    window.addEventListener('scroll', read, {passive: true});
    return () => window.removeEventListener('scroll', read);
  }, [threshold]);

  return scrolled;
}

type NavLink = {href: string; label: string};
type Journey = {links: NavLink[]; switcher: boolean};

/**
 * The one button, on every page.
 *
 * Each journey used to end the bar with its own call — choose your journey,
 * start my system check, get my quote, start my assessment. Four buttons
 * meaning four things, none of which was *the* thing: there was no route to
 * an account from anywhere except the bottom of the business page.
 *
 * It is a route rather than an anchor because it has to work from the home
 * page, where there is no form to scroll to. Each journey's own action is
 * still a click away — it is the first or second section on all three, and
 * the nav links point straight at it.
 */
const START = {to: '/start', label: 'Get started'};

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
    switcher: false
  },
  '/consumer': {
    links: [
      {href: '#why', label: 'Why Guardian Care'},
      {href: '#findings', label: 'What we find'},
      {href: '#activate', label: 'What it costs'},
      {href: '#aim', label: 'Our aim'}
    ],
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
    switcher: true
  },
  '/business': {
    links: [
      {href: '#products', label: 'The platform'},
      {href: '#console', label: 'The console'},
      {href: '#revenue', label: 'Revenue'},
      {href: '#join', label: 'How you join'}
    ],
    switcher: true
  },

  /* The form has one section and nothing to navigate to, so the bar carries
     only the mark and the way back. */
  '/start': {links: [], switcher: true},

  /* Same shape, same reason. Without an entry here `JOURNEYS[pathname]` is
     undefined and the header returns null, so a new route that forgets this
     line loses the whole bar. */
  '/contact': {links: [], switcher: true}
};

export default function Header() {
  const {pathname} = useLocation();
  const journey = JOURNEYS[pathname];
  const scrolled = useScrolled();
  const {theme} = useTheme();

  if (!journey) return null;

  /* At rest the bar is part of the hero behind it, which only works while
     there *is* a dark hero behind it. On the day theme the page underneath is
     white and the bar is a navy object sitting on it, so there is nothing to
     dissolve into — it carries its ground at every scroll position, and the
     scroll state is left to say what it still can: the padding, the rule and
     the shadow. Solid rather than the night theme's 85%, because 85% navy
     over a white page is a washed slate, not the mark's colour. */
  const grounded = scrolled || theme === 'day';

  /* The start button is drawn everywhere but on itself, and whether it is there
     decides how much room the rest of the bar has. Read once, so the two places
     that care cannot disagree. */
  const showStart = pathname !== START.to;

  return (
    <nav
      className={cn(
        'on-navy sticky top-0 z-90 border-b transition-[background-color,border-color,box-shadow] duration-300 ease-brand',
        grounded ? 'border-line-2 shadow-[0_10px_30px_-18px_var(--drop)]' : 'border-transparent bg-transparent',
        grounded && (theme === 'day' ? 'bg-bg' : 'bg-bg/85 backdrop-blur-xl')
      )}
    >
      <div
        className={cn(
          'mx-auto flex max-w-[1220px] items-center gap-4 px-4 transition-[padding] duration-300 ease-brand min-[520px]:px-5 min-[760px]:px-[34px]',
          scrolled ? 'py-2.5 min-[760px]:py-3' : 'py-4 min-[760px]:py-5'
        )}
      >
        {/* `min-w-0` so the mark is what gives way if the bar is ever asked for
            more than it has. A flex item defaults to `min-width: auto`, which
            means it refuses to shrink below its content and pushes whatever
            follows it out of the bar instead — and what follows it here is the
            one button the bar exists for. The wordmark is the right thing to
            lose: it is already dropped below 400px by `Lockup`'s own sizing, so
            clipping it is the same concession made a little earlier. */}
        <Link
          to="/"
          aria-label="Guardian Care — home"
          className="min-w-0 overflow-hidden"
        >
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

        <ThemeToggle className="ml-auto min-[1180px]:ml-[22px]" />

        {/* Held back until there is room for it, and only when it is sharing the
            bar with the start button.

            It is the right thing to hold back, because it goes to `/` — exactly
            where the mark to its left already goes — so on a crowded bar it is
            a second control for a destination that already has one, spending
            about 145px to say so. Dropping it is what stops the row
            overflowing: mark, wordmark, toggle and both pills all set
            `whitespace-nowrap`, so nothing in the row could give, and the start
            button was pushed clean out of the header's own background.

            On `/start` the button is not drawn, the row measures 332 against
            368 at the narrowest width the wordmark appears at, and this is the
            way back — so there it stays at every size. Hiding it on a bar that
            fits would be removing the only labelled exit to solve a problem
            that page does not have. */}
        {journey.switcher ? (
          <Link
            to="/"
            className={cn(
              'ml-2 shrink-0 whitespace-nowrap rounded-pill border border-line-2 px-3 py-[9px] text-[11.5px] font-semibold uppercase tracking-[.06em] text-faint transition duration-200 min-[520px]:ml-3 min-[520px]:px-4 min-[520px]:tracking-[.08em] hover:border-line hover:bg-ink/5 hover:text-ink',
              showStart && 'hidden min-[640px]:block'
            )}
          >
            Switch journey
          </Link>
        ) : null}

        {/* Everywhere but on itself. */}
        {showStart ? (
          <Link
            to={START.to}
            className="ml-2 shrink-0 whitespace-nowrap rounded-pill bg-[var(--cta)] px-3.5 py-[10px] text-[11.5px] font-bold uppercase tracking-[.05em] text-[var(--cta-ink)] shadow-[0_8px_24px_-12px_var(--btn-glow)] transition duration-200 min-[520px]:ml-3 min-[520px]:px-5 min-[520px]:py-[11px] min-[520px]:text-[12px] min-[520px]:tracking-[.07em] hover:bg-[var(--cta-hover)]"
          >
            {START.label}
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
