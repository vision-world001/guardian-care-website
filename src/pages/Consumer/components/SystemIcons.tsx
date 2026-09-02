import type {SystemKey} from '../../../data/consumerFlow';

/**
 * The four kinds of home, drawn.
 *
 * A choice with a picture on it is a different act from a choice with a label
 * on it: the eye recognises a battery before it reads the word "battery", and
 * on the one screen where this page asks a stranger to identify their own
 * house, recognition is the whole job.
 *
 * Drawn in a shared 44×44 box on a 2px stroke so the four read as one set.
 * The weight is set for the 32px they render at inside a card tile — the
 * thinner stroke this file carried was tuned for a larger box and washed out.
 * `currentColor` throughout, so a card can light its own icon without the icon
 * knowing anything about the card.
 */
export default function SystemIcon({system}: {system: SystemKey}) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const
  };

  return (
    <svg viewBox="0 0 44 44" className="h-8 w-8" aria-hidden="true" {...common}>
      {system === 'solar' ? (
        <>
          {/* A roof with a module on it. */}
          <path d="M5 20 22 8l17 12" />
          <path d="M9 22v14h26V22" />
          <rect x="14" y="24" width="16" height="10" rx="1.5" />
          <path d="M19.5 24v10M25 24v10M14 29h16" strokeWidth="1.3" />
        </>
      ) : null}

      {system === 'solar-battery' ? (
        <>
          <path d="M4 19 19 8l15 11" />
          <path d="M8 21v15h14V21" />
          <rect x="12" y="23" width="7" height="9" rx="1" />
          {/* The cell, charged, standing beside the house. */}
          <rect x="27" y="21" width="12" height="16" rx="2.5" />
          <path d="M31 18.5h4" />
          <path d="M29.5 28.5h7v6h-7z" fill="currentColor" stroke="none" opacity="0.35" />
        </>
      ) : null}

      {system === 'older' ? (
        <>
          <path d="M5 20 22 8l17 12" />
          <path d="M9 22v14h18" />
          <rect x="13" y="24" width="12" height="8" rx="1.5" />
          {/* Years on the clock. */}
          <circle cx="33" cy="31" r="7" />
          <path d="M33 27.5V31l2.5 1.8" strokeWidth="1.4" />
        </>
      ) : null}

      {system === 'unsure' ? (
        <>
          <path d="M5 20 22 8l17 12" />
          <path d="M9 22v14h26V22" />
          <path
            d="M19.2 26.4a3 3 0 1 1 3.9 2.9v2.1"
            strokeWidth="1.9"
          />
          <path d="M23.1 34.6h.02" strokeWidth="2.1" />
        </>
      ) : null}
    </svg>
  );
}
