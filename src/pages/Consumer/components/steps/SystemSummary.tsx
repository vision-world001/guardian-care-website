import {Estimated} from '../../../../components/ui';
import {summaryOf, type ExistingPosition} from '../../../../data/consumer';
import {cn} from '../../../../lib/cn';
import {LABEL} from '../../../../components/kit';

/**
 * Step 02: the system summary — and, further down, the visitor's own.
 *
 * Seven lines from `summaryOf`, every one of them wearing the estimate mark.
 * The same component renders the example in the explanation and the real
 * result under the system check, so the page can say "this is what you will
 * receive" and mean it literally.
 */
export default function SystemSummary({
  position,
  caption,
  title = 'System summary'
}: {
  position: ExistingPosition;
  caption: string;
  title?: string;
}) {
  const rows = summaryOf(position);

  return (
    <div className="glass shadow-lift ring-lit overflow-hidden rounded-frame">
      <div className="flex items-center justify-between gap-4 border-b border-line-2 px-5 py-4 min-[520px]:px-6">
        <span className={cn(LABEL, 'text-amber')}>◇ {title}</span>
        <Estimated />
      </div>

      <dl className="grid gap-px bg-line-2 min-[520px]:grid-cols-2">
        {rows.map((row) => (
          <div key={row.key} className="bg-panel px-5 py-4 min-[520px]:px-6">
            <dt className="mono text-[9.5px] font-semibold uppercase tracking-[.16em] text-faint">
              {row.label}
            </dt>
            <dd className="mono mt-2 text-[16.5px] font-semibold leading-tight text-ink">
              {row.value}
            </dd>
            <dd className="mt-1.5 text-[12.5px] font-light leading-snug text-muted">{row.note}</dd>
          </div>
        ))}

        <div className="flex items-center bg-bg-2 px-5 py-4 min-[520px]:px-6">
          <p className="text-[13px] font-light leading-[1.55] text-muted">{caption}</p>
        </div>
      </dl>
    </div>
  );
}
