import Glyph from '../../../components/Glyph';
import Reveal from '../../../components/Reveal';
import SolarShine from '../../../components/SolarShine';
import {ACTION, Wrap} from '../../../components/ui';

/** What the assessment is actually built from — stated before it is asked for. */
const INPUTS = [
  'What you pay each month',
  'What you pay per kWh',
  'Your standing charge',
  'Whether you have an off-peak tariff',
  'How much of your electricity could be generated at the property',
  'Whether storage could help you use more of it later'
];

/**
 * The opening.
 *
 * Deliberately not a solar page. It opens on the reader's electricity bill,
 * because that is the number the whole decision turns on and the one they
 * already know. A generic solar package offered before anybody has established
 * what the property currently pays is a quotation pretending to be advice.
 */
export default function Hero() {
  return (
    <header className="relative isolate overflow-hidden pb-16 pt-14 min-[760px]:pb-24 min-[760px]:pt-20">
      <SolarShine />

      <Wrap>
        <div className="max-w-[740px]">
          <Reveal className="mb-6 inline-flex items-center gap-3 rounded-pill border border-line bg-panel/70 px-4 py-2 text-[11px] font-bold uppercase tracking-[.16em] text-blue backdrop-blur-[10px]">
            <Glyph name="plan" className="h-4 w-4" />
            Looking for solar or storage?
          </Reveal>

          <Reveal
            as="h1"
            delay={0.05}
            className="font-display text-[clamp(34px,5.4vw,62px)] font-semibold uppercase leading-[1.0] tracking-[-0.015em] text-ink"
          >
            Start with what
            <br />
            you are paying
            <br />
            <span className="text-brand-gradient">the grid today</span>
          </Reveal>

          <Reveal
            as="p"
            delay={0.1}
            className="mt-6 max-w-[580px] text-[17px] font-light leading-[1.65] text-muted min-[760px]:text-[18.5px]"
          >
            Rather than starting with a package, Guardian Care builds a picture of your current
            energy position first — and then works out what solar and storage would actually change
            about it.
          </Reveal>

          <Reveal delay={0.16} className="mt-8 flex flex-wrap gap-3">
            <a href="#assess" className={ACTION}>
              See my solar saving estimate
            </a>
          </Reveal>
        </div>

        <Reveal
          delay={0.22}
          className="mt-12 max-w-[880px] rounded-[22px] bg-panel/85 p-6 ring-1 ring-line-2 backdrop-blur-[12px] min-[760px]:p-8"
        >
          <div className="text-[10.5px] font-bold uppercase tracking-[.18em] text-blue">
            What we look at
          </div>
          <ul className="mt-5 grid gap-x-8 gap-y-3 min-[700px]:grid-cols-2">
            {INPUTS.map((line) => (
              <li
                key={line}
                className="flex items-start gap-3 text-[15px] font-light leading-[1.5] text-ink/85"
              >
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
                {line}
              </li>
            ))}
          </ul>

          <p className="mt-7 border-t border-line-2 pt-5 font-display text-[clamp(17px,2.2vw,22px)] font-medium uppercase leading-[1.25] text-ink">
            The goal is simple — generate more of your own electricity, and reduce unnecessary grid
            cost.
          </p>
        </Reveal>
      </Wrap>
    </header>
  );
}
