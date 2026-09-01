import {useState} from 'react';
import Reveal from '../../../components/Reveal';
import {
  BrowserFrame,
  HAIRLINE_GRID,
  PanelEdge,
  Section,
  SectionHead,
  StatusChip,
  StatusGlyphIcon,
  Wrap
} from '../../../components/ui';
import {CC_KPIS, CC_ROWS, STATUSES, TONE_TEXT} from '../../../data/command';
import {cn} from '../../../lib/cn';

/**
 * The console the whole page is selling.
 *
 * Three changes carry the rebuild. It opens on a customer rather than on a
 * placeholder — a console that waits to be clicked demonstrates nothing. Every
 * status wears a glyph as well as a colour, because six statuses is more than
 * hue can carry and two of them used to be literally the same red. And the
 * queue is set as a table rather than as a stack of cards: an operator scans a
 * column of names and statuses, and cards make that scan harder for no gain.
 *
 * The status legend moved out of the section body and into the frame's own
 * header strip, where a real console would keep it — it is chrome, not an
 * argument, and it was taking a full band of the page to say so.
 */
export default function CommandCentre() {
  const [selected, setSelected] = useState(0);
  const row = CC_ROWS[selected];

  return (
    <Section id="b-command" hairline>
      <Wrap>
        <Reveal>
          <SectionHead
            eyebrow="Command Centre"
            index=""
            title={
              <>
                Who needs attention.
                <br />
                <span className="text-brand-gradient">And what to do about it.</span>
              </>
            }
            body="Every customer carries an automatically assigned status. At two thousand customers or twenty thousand, the operator sees only the exceptions — each one arriving with a reason, a recommended conversation and a next action."
          />
        </Reveal>

        <Reveal>
          <BrowserFrame url="command.guardiancare.io/attention" badge="2,482 customers">
            {/* The legend, as a console would carry it: one strip of chrome
                above the data, not a section of the page. */}
            <div className="mb-5 flex flex-wrap gap-x-5 gap-y-2.5 border-b border-line-2 pb-4">
              {STATUSES.map((status) => (
                <span
                  key={status.name}
                  title={status.description}
                  className={cn(
                    'inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[.1em]',
                    TONE_TEXT[status.tone]
                  )}
                >
                  <StatusGlyphIcon glyph={status.glyph} className="h-3 w-3" />
                  {status.name}
                </span>
              ))}
            </div>

            <div
              className={cn(
                HAIRLINE_GRID,
                'mb-6 grid-cols-2 min-[520px]:grid-cols-3 min-[900px]:grid-cols-6'
              )}
            >
              {CC_KPIS.map((kpi) => (
                <div key={kpi.label} className="glass px-[15px] py-4 text-left">
                  <div
                    className={cn(
                      'mono text-[27px] font-semibold leading-none',
                      TONE_TEXT[kpi.tone]
                    )}
                  >
                    {kpi.value}
                  </div>
                  <div className="mt-[7px] text-[11px] leading-[1.35] text-faint">{kpi.label}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-[18px] min-[940px]:grid-cols-[1fr_350px]">
              {/* The queue as a table. Rows share hairlines rather than each
                  carrying its own border, so the eye runs down the column. */}
              <div className="ring-lit overflow-hidden rounded-frame">
                <div className="grid grid-cols-[1fr_auto] gap-3 border-b border-line-2 bg-panel/50 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[.14em] text-faint">
                  <span>Attention queue</span>
                  <span>Status</span>
                </div>

                {CC_ROWS.map((item, index) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setSelected(index)}
                    aria-pressed={index === selected}
                    className={cn(
                      'relative grid w-full grid-cols-[1fr_auto] items-center gap-3 border-b border-line-2 px-4 py-3 text-left transition-colors duration-150 last:border-b-0',
                      index === selected
                        ? 'bg-[linear-gradient(100deg,var(--color-green-glow),transparent)]'
                        : 'hover:bg-panel-2/60'
                    )}
                  >
                    {/* The selected row is marked on its edge rather than by
                        an outline, so the table keeps its rhythm. */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute inset-y-0 left-0 w-[2px] bg-green transition-transform duration-200 ease-brand',
                        index === selected ? 'scale-y-100' : 'scale-y-0'
                      )}
                    />

                    <span className="min-w-0">
                      <span className="block truncate text-[14px] font-medium">
                        {item.name}
                        <span className="text-faint"> · {item.location}</span>
                      </span>
                      <span className="mt-0.5 block truncate text-[12.5px] font-light text-faint">
                        {item.summary}
                      </span>
                    </span>

                    <StatusChip glyph={item.glyph} tone={item.tone} className="hidden min-[600px]:inline-flex">
                      {item.status}
                    </StatusChip>
                    <StatusGlyphIcon
                      glyph={item.glyph}
                      className={cn('min-[600px]:hidden', TONE_TEXT[item.tone])}
                    />
                  </button>
                ))}
              </div>

              <div className="ring-lit glass overflow-hidden rounded-frame p-[22px]">
                <PanelEdge />
                <div className="mb-[15px] flex items-center justify-between gap-3 border-b border-line-2 pb-3.5">
                  <span className="text-[10.5px] font-bold uppercase tracking-[.16em] text-green">
                    Customer intelligence
                  </span>
                  <StatusChip glyph={row.glyph} tone={row.tone}>
                    {row.status}
                  </StatusChip>
                </div>

                {row.fields.map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between gap-3 border-b border-line-2 py-2.5 last:border-b-0"
                  >
                    <span className="text-[12.5px] font-light text-muted">{key}</span>
                    <span className="mono text-right text-[12.5px] font-medium text-ink">
                      {value}
                    </span>
                  </div>
                ))}

                <p className="mt-3.5 border-t border-line-2 pt-3.5 text-[13.5px] font-light leading-[1.62] text-muted">
                  <b className="font-semibold text-green">Recommended conversation.</b>{' '}
                  {row.recommendation}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  {row.actions.map((action, index) => (
                    <button
                      key={action}
                      type="button"
                      className={cn(
                        'cursor-pointer rounded-pill px-2 py-[11px] text-[11px] font-semibold uppercase tracking-[.06em] transition duration-200',
                        index === 0
                          ? 'border border-transparent bg-brand-gradient text-bg'
                          : 'border border-line-2 text-muted hover:border-green/60 hover:bg-green-glow hover:text-green'
                      )}
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </BrowserFrame>
        </Reveal>
      </Wrap>
    </Section>
  );
}
