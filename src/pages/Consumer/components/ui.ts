/**
 * The consumer journey's design scale.
 *
 * The page had five different card radii and ten different paddings, chosen
 * one component at a time. That is what makes a layout look assembled rather
 * than designed: nothing is *wrong* on its own, but no two things agree, so
 * the eye finds no system underneath and reads the whole page as arbitrary.
 *
 * Three sizes of everything, and nothing outside them. A card is one of two
 * radii, a padding is one of three, type is one of six steps. Restricting the
 * choices is the design — a page where every value is deliberate looks
 * deliberate even when no single value is remarkable.
 */

/* ---------- Shape ---------- */

/** Small things inside a card: icon tiles, inset panels, inputs. */
export const R_TILE = 'rounded-[12px]';
/** The default card. */
export const R_CARD = 'rounded-[18px]';
/** The one card per screen that carries the screen. */
export const R_FEATURE = 'rounded-[24px]';

/* ---------- Space ---------- */

export const PAD_CARD = 'p-6 min-[760px]:p-8';
export const PAD_FEATURE = 'p-8 min-[760px]:p-11';
export const PAD_COMPACT = 'p-5';

/** Between cards in a group, between groups, between major blocks. */
export const GAP_TIGHT = 'gap-4';
export const GAP_BLOCK = 'mt-10';
export const GAP_MAJOR = 'mt-16';

/* ---------- Depth ---------- */

/**
 * Three weights, used for three meanings: a hairline for a plain surface, a
 * lift for something chosen, a deeper lift for the point of the screen. One
 * shadow copied onto everything is what flattens a page of cards into a grid
 * of identical boxes.
 */
export const RING = 'ring-1 ring-line-2';
export const LIFT = '0 16px 36px -22px rgba(12,38,68,0.3), inset 0 1px 0 rgba(255,255,255,0.85)';
export const LIFT_FEATURE =
  '0 34px 74px -38px rgba(12,38,68,0.38), 0 3px 10px -5px rgba(12,38,68,0.1), inset 0 1px 0 rgba(255,255,255,0.9)';

/** A plain panel, held by its hairline. */
export const PANEL = `${R_CARD} bg-panel ${RING}`;

/* ---------- Type ---------- */

/** The page's own voice: condensed, uppercase. Hero and result headline only. */
export const T_DISPLAY =
  'font-display font-semibold uppercase leading-[0.96] tracking-[-0.015em]';
/** A statement, one step under a step headline. */
export const T_STATEMENT =
  'font-display text-[clamp(26px,3.4vw,42px)] font-semibold uppercase leading-[1.04] tracking-[-0.01em] text-ink';
/** The headline of a step. */
export const T_LEAD =
  'font-display text-[clamp(32px,4.8vw,58px)] font-semibold uppercase leading-[1.0] tracking-[-0.015em] text-ink';

/** A card or block heading. */
export const T_HEADING = 'text-[18px] font-normal leading-[1.3] tracking-[-0.01em] text-ink';
/** Running copy. */
export const T_BODY = 'text-[16px] font-light leading-[1.65] text-muted';
/** Supporting copy inside a card. */
export const T_SMALL = 'text-[14px] font-light leading-[1.55] text-muted';
/** The small caps that opens a block. */
export const T_LABEL = 'text-[10.5px] font-bold uppercase tracking-[.18em]';

/* ---------- Controls ---------- */

/**
 * The one action on a screen. Sentence case at a comfortable size — the
 * site-wide uppercase, bold, wide-tracked pill is right for the dark journeys
 * and reads as shouting here.
 */
export const ACTION =
  'inline-flex items-center justify-center gap-2.5 rounded-full bg-brand-gradient px-8 py-4 ' +
  'text-[15.5px] font-medium tracking-[-0.005em] text-bg ' +
  'shadow-[0_14px_34px_-14px_var(--btn-glow)] transition duration-250 ease-brand ' +
  'hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[0_22px_46px_-16px_var(--btn-glow)]';

export const ACTION_QUIET =
  'inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-4 text-[15px] ' +
  'font-medium text-muted ring-1 ring-line-2 transition duration-250 ease-brand ' +
  'hover:-translate-y-0.5 hover:text-ink hover:ring-ink/30';

/** A selectable card: the shape every choice on the page shares. */
export const CHOICE =
  `group relative overflow-hidden ${R_CARD} bg-panel text-left ` +
  'transition duration-300 ease-brand hover:-translate-y-1';

/* ---------- Back-compat aliases ---------- */

export const LABEL = T_LABEL;
export const STATEMENT = T_STATEMENT;
export const PANEL_LIFT = LIFT;
export const PANEL_FEATURE = LIFT_FEATURE;
