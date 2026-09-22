import {PROFILE_FIELDS} from '../../../../data/consumer';
import {cn} from '../../../../lib/cn';
import {LABEL} from '../../../../components/kit';

/**
 * Step 01: the system profile, filled in.
 *
 * The brief lists eleven things Guardian Care gathers. As a bulleted list that
 * reads like a form somebody has to fill in; drawn as a completed profile for
 * one house, it reads like something that already exists — which is the point.
 * The visitor is not being handed paperwork, they are being shown the record
 * their answers turn into.
 */
export default function Profile() {
  return (
    <div className="glass shadow-lift ring-lit overflow-hidden rounded-frame">
      <div className="flex items-center justify-between gap-4 border-b border-line-2 px-5 py-4 min-[520px]:px-6">
        <span className={cn(LABEL, 'text-amber')}> System profile</span>
        <span className="mono text-[10px] uppercase tracking-[.16em] text-faint">
          {PROFILE_FIELDS.length} / {PROFILE_FIELDS.length} captured
        </span>
      </div>

      <dl className="grid gap-px bg-line-2 min-[520px]:grid-cols-2">
        {PROFILE_FIELDS.map(([label, value]) => (
          <div key={label} className="bg-panel px-5 py-3.5 min-[520px]:px-6">
            <dt className="mono text-[9.5px] font-semibold uppercase tracking-[.16em] text-faint">
              {label}
            </dt>
            <dd className="mt-1.5 text-[14.5px] font-medium leading-snug text-ink">{value}</dd>
          </div>
        ))}

        {/* The twelfth cell is the outcome, which also squares off the grid. */}
        <div className="flex items-center gap-3 bg-panel px-5 py-3.5 min-[520px]:px-6">
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-green text-bg">
            <svg
              viewBox="0 0 12 12"
              className="h-3 w-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M2 6.2 4.8 9 10 3.2" />
            </svg>
          </span>
          <span className="mono text-[10.5px] font-semibold uppercase leading-snug tracking-[.14em] text-green">
            Initial profile created
          </span>
        </div>
      </dl>
    </div>
  );
}
