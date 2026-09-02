import {cn} from '../../../lib/cn';
import {ACTION_QUIET} from './ui';

/**
 * The way out of a step.
 *
 * With one step on screen and the others unrendered, a visitor who wants to
 * change an answer has no browser affordance to reach for — back would leave
 * the site. This is the only exit, so it sits top-left of the step, where
 * every application has taught people to look for it.
 *
 * Built from the same pill as every other control on the page rather than as a
 * bordered circle and a caption. One button shape across a journey is most of
 * what makes a set of screens feel like one product.
 */
export default function StepBack({label, onClick}: {label: string; onClick: () => void}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(ACTION_QUIET, 'group mb-10 px-5 py-2.5 text-[13.5px]')}
    >
      <span
        aria-hidden="true"
        className="transition-transform duration-250 ease-brand group-hover:-translate-x-0.5"
      >
        ←
      </span>
      {label}
    </button>
  );
}
