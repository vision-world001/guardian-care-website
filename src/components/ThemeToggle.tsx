import {useTheme} from '../lib/theme';
import {cn} from '../lib/cn';

/**
 * The switch between the two rooms.
 *
 * It shows the mark of the theme it will *give* you, not the one you are in —
 * a sun on the dark page, a moon on the light one — because that is what a
 * control is for. Both readings are defensible and the argument is endless;
 * the label settles it out loud for anybody who cannot see the difference, and
 * `aria-pressed` states the current position for anybody who cannot see the
 * mark at all.
 *
 * Two marks, drawn here rather than in Glyph. Everything in that set is a
 * quantity the platform measures — generation, storage, cost — and a sun that
 * means "make the page white" sitting next to a sun that means "this is what
 * your roof made today" is a collision worth avoiding.
 */
export default function ThemeToggle({className}: {className?: string}) {
  const {theme, toggle} = useTheme();
  const toDay = theme === 'night';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={theme === 'day'}
      aria-label={toDay ? 'Switch to the light theme' : 'Switch to the dark theme'}
      title={toDay ? 'Light theme' : 'Dark theme'}
      className={cn(
        /* 34px on a phone, 38 from tablet up. Below the 44px touch target the
           guidelines ask for, and deliberately: this sits between the lockup
           and the one button the bar exists for, and a 44px square there is
           what pushes that button off a 320px screen. The row itself is 50px
           tall and the control is centred in it, so the comfortable strip a
           thumb actually lands on is the full height of the bar. */
        'grid h-[34px] w-[34px] shrink-0 place-items-center rounded-pill border border-line-2 text-faint min-[520px]:h-[38px] min-[520px]:w-[38px]',
        'transition duration-200 ease-brand hover:border-line hover:bg-ink/5 hover:text-ink',
        className
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-[17px] w-[17px]"
      >
        {toDay ? (
          <>
            <circle cx="12" cy="12" r="4.3" />
            <path d="M12 2.6v2.3M12 19.1v2.3M2.6 12h2.3M19.1 12h2.3M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4 17 7M7 17l-1.6 1.6" />
          </>
        ) : (
          /* A crescent as one closed path rather than two overlapping circles:
             the two-circle trick needs the upper one filled in the page's own
             colour, which is exactly the thing that breaks the moment this
             control is placed on a surface that is not the page. */
          <path d="M20.5 14.3A8.8 8.8 0 0 1 9.7 3.5a8.8 8.8 0 1 0 10.8 10.8Z" />
        )}
      </svg>
    </button>
  );
}
