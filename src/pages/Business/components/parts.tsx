import {CC_CUSTOMERS, CC_MIX, TONE_BG, TONE_TEXT, type PortfolioBand} from '../../../data/command';
import {cn} from '../../../lib/cn';

/* ============================================================
   The business page's own vocabulary.

   One idea carries this page the way the kilowatt-hour square carries the
   planning journey: one dot is one customer. The hero draws all 1,245 of them
   at once, and every section afterwards is about what you can do once you can
   see them — which is a thing that has to be shown rather than claimed, because
   "portfolio visibility" is a phrase every platform in this market uses and
   none of them draws.

   The fifty-one hollow dots are the sales argument. They are records the
   company already owns and cannot currently see, and a reader who runs an
   installation business recognises them immediately.
   ============================================================ */

/* ---------- The portfolio ---------- */

/**
 * A deterministic shuffle.
 *
 * The dots have to be interleaved — six solid blocks of colour would read as a
 * stacked bar chart, and the whole point is that attention is scattered across
 * a population rather than gathered in one place. But it has to be the *same*
 * scatter on every render: a field that reshuffles when React re-renders reads
 * as a loading state, and one that differs between server and client is a
 * hydration mismatch. So it is a seeded pass, run once at module scope.
 */
function shuffled(bands: PortfolioBand[]): PortfolioBand[] {
  const field = bands.flatMap((band) => Array.from({length: band.count}, () => band));

  /* A small linear congruential generator — the constants are the usual
     ones from Numerical Recipes. Any deterministic source would do; this one
     fits on a line and needs no dependency. */
  let seed = 20260921;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };

  for (let index = field.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1));
    [field[index], field[swap]] = [field[swap], field[index]];
  }

  return field;
}

const FIELD = shuffled(CC_MIX);

/**
 * Every customer, at once.
 *
 * Forty-five columns at any width. The dots get small on a phone and that is
 * the correct behaviour — at 4px they stop being countable and start being a
 * population, which is the reading the section wants anyway. What must not
 * change is the count: a sampled field labelled "1,245 customers" would be the
 * one dishonest drawing on the site.
 *
 * The red dots blip. Nothing else moves, so the eye lands on the forty-two
 * that need somebody today without being told to — the same job the section's
 * headline would otherwise have to do in words.
 */
export function Portfolio({className}: {className?: string}) {
  return (
    <div
      role="img"
      aria-label={`${CC_CUSTOMERS.toLocaleString('en-GB')} customers, ${CC_MIX.filter((band) => band.tone !== 'green')
        .map((band) => `${band.count} ${band.label.toLowerCase()}`)
        .join(', ')}`}
      className={cn(
        'grid grid-cols-[repeat(45,minmax(0,1fr))] gap-[1.5px] min-[520px]:gap-[2.5px]',
        className
      )}
    >
      {FIELD.map((band, index) => (
        <span
          key={index}
          className={cn(
            'block aspect-square rounded-[1px]',
            band.hollow
              ? 'bg-ink/[0.07] ring-1 ring-inset ring-ink/20'
              : TONE_BG[band.tone],
            band.tone === 'red' && 'animate-blip',
            /* The healthy majority is held back a little. At full strength a
               thousand lit dots flare into a solid sheet and the sixty that
               matter disappear into it. */
            band.tone === 'green' && 'opacity-55'
          )}
        />
      ))}
    </div>
  );
}

/** The key beneath the field. Read left to right, in the field's own order. */
export function PortfolioKey({className}: {className?: string}) {
  return (
    <ul className={cn('flex flex-wrap items-center gap-x-5 gap-y-2', className)}>
      {CC_MIX.map((band) => (
        <li key={band.label} className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className={cn(
              'block h-2.5 w-2.5 shrink-0 rounded-[2px]',
              band.hollow ? 'bg-ink/[0.07] ring-1 ring-inset ring-ink/25' : TONE_BG[band.tone]
            )}
          />
          <span className={cn('mono text-[11.5px] font-semibold', TONE_TEXT[band.tone])}>
            {band.count}
          </span>
          <span className="text-[12.5px] font-light leading-none text-muted">{band.label}</span>
        </li>
      ))}
    </ul>
  );
}

