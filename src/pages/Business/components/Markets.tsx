import {useState} from 'react';
import {DetailPanel, Section, SectionHead, Wrap} from '../../../components/ui';
import {BUSINESS_MARKETS} from '../../../data/businessFlow';
import {cn} from '../../../lib/cn';

/**
 * One journey, several markets.
 *
 * The customer journey stays consistent and the intelligence adapts, which is a
 * claim best made by showing what actually changes: currency, export scheme and
 * the thing that most often drives a conversation. Three rows per market, and
 * the fact that they are the same three rows everywhere is the point.
 */
export default function Markets() {
  const [at, setAt] = useState(0);
  const market = BUSINESS_MARKETS[at];

  return (
    <Section id="markets" hairline>
      <Wrap>
        <SectionHead
          eyebrow="Built for international solar markets"
          index="05 / 05"
          title="The journey stays the same. The intelligence adapts."
          body="Tariffs, export arrangements, system sizes and customer behaviour vary significantly by region. What does not vary is the sequence — capture, baseline, measure, explain, suggest."
        />

        <div>
          <div className="grid gap-px overflow-hidden rounded-t-frame bg-line-2 ring-lit min-[620px]:grid-cols-3 min-[1000px]:grid-cols-5">
            {BUSINESS_MARKETS.map((item, index) => {
              const selected = index === at;

              return (
                <button
                  key={item.key}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setAt(index)}
                  className={cn(
                    'px-5 py-6 text-left transition duration-250 ease-brand',
                    selected ? 'bg-panel-2/80' : 'glass hover:bg-panel-2/50'
                  )}
                >
                  <span
                    className={cn(
                      'mb-3.5 block h-2 w-2 rounded-full transition-colors',
                      selected ? 'bg-green' : 'bg-line-2'
                    )}
                  />
                  <span
                    className={cn(
                      'block font-display text-[21px] font-semibold uppercase leading-[1.1]',
                      selected ? 'text-ink' : 'text-muted'
                    )}
                  >
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>

          <DetailPanel heading={market.name}>
            <p>{market.line}</p>

            <dl className="mt-5 grid gap-x-8 gap-y-2.5 min-[620px]:grid-cols-3">
              {market.fields.map(([key, value]) => (
                <div key={key}>
                  <dt className="text-[10.5px] font-bold uppercase tracking-[.14em] text-faint">
                    {key}
                  </dt>
                  <dd className="mono mt-1 text-[13.5px] font-medium text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </DetailPanel>
        </div>
      </Wrap>
    </Section>
  );
}
