import Counter from '../../../components/Counter';
import Glyph from '../../../components/Glyph';
import Reveal from '../../../components/Reveal';
import {HAIRLINE_GRID, Section, SectionHead, Wrap} from '../../../components/ui';
import {TONE_TEXT} from '../../../data/command';
import {DAY_TOTALS, TODAY_READINGS} from '../../../data/existing';
import {cn} from '../../../lib/cn';
import DayBalance from './DayBalance';
import Flow from './Flow';

/**
 * One day, three ways.
 *
 * Six totals, then the same day as a shape, then the same day as a set of
 * movements. Deliberately in that order: the tiles say what happened, the chart
 * says when, and the flow says where it went — and the third one only means
 * anything to somebody who has already seen the second.
 *
 * Everything on this page below the connection point comes from one pair of
 * hourly series, so the three views cannot disagree. The tiles are summed from
 * them rather than typed in.
 */
export default function BirdsEye() {
  return (
    <Section id="view" hairline>
      <Wrap>
        <SectionHead
          eyebrow="Your bird’s-eye view"
          index="04 / 06"
          title="Instead of four apps, one summary"
          body="This is a connected property on an ordinary day. Not a demonstration of what the platform could show — the actual shape of what arrives, and the readings every later section is calculated from."
        />

        <Reveal className={cn(HAIRLINE_GRID, 'grid-cols-2 min-[760px]:grid-cols-3')}>
          {TODAY_READINGS.map((reading) => (
            <div key={reading.key} className="bg-panel px-5 py-6 min-[760px]:px-6 min-[760px]:py-7">
              <span className={cn('mb-4 inline-block', TONE_TEXT[reading.tone])}>
                <Glyph name={reading.glyph} className="h-7 w-7" />
              </span>
              <div className="text-[10.5px] font-bold uppercase leading-[1.4] tracking-[.14em] text-faint">
                {reading.label}
              </div>
              <div
                className={cn(
                  'mono mt-3 text-[clamp(26px,3.4vw,38px)] font-semibold leading-none',
                  TONE_TEXT[reading.tone]
                )}
              >
                <Counter value={reading.value} />
                <span className="mono ml-1.5 text-[12px] font-normal text-faint">
                  {reading.unit}
                </span>
              </div>
              <div className="mt-3 text-[13px] font-light leading-[1.5] text-muted">
                {reading.note}
              </div>
            </div>
          ))}
        </Reveal>

        {/* ---------- The shape of the day ---------- */}
        <Reveal className="mt-4 rounded-[22px] bg-panel p-5 ring-1 ring-line-2 min-[760px]:p-8">
          <div className="mb-6 max-w-[640px]">
            <div className="text-[10.5px] font-bold uppercase tracking-[.18em] text-green">
              Your solar day
            </div>
            <h3 className="mt-3 font-display text-[clamp(22px,2.8vw,30px)] font-semibold uppercase leading-[1.08] text-ink">
              The gap is the whole story
            </h3>
            <p className="mt-3 text-[15px] font-light leading-[1.6] text-muted">
              Generation peaks in the early afternoon against a household using well under half of
              it. Demand then holds on into an evening with nothing left to meet it. That mismatch —
              not the size of your system — is why a solar owner still receives a bill.
            </p>
          </div>

          <DayBalance />
        </Reveal>

        {/* ---------- Where it went ---------- */}
        <Reveal className="mt-4 rounded-[22px] bg-panel p-6 ring-1 ring-line-2 min-[760px]:p-8">
          <div className="mb-8 max-w-[640px]">
            <div className="text-[10.5px] font-bold uppercase tracking-[.18em] text-blue">
              Where the electricity went
            </div>
            <h3 className="mt-3 font-display text-[clamp(22px,2.8vw,30px)] font-semibold uppercase leading-[1.08] text-ink">
              {DAY_TOTALS.generated} kWh made. {DAY_TOTALS.direct} kWh kept.
            </h3>
            <p className="mt-3 text-[15px] font-light leading-[1.6] text-muted">
              A little over half the day’s generation left the property, and {DAY_TOTALS.imported} kWh
              was bought back after dark. The empty slot in the middle of this diagram is where that
              surplus had nowhere else to go.
            </p>
          </div>

          <Flow />
        </Reveal>
      </Wrap>
    </Section>
  );
}
