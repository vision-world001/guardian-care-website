import {Link} from 'react-router';
import Lockup from '../../components/Lockup';
import {Wrap} from '../../components/ui';
import {cn} from '../../lib/cn';

/**
 * `external` covers anything that is not an in-app route — `tel:` and
 * `mailto:` here. A router `<Link>` would try to resolve those against the
 * app's own paths and navigate nowhere, so they render as plain anchors.
 */
type FooterLink = {href: string; label: string; external?: boolean};

const COLUMNS: Array<{heading: string; links: FooterLink[]}> = [
  {
    heading: 'Journeys',
    links: [
      {href: '/consumer', label: 'I already have solar'},
      {href: '/plan', label: 'I’m looking for solar'},
      {href: '/business', label: 'Guardian Care for business'}
    ]
  },
  /* Every entry here used to point at `/business#markets`, an id that does
     not exist, so all four were dead. They land on the business page itself
     now, which is the page that speaks to whoever clicks them. */
  {
    heading: 'Markets',
    links: [
      {href: '/business', label: 'United Kingdom'},
      {href: '/business', label: 'United States'},
      {href: '/business', label: 'Australia'},
      {href: '/business', label: 'Southeast Asia · UAE'}
    ]
  },
  {
    heading: 'Contact',
    links: [
      {href: 'tel:+443301221279', label: '0330 122 1279', external: true},
      {href: 'mailto:solar@gmail.com', label: 'solar@gmail.com', external: true}
    ]
  }
];

export default function Footer() {

  return (
    <footer
      className={cn(
        'border-t border-line-2 bg-bg pb-9 pt-[50px]'
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
              <div className="flex flex-col items-start gap-[11px] text-[14.5px] font-light text-muted">
                {column.links.map((link) =>
                  link.external ? (
                    <a
                      key={`${column.heading}-${link.label}`}
                      href={link.href}
                      className="transition-colors hover:text-green"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={`${column.heading}-${link.label}`}
                      to={link.href}
                      className="transition-colors hover:text-green"
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Centred, because it is one line on its own now. `justify-between`
            was right when the disclaimer sat opposite it; with that commented
            out it just pushed the single line hard against the left edge. If
            the disclaimer comes back, the two will sit centred as a pair. */}
        <div className="mt-11 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 border-t border-line-2 pt-6 text-center text-[12.5px] font-light text-faint">
          <span>© Guardian Care · Energy, understood.</span>
          {/* <span>
            Figures shown are illustrative estimates, not quotations or guaranteed savings.
          </span> */}
        </div>
      </Wrap>
    </footer>
  );
}
