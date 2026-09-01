import Counter from '../../../components/Counter';
import Reveal from '../../../components/Reveal';
import {HAIRLINE_GRID, Section, SectionHead, Wrap} from '../../../components/ui';
import DayCurve from './DayCurve';
import Photo from './Photo';
import {SHIFT_OPPORTUNITY, TARIFF, TODAY_HEADLINE, TODAY_VALUE} from '../../../data/energyDay';
import {TONE_TEXT} from '../../../data/command';
import {cn} from '../../../lib/cn';

/**
 * The shape of the day, and then what it was worth.
 *
 * This is the page's one break from its own container. Everything else lives
 * inside the 1220px measure, which is right for reading and wrong for the only
 * thing on the page that is a picture of a whole day — so the plot steps
 * outside it, edge to edge, ruled top and bottom, with no card around it. The
 * page needs one moment of scale and this is the section that has earned it;
 * a second would just be noise.
 *
 * Money belongs here because it is why the household bought solar in the first
 * place, and because a saving they can check is the difference between a
 * dashboard and a reason to open one. It sits *after* the chart on purpose: the
 * figure only means anything once the reader has seen where the energy went,
 * and the tariff it rests on is named rather than buried, so the number can be
 * argued with. The photograph beside the recommendation is earning its place —
 * the advice is about a dishwasher at one in the afternoon, and it should look
 * like a kitchen rather than like a tip.
 */
export default function SolarDay() {
  return (
    <Section id="c-day">
      <Wrap>
        <Reveal>
          <SectionHead
            eyebrow="Your solar day"
            tone="blue"
            title={
              <>
                When the sun arrives.
                <br />
                <span className="text-brand-gradient">And when you actually use it.</span>
              </>
            }
            body="Almost every question a solar owner has comes down to one gap: the roof produces at midday and the household lives in the evening. This is that gap, for today."
          />
        </Reveal>
      </Wrap>

      {/* Outside the measure. The rules run to the viewport edges; the plot
          itself stops at 1500 so its labels do not balloon on a wide display. */}
      <Reveal className="border-y border-line-2 bg-bg/35 py-9 backdrop-blur-sm min-[760px]:py-12">
        <div className="mx-auto max-w-[1500px] px-5 min-[760px]:px-10">
          <DayCurve />
        </div>
      </Reveal>

      <Wrap>
        <Reveal className="mt-[34px] grid grid-cols-1 gap-[18px] min-[900px]:grid-cols-[1.05fr_1fr]">
          {/* The headline figure, with the counterfactual beside it — a saving
              means nothing without the bill it is being compared against. */}
          <div className="shadow-lift rounded-card border border-line bg-[linear-gradient(150deg,var(--color-green-glow),transparent)] p-[26px] backdrop-blur-sm">
            <div className="mb-4 text-[10.5px] font-bold uppercase tracking-[.16em] text-faint">
              What today was worth
            </div>
            <Counter
              value={TODAY_HEADLINE.worth}
              className="block font-display text-[64px] font-semibold leading-none text-green"
            />
            <p className="mt-4 text-[15.5px] font-light leading-[1.7] text-muted">
              Without solar, today&rsquo;s electricity would have cost{' '}
              <b className="font-medium text-ink">{TODAY_HEADLINE.withoutSolar}</b>. It cost you{' '}
              <b className="font-medium text-ink">{TODAY_HEADLINE.actual}</b>.
            </p>
            <p className="mt-4 border-t border-line-2 pt-4 text-[12.5px] font-light leading-[1.6] text-faint">
              Worked out from your readings and your tariff — {TARIFF.market}, buying at{' '}
              {Math.round(TARIFF.importRate * 100)}c a unit and credited{' '}
              {Math.round(TARIFF.exportRate * 100)}c for one exported.
            </p>
          </div>

          <div className={cn(HAIRLINE_GRID, 'grid-cols-1')}>
            {TODAY_VALUE.map((line) => (
              <div key={line.label} className="bg-panel/75 px-[22px] py-[18px] backdrop-blur-sm">
                <div className="flex items-baseline justify-between gap-4">
                  <div className="text-[14.5px] font-light text-muted">{line.label}</div>
                  <Counter
                    value={line.value}
                    className={cn('mono shrink-0 text-[19px] font-semibold', TONE_TEXT[line.tone])}
                  />
                </div>
                <div className="mt-1.5 text-[12.5px] font-light leading-[1.5] text-faint">
                  {line.note}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="shadow-lift mt-[18px] grid grid-cols-1 overflow-hidden rounded-card border border-line min-[760px]:grid-cols-[minmax(0,300px)_1fr]">
          <Photo
            src="/assets/photos/kitchen.jpg"
            alt="A kitchen in the evening"
            veil={false}
            className="min-h-[190px]"
            imgClassName="opacity-85"
          />
          <div className="glass p-[26px] min-[760px]:px-[30px] min-[760px]:py-[28px]">
            <div className="font-display text-2xl font-semibold uppercase leading-[1.1] text-green">
              Worth doing
            </div>
            <div className="mono mb-4 mt-1.5 text-[13px] text-faint">
              {SHIFT_OPPORTUNITY.perRun} a run · {SHIFT_OPPORTUNITY.perYear} a year
            </div>
            <p className="text-[15.5px] font-light leading-[1.68] text-muted">
              {SHIFT_OPPORTUNITY.detail} Guardian Care does not ask you to watch a graph and work
              this out — it tells your solar company, and they tell you.
            </p>
          </div>
        </Reveal>

        <p className="mt-5 text-[12.5px] font-light leading-[1.6] text-faint">
          Figures throughout are one illustrative household on an Australian tariff. Your readings,
          currency and export scheme come from your system and your retailer.
        </p>
      </Wrap>
    </Section>
  );
}
