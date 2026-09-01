import {useState} from 'react';
import Reveal from '../../../components/Reveal';
import {ATTACHED_ABOVE, DetailPanel, HAIRLINE_GRID, PanelEdge, Section, SectionHead, Wrap} from '../../../components/ui';
import {MARKETS} from '../../../data/markets';
import {cn} from '../../../lib/cn';

export default function Markets() {
  const [active, setActive] = useState(0);
  const market = MARKETS[active];

  return (
    <Section id="b-markets" hairline>
      <Wrap>
        <Reveal>
          <SectionHead
            eyebrow="International by design"
            index=""
            title={
              <>
                One engine.
                <br />
                <span className="text-brand-gradient">Every market you operate in.</span>
              </>
            }
            body="Currency, energy units, grid rules, incentive schemes, export arrangements, tax and language are configuration — not code. Select a market to see how the same customer record is interpreted within it."
          />
        </Reveal>

        <div
          className={cn(HAIRLINE_GRID, ATTACHED_ABOVE, 'grid-cols-2 min-[560px]:grid-cols-3 min-[900px]:grid-cols-5')}
        >
          {MARKETS.map((item, index) => (
            <button
              key={item.name}
              type="button"
              onClick={() => setActive(index)}
              aria-pressed={index === active}
              className={cn(
                'group relative cursor-pointer px-[18px] py-[22px] text-left transition duration-250 ease-brand',
                index === active
                  ? 'bg-[linear-gradient(170deg,var(--color-blue-glow),transparent)]'
                  : 'glass hover:-translate-y-0.5 hover:bg-panel-2/70'
              )}
            >
              {index === active ? <PanelEdge tone="blue" /> : null}

              <div
                className={cn(
                  'mb-2 text-sm font-semibold',
                  index === active ? 'text-blue' : 'text-ink'
                )}
              >
                {item.name}
              </div>
              <div className="text-[11.5px] font-light leading-[1.45] text-faint">
                {item.summary}
              </div>
            </button>
          ))}
        </div>

        <div className="ring-lit-open-top glass grid grid-cols-1 gap-[22px] rounded-b-frame px-[26px] py-6 min-[480px]:grid-cols-2 min-[820px]:grid-cols-4">
          {market.fields.map(([key, value]) => (
            <div key={key}>
              <div className="mb-[7px] text-[10.5px] font-bold uppercase tracking-[.14em] text-faint">
                {key}
              </div>
              <div className="text-[14.5px] font-medium text-ink">{value}</div>
            </div>
          ))}
        </div>

        <DetailPanel heading="White label" attached={false}>
          Your logo, colours, customer portal, email and SMS templates, domain, support details and
          product catalogue. The end consumer interacts with <b>your brand throughout</b>, and sees
          only a discreet “powered by Guardian Care” where attribution is required.
        </DetailPanel>
      </Wrap>
    </Section>
  );
}
