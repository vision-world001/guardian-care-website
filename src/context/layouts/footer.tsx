import {Link} from 'react-router';
import Lockup from '../../components/Lockup';
import {Wrap} from '../../components/ui';

const COLUMNS: Array<{heading: string; links: Array<{href: string; label: string}>}> = [
  {
    heading: 'Platform',
    links: [
      {href: '/business#b-lifecycle', label: 'Lifecycle'},
      {href: '/business#b-command', label: 'Command Centre'},
      {href: '/business#b-concierge', label: 'Concierge'}
    ]
  },
  {
    heading: 'Markets',
    links: [
      {href: '/business#b-markets', label: 'Australia'},
      {href: '/business#b-markets', label: 'Thailand'},
      {href: '/business#b-markets', label: 'United States'},
      {href: '/business#b-markets', label: 'UAE · UK'}
    ]
  }
];

export default function Footer() {
  return (
    /* Always dark, on both journeys. The footer is the site speaking rather
       than the page — the same block of legal, navigation and company lines
       under a daylight consumer page and a console-dark business one — and
       relighting it per route would make it read as part of whatever came
       above it instead of as the thing that closes the site. */
    <footer className="theme-night bg-bg border-t border-line-2 pb-9 pt-[50px]">
      <Wrap>
        <div className="grid grid-cols-2 gap-7 min-[820px]:grid-cols-[2.2fr_1fr_1fr_1fr] min-[820px]:gap-[34px]">
          <div>
            <Lockup size="footer" />
            <p className="mt-4 max-w-[280px] text-sm font-light leading-[1.65] text-muted">
              Energy intelligence, acquisition and customer concierge infrastructure for solar
              companies. Operating internationally, deployed under your brand.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.heading}>
              <div className="mb-4 text-[10.5px] font-bold uppercase tracking-[.18em] text-green">
                {column.heading}
              </div>
              <div className="flex flex-col gap-[11px] text-[14.5px] font-light text-muted">
                {column.links.map((link) => (
                  <Link key={link.label} to={link.href} className="transition-colors hover:text-green">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div>
            <div className="mb-4 text-[10.5px] font-bold uppercase tracking-[.18em] text-green">
              Journeys
            </div>
            <div className="flex flex-col gap-[11px] text-[14.5px] font-light text-muted">
              <Link to="/business" className="transition-colors hover:text-green">
                For businesses
              </Link>
              <Link to="/consumers" className="transition-colors hover:text-green">
                For consumers
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-11 flex flex-wrap justify-between gap-3 border-t border-line-2 pt-6 text-[12.5px] font-light text-faint">
          <span>© Guardian Care · Energy Intelligence Platform.</span>
          <span>Preview build — not for production use</span>
        </div>
      </Wrap>
    </footer>
  );
}
