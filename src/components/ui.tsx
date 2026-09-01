import type {ReactNode} from 'react';
import Reveal from './Reveal';
import {cn} from '../lib/cn';
import {TONE_BG, TONE_TEXT, type StatusGlyph, type StatusTone} from '../data/command';

/* ---------- Buttons ---------- */

/** Solid gradient button. Apply to <a>, <button> or <Link>. */
export const BTN =
  'inline-flex items-center justify-center gap-2.5 rounded-pill bg-brand-gradient px-[30px] py-[16px] ' +
  'text-[13px] font-bold uppercase tracking-[.08em] text-bg shadow-[0_10px_30px_-12px_var(--btn-glow)] ' +
  'transition duration-200 ease-brand hover:-translate-y-0.5 hover:brightness-110 ' +
  'hover:shadow-[0_18px_44px_-14px_var(--btn-glow)]';

/** The quieter companion action: an outlined pill rather than an underline. */
export const BTN_LINE =
  'inline-flex items-center gap-2.5 rounded-pill border border-line-2 px-[24px] py-[15px] text-[13px] ' +
  'font-semibold uppercase tracking-[.08em] text-ink transition duration-200 ease-brand ' +
  'hover:-translate-y-0.5 hover:border-green/50 hover:bg-green-glow hover:text-green';

/* ---------- Layout ---------- */

export function Wrap({className, children}: {className?: string; children: ReactNode}) {
  return (
    <div className={cn('mx-auto w-full max-w-[1220px] px-5 min-[760px]:px-[34px]', className)}>
      {children}
    </div>
  );
}

export function Section({
  id,
  alt,
  hairline,
  className,
  children
}: {
  id?: string;
  /** Renders the section on the raised `--color-bg-2` ground. */
  alt?: boolean;
  /**
   * Divides with a rule instead of a ground. Used wherever a page sits on a
   * light field: an opaque block would punch a hole in it, and #00060f against
   * #040d1a is too small a step to divide anything on its own anyway.
   */
  hairline?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        'scroll-mt-20 py-15 min-[760px]:py-25',
        alt && 'bg-bg-2',
        hairline && 'border-t border-line-2',
        className
      )}
    >
      {children}
    </section>
  );
}

/* ---------- Headings ---------- */

const RULE = 'h-px bg-[linear-gradient(90deg,var(--color-green),var(--color-blue))]';

export function Eyebrow({
  tone = 'green',
  size = 'section',
  className,
  children
}: {
  tone?: 'green' | 'blue';
  size?: 'section' | 'hero';
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2.5 text-[11.5px] font-semibold uppercase tracking-[.22em]',
        tone === 'blue' ? 'text-blue' : 'text-green',
        size === 'hero' ? 'mb-[26px]' : 'mb-[18px]',
        className
      )}
    >
      <span className={cn(RULE, size === 'hero' ? 'w-[26px]' : 'w-[22px]')} />
      {children}
    </div>
  );
}

export function SectionTitle({className, children}: {className?: string; children: ReactNode}) {
  return (
    <h2
      className={cn(
        'mb-4 font-display text-[clamp(30px,4.2vw,50px)] font-semibold uppercase leading-[1.02] tracking-[-0.005em]',
        className
      )}
    >
      {children}
    </h2>
  );
}

export function SectionBody({className, children}: {className?: string; children: ReactNode}) {
  return (
    <p className={cn('text-[17px] font-light leading-[1.65] text-muted', className)}>{children}</p>
  );
}

export function SectionHead({
  eyebrow,
  tone = 'green',
  index,
  title,
  body
}: {
  eyebrow: ReactNode;
  tone?: 'green' | 'blue';
  /** "03 / 06" — makes a run of identical heads read as one sequence. */
  index?: string;
  title: ReactNode;
  body?: ReactNode;
}) {
  return (
    <div className="mb-13 max-w-[700px]">
      <div className="flex items-baseline gap-4">
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        {index ? <span className="mono mb-[18px] text-[11px] text-faint">{index}</span> : null}
      </div>
      <SectionTitle>{title}</SectionTitle>
      {body ? <SectionBody>{body}</SectionBody> : null}
    </div>
  );
}

/* ---------- Detail panel ---------- */

/**
 * The bordered explainer panel that sits beneath a selector strip. When
 * `attached` it drops its top border so it reads as one unit with the strip
 * above; otherwise it stands alone with a full border and top margin.
 */
export function DetailPanel({
  heading,
  attached = true,
  className,
  children
}: {
  heading: ReactNode;
  attached?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        'grid items-start gap-4 bg-glass p-[22px] backdrop-blur-[14px]',
        'min-[760px]:grid-cols-[200px_1fr] min-[760px]:gap-[30px] min-[760px]:px-[30px] min-[760px]:py-[26px]',
        attached
          ? 'ring-lit-open-top rounded-b-frame'
          : 'ring-lit mt-[22px] rounded-frame shadow-lift',
        className
      )}
    >
      <div className="font-display text-2xl font-semibold uppercase leading-[1.1] text-green">
        {heading}
      </div>
      <div className="text-[15.5px] font-light leading-[1.68] text-muted [&_b]:font-medium [&_b]:text-ink">
        {children}
      </div>
    </div>
  );
}


/**
 * The gradient hairline along the top of a panel — the entry cards' signature,
 * and the one detail that separates a surface catching light from a box with a
 * border. Sits at 40% until the panel is hovered, where there is a hover.
 */
export function PanelEdge({
  tone = 'brand',
  className
}: {
  tone?: 'brand' | 'blue';
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-x-0 top-0 h-px opacity-40 transition-opacity duration-250 group-hover:opacity-100',
        tone === 'blue'
          ? 'bg-[linear-gradient(90deg,var(--color-blue),var(--color-purple))]'
          : 'bg-[linear-gradient(90deg,var(--color-green),var(--color-blue))]',
        className
      )}
    />
  );
}

/* ---------- Status ---------- */

/**
 * The glyph a status wears. Six statuses is more than hue can carry — the
 * palette puts blue and purple at ΔE 1.1 under protanopia — so the shape is
 * the identity and the colour is the reinforcement, never the other way round.
 */
const GLYPHS: Record<StatusGlyph, ReactNode> = {
  tick: <path d="M2.5 7 5.5 10 11.5 3.5" />,
  eye: (
    <>
      <path d="M1 7s2.4-3.6 6-3.6S13 7 13 7s-2.4 3.6-6 3.6S1 7 1 7Z" />
      <circle cx="7" cy="7" r="1.6" />
    </>
  ),
  bang: (
    <>
      <path d="M7 2.5v5" />
      <path d="M7 11h.01" />
    </>
  ),
  spanner: <path d="M9.4 2.2a3.4 3.4 0 0 0-4 4.4L2.4 9.6a1.3 1.3 0 0 0 1.9 1.9l3-3a3.4 3.4 0 0 0 4.4-4l-2 2-1.9-.5-.5-1.9z" />,
  rise: (
    <>
      <path d="M2.5 10.5 7 6l2.2 2.2L12 4.6" />
      <path d="M8.8 4.4H12v3.2" />
    </>
  ),
  alert: (
    <>
      <path d="M7 1.8 12.8 11.6H1.2z" />
      <path d="M7 5.6v2.6" />
      <path d="M7 10.1h.01" />
    </>
  )
};

export function StatusGlyphIcon({glyph, className}: {glyph: StatusGlyph; className?: string}) {
  return (
    <svg
      viewBox="0 0 14 14"
      className={cn("h-3.5 w-3.5 shrink-0", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {GLYPHS[glyph]}
    </svg>
  );
}

/** Glyph, label and colour together — the unit an operator scans for. */
export function StatusChip({
  glyph,
  tone,
  children,
  className
}: {
  glyph: StatusGlyph;
  tone: StatusTone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill border border-current/25 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[.1em]",
        TONE_TEXT[tone],
        className
      )}
    >
      <StatusGlyphIcon glyph={glyph} className="h-3 w-3" />
      {children}
    </span>
  );
}

/* ---------- Hairline grids ---------- */

/** Shared 1px-gap grid treatment: the gap itself is the hairline. Clipped to a
    radius so the block reads as one object rather than as loose cells. */
export const HAIRLINE_GRID =
  'ring-lit grid gap-px overflow-hidden rounded-frame bg-line-2';

/**
 * Add to any hairline grid that has a DetailPanel attached beneath it. Without
 * it the grid keeps its rounded bottom corners while the panel arrives square,
 * and the seam shows a notch on both sides.
 */
export const ATTACHED_ABOVE = 'rounded-b-none';

export function StatGrid({
  attached,
  className,
  children
}: {
  /** Squares the bottom corners for a DetailPanel sitting under it. */
  attached?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        HAIRLINE_GRID,
        'grid-cols-1 min-[520px]:grid-cols-2 min-[820px]:grid-cols-3',
        attached && ATTACHED_ABOVE,
        className
      )}
    >
      {children}
    </div>
  );
}

export function StatCard({
  dot,
  name,
  description,
  onClick,
  className
}: {
  /** Palette tone for the status dot, or `muted` for the unselected state. */
  dot: StatusTone | 'muted';
  name: ReactNode;
  description: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const Tag = onClick ? 'button' : 'div';

  return (
    <Tag
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={cn(
        'group relative glass px-[22px] py-6 text-left',
        onClick && 'cursor-pointer transition duration-250 ease-brand hover:-translate-y-0.5 hover:bg-panel-2/70',
        className
      )}
    >
      <div
        className={cn(
          'mb-3.5 h-2 w-2 rounded-full transition-colors',
          dot === 'muted' ? 'bg-line-2' : TONE_BG[dot]
        )}
      />
      <div className="mb-[7px] font-display text-[22px] font-semibold uppercase">{name}</div>
      <div className="text-sm font-light leading-[1.55] text-muted">{description}</div>
    </Tag>
  );
}

/* ---------- Product chrome ---------- */

/** The mock browser frame used to present the Command Centre. */
export function BrowserFrame({
  url,
  badge,
  className,
  bodyClassName,
  children
}: {
  url: string;
  badge: string;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        'ring-lit shadow-lift overflow-hidden rounded-frame bg-glass backdrop-blur-[14px]',
        className
      )}
    >
      <div className="glass-solid flex items-center gap-[11px] border-b border-line-2 px-5 py-[13px]">
        <div className="flex gap-1.5">
          <i className="h-[9px] w-[9px] rounded-full bg-white/15" />
          <i className="h-[9px] w-[9px] rounded-full bg-white/15" />
          <i className="h-[9px] w-[9px] rounded-full bg-white/15" />
        </div>
        <span className="mono ml-2 truncate text-[11.5px] text-faint">{url}</span>
        <span className="ml-auto shrink-0 rounded-pill border border-line px-3 py-1 text-[10px] font-bold uppercase tracking-[.14em] text-green">
          {badge}
        </span>
      </div>
      <div className={cn('p-4 min-[760px]:p-6', bodyClassName)}>{children}</div>
    </div>
  );
}

/**
 * The handset the consumer journey is presented in — the companion to
 * `BrowserFrame`, which carries the operator's view. The split matters: the
 * business journey shows a console someone sits at, and this one shows the
 * thing that arrives on a phone without being asked for.
 */
/** A machined side button: dark, with the rail's own highlight along its edge. */
const BTN_SIDE = 'absolute w-[3px] bg-[image:var(--device-button)]';

export function DeviceFrame({
  carrier,
  time,
  className,
  children
}: {
  /** Sits where a network name would, naming who the app belongs to. */
  carrier: string;
  time: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn('relative mx-auto w-full max-w-[336px]', className)}>
      {/* Side hardware. Drawn on the outer rail and pushed a few pixels past
          its edge, which is the detail that stops a rounded rectangle reading
          as a rounded rectangle. */}
      <span aria-hidden="true" className={cn(BTN_SIDE, '-left-[3px] top-[104px] h-[26px] rounded-l-[2px]')} />
      <span aria-hidden="true" className={cn(BTN_SIDE, '-left-[3px] top-[148px] h-[46px] rounded-l-[2px]')} />
      <span aria-hidden="true" className={cn(BTN_SIDE, '-left-[3px] top-[204px] h-[46px] rounded-l-[2px]')} />
      <span aria-hidden="true" className={cn(BTN_SIDE, '-right-[3px] top-[166px] h-[68px] rounded-r-[2px]')} />

      {/* The rail: a bright gradient hairline standing in for brushed metal
          catching the room. It is the frame's only light source, so the two
          lit corners sit opposite each other rather than all round. */}
      <div
        className="relative rounded-[46px] p-[3px] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.95),0_10px_30px_-12px_rgba(0,0,0,0.8)]"
        style={{background: 'var(--device-rail)'}}
      >
        {/* The body between rail and glass. */}
        <div className="rounded-[43px] bg-[var(--device-body)] p-[9px]">
          <div className="relative overflow-hidden rounded-[35px] bg-panel">
            {/* Status bar — time left, hardware right, the way a phone
                actually reads. The island sits over it, not beside it. */}
            <div className="relative flex items-center justify-between px-6 pb-1.5 pt-3.5 text-[13px] font-semibold text-ink">
              <span className="tabular-nums">{time}</span>

              <span
                aria-hidden="true"
                className="absolute left-1/2 top-2.5 flex h-[27px] w-[88px] -translate-x-1/2 items-center justify-end rounded-pill bg-black pr-3"
              >
                {/* The lens, catching a little of the same light as the rail. */}
                <span className="h-[9px] w-[9px] rounded-full bg-[#0b1a2c] ring-1 ring-white/10" />
              </span>

              <span className="flex items-center gap-[5px] text-ink">
                <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor" aria-hidden="true">
                  <rect y="7.5" width="3" height="3.5" rx="1" />
                  <rect x="4.6" y="5.4" width="3" height="5.6" rx="1" />
                  <rect x="9.2" y="2.9" width="3" height="8.1" rx="1" />
                  <rect x="13.8" width="3" height="11" rx="1" opacity="0.35" />
                </svg>
                <svg
                  width="15"
                  height="11"
                  viewBox="0 0 15 11"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M1 3.9a9.4 9.4 0 0 1 13 0" />
                  <path d="M3.7 6.6a5.9 5.9 0 0 1 7.6 0" />
                  <circle cx="7.5" cy="9.4" r="0.9" fill="currentColor" stroke="none" />
                </svg>
                <svg width="25" height="12" viewBox="0 0 25 12" aria-hidden="true">
                  <rect
                    x="0.6"
                    y="0.6"
                    width="21"
                    height="10.8"
                    rx="3.4"
                    fill="none"
                    stroke="currentColor"
                    opacity="0.4"
                  />
                  <rect x="2.3" y="2.3" width="13.6" height="7.4" rx="2" fill="currentColor" />
                  <path d="M23 4.3v3.4a2 2 0 0 0 0-3.4Z" fill="currentColor" opacity="0.4" />
                </svg>
              </span>
            </div>

            {/* App identity. The installer's name belongs here, on the app, not
                in the status bar where a carrier would sit. */}
            <div className="mt-1.5 flex items-center justify-center gap-2 px-6 pb-1">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" />
              <span className="text-[10.5px] font-bold uppercase tracking-[.16em] text-faint">
                {carrier}
              </span>
            </div>

            <div className="px-4 pb-3 pt-1">{children}</div>

            <div className="mx-auto mb-2.5 h-[5px] w-[112px] rounded-pill bg-ink/25" />

            {/* Specular sheen across the glass, above the app and below nothing. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background: 'var(--device-glare)'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Closing call to action ---------- */

/**
 * The centred sign-off that ends each journey: headline, one line of standfirst
 * and a single action. `action` is supplied by the caller because one journey
 * scrolls to an anchor and the other routes to the opposite journey.
 */
export function ClosingSection({
  title,
  body,
  bodyClassName,
  action
}: {
  title: ReactNode;
  body: ReactNode;
  bodyClassName?: string;
  action: ReactNode;
}) {
  return (
    <Section hairline>
      <Wrap className="text-center">
        <Reveal>
          <SectionTitle>{title}</SectionTitle>
        </Reveal>
        <Reveal>
          <SectionBody className={cn('mx-auto mb-[34px]', bodyClassName ?? 'max-w-[520px]')}>
            {body}
          </SectionBody>
        </Reveal>
        <Reveal>{action}</Reveal>
      </Wrap>
    </Section>
  );
}
