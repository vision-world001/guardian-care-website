import {useState} from 'react';
import Reveal from '../../../components/Reveal';
import {Section, SectionHead, Wrap} from '../../../components/ui';
import {TONE_BG, TONE_TEXT} from '../../../data/command';
import {ALERTS} from '../../../data/existing';
import {cn} from '../../../lib/cn';

/**
 * What arrives without being asked for.
 *
 * The five triggers are a list; the panel under them is the product. Guardian
 * Care does not send "high export" — it sends what it saw, why that matters
 * given everything else it knows about the property, and what to do about it.
 * Presenting the alerts as a selector with one explanation beneath makes that
 * three-part structure visible rather than described, and a reader who clicks
 * two of them has understood the pattern without reading a word about it.
 */
export default function Watching() {
  const [at, setAt] = useState(2);
  const alert = ALERTS[at];

  return (
    <Section id="alerts" hairline>
      <Wrap>
        <SectionHead
          eyebrow="Guardian Care can alert you when"
          index="06 / 06"
          title="You do not have to watch it"
          body="You get your own account and can log in whenever you want. But the point of the platform is that nobody at your address has to remember to check. The backend monitors the available data and looks for meaningful change."
        />

        <div className="overflow-hidden rounded-[22px] ring-1 ring-line-2">
          {/* The triggers. */}
          <div className="grid gap-px bg-line-2 min-[620px]:grid-cols-2 min-[1100px]:grid-cols-5">
            {ALERTS.map((item, index) => {
              const selected = index === at;

              return (
                <button
                  key={item.key}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setAt(index)}
                  className={cn(
                    'px-5 py-6 text-left transition duration-250 ease-brand',
                    selected ? 'bg-bg-2' : 'bg-panel hover:bg-bg-2/60'
                  )}
                >
                  <span
                    className={cn(
                      'mb-4 block h-2 w-2 rounded-full transition-colors',
                      selected ? TONE_BG[item.tone] : 'bg-line-2'
                    )}
                  />
                  <span
                    className={cn(
                      'block text-[15.5px] leading-[1.3]',
                      selected ? 'font-medium text-ink' : 'font-light text-ink/80'
                    )}
                  >
                    {item.name}
                  </span>
                  <span className="mt-2 block text-[13px] font-light leading-[1.5] text-muted">
                    {item.trigger}
                  </span>
                </button>
              );
            })}
          </div>

          {/* The explanation that never arrives without the alert. */}
          <div className="grid gap-px border-t border-line-2 bg-line-2 min-[900px]:grid-cols-3">
            <Part
              heading="What we identified"
              tone={alert.tone}
              body={alert.identified}
              lead
            />
            <Part heading="Why this matters" tone={alert.tone} body={alert.matters} />
            <Part heading="What Guardian Care suggests" tone={alert.tone} body={alert.suggests} />
          </div>
        </div>

        <Reveal className="mt-4 rounded-[18px] border-l-2 border-green/50 bg-panel px-6 py-5 ring-1 ring-line-2">
          <p className="max-w-[840px] text-[15px] font-light leading-[1.65] text-muted">
            Guardian Care does not simply say <b className="font-medium text-ink">“High export.”</b>{' '}
            Everything else stays quiet — which is what keeps the ones that do arrive worth opening.
          </p>
        </Reveal>
      </Wrap>
    </Section>
  );
}

function Part({
  heading,
  tone,
  body,
  lead
}: {
  heading: string;
  tone: (typeof ALERTS)[number]['tone'];
  body: string;
  lead?: boolean;
}) {
  return (
    <div className="bg-panel p-6 min-[760px]:p-8">
      <div className={cn('text-[10.5px] font-bold uppercase tracking-[.18em]', TONE_TEXT[tone])}>
        {heading}
      </div>
      <p
        className={cn(
          'mt-3.5 leading-[1.6]',
          lead ? 'text-[16px] font-normal text-ink' : 'text-[15px] font-light text-muted'
        )}
      >
        {body}
      </p>
    </div>
  );
}
