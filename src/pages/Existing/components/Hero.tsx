import Reveal from '../../../components/Reveal';
import SolarShine from '../../../components/SolarShine';
import Glyph from '../../../components/Glyph';
import {ACTION, Wrap} from '../../../components/ui';

/** What Guardian Care can tell an existing solar owner, before it knows anything. */
const PROMISES = [
  'What your system was designed to generate',
  'What it may be generating now',
  'How much electricity you could be using yourself',
  'Whether surplus is being stored or sent back to the grid',
  'How much electricity you are still paying the grid for',
  'What could potentially be improved'
];

/**
 * The opening.
 *
 * It does not sell a system — the reader already owns one. It offers to explain
 * the one they have, which is why the headline is about *today* and the
 * standfirst is about everything that has changed since the install.
 */
export default function Hero() {
  return (
    <header className="relative isolate overflow-hidden pb-16 pt-14 min-[760px]:pb-24 min-[760px]:pt-20">
      <SolarShine />

      <Wrap>
        <div className="max-w-[720px]">
          <Reveal className="mb-6 inline-flex items-center gap-3 rounded-pill border border-line bg-panel/70 px-4 py-2 text-[11px] font-bold uppercase tracking-[.16em] text-green backdrop-blur-[10px]">
            <Glyph name="existing" className="h-4 w-4" />
            Already have solar?
          </Reveal>

          <Reveal
            as="h1"
            delay={0.05}
            className="font-display text-[clamp(34px,5.4vw,62px)] font-semibold uppercase leading-[1.0] tracking-[-0.015em] text-ink"
          >
            Understand what your
            <br />
            solar system is doing
            <br />
            <span className="text-brand-gradient">today</span>
          </Reveal>

          <Reveal
            as="p"
            delay={0.1}
            className="mt-6 max-w-[560px] text-[17px] font-light leading-[1.65] text-muted min-[760px]:text-[18.5px]"
          >
            Not what it was designed to do years ago. Your energy costs, household usage, equipment
            and electricity tariff may all have changed considerably since the day it was installed
            — and nothing has been recalculating around them.
          </Reveal>

          <Reveal delay={0.16} className="mt-8">
            <a href="#check" className={ACTION}>
              Check my solar system
            </a>
          </Reveal>
        </div>

        {/* What the page is actually offering, stated as a list rather than as
            another paragraph — a reader deciding whether to spend two minutes on
            a questionnaire wants to see the return before they start. */}
        <Reveal delay={0.22} className="mt-12 max-w-[860px] rounded-[22px] bg-panel/85 p-6 ring-1 ring-line-2 backdrop-blur-[12px] min-[760px]:p-8">
          <div className="text-[10.5px] font-bold uppercase tracking-[.18em] text-green">
            Guardian Care helps you understand
          </div>
          <ul className="mt-5 grid gap-x-8 gap-y-3 min-[700px]:grid-cols-2">
            {PROMISES.map((line) => (
              <li key={line} className="flex items-start gap-3 text-[15px] font-light leading-[1.5] text-ink/85">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-green" />
                {line}
              </li>
            ))}
          </ul>
        </Reveal>
      </Wrap>
    </header>
  );
}
