import {Link, useLocation} from 'react-router';
import Lockup from '../../components/Lockup';
import {Wrap} from '../../components/ui';
import {cn} from '../../lib/cn';
import {DAY_ROUTES} from './index';

const COLUMNS: Array<{heading: string; links: Array<{href: string; label: string}>}> = [
  {
    heading: 'Journeys',
    links: [
      {href: '/existing', label: 'I already have solar'},
      {href: '/plan', label: 'I’m looking for solar'},
      {href: '/business', label: 'Guardian Care for business'}
    ]
  },
  {
    heading: 'Platform',
    links: [
      {href: '/#flow', label: 'How it connects'},
      {href: '/#intelligence', label: 'Data → intelligence → action'},
      {href: '/#operations', label: 'Operations'},
      {href: '/#record', label: 'One customer record'}
    ]
  },
  {
    heading: 'Markets',
    links: [
      {href: '/business#markets', label: 'United Kingdom'},
      {href: '/business#markets', label: 'United States'},
      {href: '/business#markets', label: 'Australia'},
      {href: '/business#markets', label: 'Southeast Asia · UAE'}
    ]
  }
];

export default function Footer() {
  const {pathname} = useLocation();

  /* The footer is the site speaking rather than the page — the same block of
     legal, navigation and company lines under every route — so it is always
     dark. On the two daylight journeys that means forcing the night scope back
     on; on the home page it does not, because that route is already dark and
     re-lighting it here would drop a blue-black band under a charcoal page. */
  const needsNightScope = DAY_ROUTES.has(pathname);

  return (
    <footer
      className={cn(
        'border-t border-line-2 bg-bg pb-9 pt-[50px]',
        needsNightScope && 'theme-night'
      )}
    >
      <Wrap>
        <div className="grid grid-cols-2 gap-7 min-[820px]:grid-cols-[2.2fr_1fr_1fr_1fr] min-[820px]:gap-[34px]">
          <div>
            <Lockup size="footer" />
            <p className="mt-4 max-w-[290px] text-sm font-light leading-[1.65] text-muted">
              Energy intelligence for solar households and the companies that install for them. We
              establish the baseline, measure the system, calculate the difference and explain what
              it means.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.heading}>
              <div className="mb-4 text-[10.5px] font-bold uppercase tracking-[.18em] text-green">
                {column.heading}
              </div>
              <div className="flex flex-col gap-[11px] text-[14.5px] font-light text-muted">
                {column.links.map((link) => (
                  <Link
                    key={`${column.heading}-${link.label}`}
                    to={link.href}
                    className="transition-colors hover:text-green"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-11 flex flex-wrap items-center justify-between gap-3 border-t border-line-2 pt-6 text-[12.5px] font-light text-faint">
          <span>© Guardian Care · Energy, understood.</span>
          <span>
            Figures shown are illustrative estimates, not quotations or guaranteed savings.
          </span>
        </div>
      </Wrap>
    </footer>
  );
}
