import {useState} from 'react';
import Glyph from '../../../components/Glyph';
import Reveal from '../../../components/Reveal';
import {Section, SectionHead, Wrap} from '../../../components/ui';
import {PILLARS, WITHOUT_CHAIN, WITH_CHAIN} from '../../../data/businessFlow';
import {TONE_TEXT} from '../../../data/command';
import {cn} from '../../../lib/cn';

/**
 * Acquire, Capture, Retain.
 *
 * A selector rather than three stacked sections, because the three are one
 * sequence and a reader should be able to move between them without losing
 * their place. The chain comparison underneath is the argument in one line:
 * the handover is either the end of the relationship or the fourth of seven
 * stages, and there is no version where it is both.
 */
export default function Pillars() {
  const [at, setAt] = useState(0);
  const pillar = PILLARS[at];

  return (
    <Section id="pillars" hairline>
      <Wrap>
        <SectionHead
          eyebrow="Acquire · Capture · Retain"
          index="02 / 05"
          title="Three stages, one customer record"
          body="Nothing is re-keyed between them. What a prospect tells you during acquisition is what your engineer confirms on site, and what your engineer records is what the platform measures against for the life of the system."
        />

        <div className="overflow-hidden rounded-frame ring-lit">
          {/* The three, as a selector strip. */}
          <div className="grid gap-px bg-line-2 min-[760px]:grid-cols-3">
            {PILLARS.map((item, index) => {
              const selected = index === at;

              return (
                <button
                  key={item.key}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setAt(index)}
                  className={cn(
                    'flex items-center gap-4 px-6 py-5 text-left transition duration-250 ease-brand',
                    selected ? 'bg-panel-2/80' : 'glass hover:bg-panel-2/50'
                  )}
                >
                  <span className={cn(selected ? TONE_TEXT[item.tone] : 'text-faint')}>
                    <Glyph name={item.glyph} className="h-8 w-8" />
                  </span>
                  <span>
                    <span
                      className={cn(
                        'block font-display text-[24px] font-semibold uppercase leading-none',
                        selected ? 'text-ink' : 'text-muted'
                      )}
                    >
                      {item.name}
                    </span>
                    <span className="mono mt-1.5 block text-[11px] text-faint">
                      {String(index + 1).padStart(2, '0')} / 03
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* The one that is selected. */}
          <div className="border-t border-line-2 bg-glass p-6 backdrop-blur-[14px] min-[760px]:p-9">
            <div className="grid gap-9 min-[980px]:grid-cols-[1fr_1.1fr]">
              <div>
                <h3 className="font-display text-[clamp(22px,2.9vw,32px)] font-semibold uppercase leading-[1.08] text-ink">
                  {pillar.headline}
                </h3>
                <p className="mt-4 text-[15.5px] font-light leading-[1.68] text-muted">
                  {pillar.lead}
                </p>
                <p className="mt-4 border-t border-line-2 pt-4 text-[14.5px] font-light leading-[1.62] text-faint">
                  {pillar.close}
                </p>
              </div>

              {/* Two columns either way: Acquire fills both with its own pair
                  of lists, and the single-column pillars let their one list run
                  across the same width rather than leaving half the panel bare. */}
              <div className="grid gap-6 min-[620px]:grid-cols-2">
                {pillar.columns.map((column) => (
                  <div key={column.heading} className={pillar.columns.length === 1 ? 'min-[620px]:col-span-2' : undefined}>
                    <div className="mb-4 text-[10.5px] font-bold uppercase tracking-[.18em] text-green">
                      {column.heading}
                    </div>
                    <ul
                      className={cn(
                        'gap-x-6 gap-y-2.5',
                        pillar.columns.length === 1 ? 'grid min-[620px]:grid-cols-2' : 'space-y-2.5'
                      )}
                    >
                      {column.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-[14px] font-light leading-[1.45] text-muted"
                        >
                          <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-green/60" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ---------- The chain ---------- */}
        <div className="mt-4 grid gap-4 min-[900px]:grid-cols-2">
          <Reveal className="glass ring-lit rounded-frame p-6 min-[760px]:p-8">
            <div className="text-[10.5px] font-bold uppercase tracking-[.18em] text-faint">
              Without Guardian Care
            </div>
            <Chain stages={WITHOUT_CHAIN} tone="muted" />
            <p className="mt-6 border-t border-line-2 pt-5 text-[14px] font-light leading-[1.6] text-faint">
              The relationship ends at the point the system starts producing data.
            </p>
          </Reveal>

          <Reveal
            delay={0.06}
            className="ring-lit overflow-hidden rounded-frame bg-[linear-gradient(120deg,var(--color-green-glow),var(--color-blue-glow))] p-6 min-[760px]:p-8"
          >
            <div className="text-[10.5px] font-bold uppercase tracking-[.18em] text-green">
              With Guardian Care
            </div>
            <Chain stages={WITH_CHAIN} tone="green" />
            <p className="mt-6 border-t border-line pt-5 text-[14px] font-light leading-[1.6] text-muted">
              Installation is the fourth of seven, and the last three run for as long as the system
              does.
            </p>
          </Reveal>
        </div>
      </Wrap>
    </Section>
  );
}

function Chain({stages, tone}: {stages: string[]; tone: 'muted' | 'green'}) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-2.5">
      {stages.map((stage, index) => (
        <span key={stage} className="flex items-center gap-2">
          {index > 0 ? (
            <span className={tone === 'green' ? 'text-green/60' : 'text-faint'}>→</span>
          ) : null}
          <span
            className={cn(
              'rounded-pill px-3.5 py-1.5 text-[12.5px] font-medium',
              tone === 'green'
                ? 'border border-line bg-panel/50 text-ink'
                : 'border border-line-2 text-muted'
            )}
          >
            {stage}
          </span>
        </span>
      ))}
    </div>
  );
}
