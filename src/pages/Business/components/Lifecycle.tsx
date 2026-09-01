import {useState} from 'react';
import Reveal from '../../../components/Reveal';
import {ATTACHED_ABOVE, DetailPanel, HAIRLINE_GRID, PanelEdge, Section, SectionHead, Wrap} from '../../../components/ui';
import {LIFECYCLE} from '../../../data/lifecycle';
import {cn} from '../../../lib/cn';

export default function Lifecycle() {
  const [active, setActive] = useState(0);
  const stage = LIFECYCLE[active];

  return (
    <Section id="b-lifecycle" hairline>
      <Wrap>
        <Reveal>
          <SectionHead
            eyebrow="The lifecycle"
            index=""
            title={
              <>
                One customer.
                <br />
                <span className="text-brand-gradient">Nine connected stages.</span>
              </>
            }
            body="Most solar businesses operate the first two stages well and lose the customer somewhere after the third. Guardian Care runs all nine against a single record. Select any stage to see what happens within it."
          />
        </Reveal>

        <div
          className={cn(
            HAIRLINE_GRID,
            ATTACHED_ABOVE,
            'grid-cols-3 min-[1100px]:grid-cols-9'
          )}
        >
          {LIFECYCLE.map((item, index) => (
            <button
              key={item.name}
              type="button"
              onClick={() => setActive(index)}
              aria-pressed={index === active}
              className={cn(
                'group relative cursor-pointer px-3.5 py-5 text-center transition duration-250 ease-brand',
                index === active
                  ? 'bg-[linear-gradient(170deg,var(--color-green-glow),transparent)]'
                  : 'glass hover:-translate-y-0.5 hover:bg-panel-2/70'
              )}
            >
              {index === active ? <PanelEdge /> : null}

              <div
                className={cn(
                  'mono mb-[9px] text-[10px]',
                  index === active ? 'text-green' : 'text-faint'
                )}
              >
                {String(index + 1).padStart(2, '0')}
              </div>
              <div className="font-display text-[17px] font-semibold uppercase leading-none">
                {item.name}
              </div>
            </button>
          ))}
        </div>

        <DetailPanel heading={stage.name}>
          <b>{stage.headline}.</b> {stage.body}
        </DetailPanel>
      </Wrap>
    </Section>
  );
}
