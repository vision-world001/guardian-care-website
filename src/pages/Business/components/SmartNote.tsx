import {useState} from 'react';
import Glyph from '../../../components/Glyph';
import Reveal from '../../../components/Reveal';
import {Section, SectionHead, Wrap} from '../../../components/ui';
import {ROLLOUT} from '../../../data/businessFlow';

/**
 * The free-text question, answered.
 *
 * Six multiple-choice questions cannot capture "we have two thousand previous
 * customers and only speak to them when they call us" — and that sentence is
 * usually the most useful thing a business will say about itself. So the last
 * input on the page is a box, and the platform reads it rather than filing it.
 *
 * The reading is keyword-based and says so. The alternative was to pretend to
 * more comprehension than a landing page has any business claiming, and a
 * response that confidently misreads what somebody wrote is worse than one that
 * is modest about how it got there.
 */

type Reading = {heading: string; body: string};

/** Phrases that actually change the recommended first stage. */
const CUES: Array<{match: RegExp; reading: Reading}> = [
  {
    match: /\b(previous|existing|old|dormant|database|installed base|past customers)\b/i,
    reading: {
      heading: 'Start with the customers you already have',
      body: 'An installed base you are not currently speaking to is the clearest starting point Guardian Care sees. Those systems are still producing data, the customers are still reachable, and recapture costs a fraction of acquisition.'
    }
  },
  {
    match: /\b(aftercare|after-care|service|support|retention|retain|churn)\b/i,
    reading: {
      heading: 'Aftercare is the stage to build first',
      body: 'Aftercare only becomes affordable when the platform decides who needs contacting. Connecting monitoring first means your team spends its time on the customers who have something happening rather than on a call list.'
    }
  },
  {
    match: /\b(batter(y|ies)|storage|upgrade|opportunit|sales|revenue)\b/i,
    reading: {
      heading: 'Opportunity detection, once the data is flowing',
      body: 'Storage opportunities are identified from sustained export against later import — which means monitoring has to come first. Once it does, the qualified list builds itself rather than being guessed at.'
    }
  },
  {
    match: /\b(monitor|visibility|data|dashboard|report)\b/i,
    reading: {
      heading: 'Visibility across the portfolio comes first',
      body: 'Before anything can be automated, the platform needs to know what each customer has and what it should be doing. Structured capture is the stage that makes every later one possible.'
    }
  }
];

const DEFAULT_READING: Reading = {
  heading: 'A rollout would begin with capture',
  body: 'Whatever the starting point, Guardian Care needs to know what each customer has before it can tell you what is happening to it. The assessment your engineers already carry out becomes that setup.'
};

function read(note: string): Reading {
  return CUES.find((cue) => cue.match.test(note))?.reading ?? DEFAULT_READING;
}

export default function SmartNote() {
  const [note, setNote] = useState('');
  const trimmed = note.trim();
  const reading = read(trimmed);

  return (
    <Section id="note" hairline>
      <Wrap>
        <SectionHead
          eyebrow="Leave Guardian Care a smart note"
          tone="blue"
          title="Tell us anything important about your business"
          body="In your own words. The platform reads what you write for the handful of things that actually change where a rollout should start."
        />

        <div className="grid gap-4 min-[980px]:grid-cols-2">
          <Reveal className="glass ring-lit rounded-frame p-6 min-[760px]:p-8">
            <label className="block">
              <span className="text-[10.5px] font-bold uppercase tracking-[.18em] text-green">
                Your note
              </span>
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                rows={6}
                placeholder="We have around 2,000 previous solar customers and currently only speak to them when they contact us. We want to improve aftercare and identify battery opportunities."
                className="mt-4 w-full resize-y rounded-tile border border-line-2 bg-bg/60 px-4 py-3.5 text-[15px] font-light leading-[1.6] text-ink outline-none transition focus:border-green/60 placeholder:text-faint/70"
              />
            </label>

            <p className="mt-3 text-[12.5px] font-light leading-[1.55] text-faint">
              Nothing is sent anywhere from this page. The response below is generated in your
              browser from a short list of phrases — it is an illustration of the platform’s posture,
              not the platform’s judgement.
            </p>
          </Reveal>

          <Reveal
            delay={0.06}
            className="ring-lit overflow-hidden rounded-frame bg-[linear-gradient(120deg,var(--color-green-glow),var(--color-blue-glow))]"
          >
            <div className="p-6 min-[760px]:p-8">
              <div className="flex items-center gap-3 text-green">
                <Glyph name="insight" className="h-7 w-7" />
                <span className="text-[10.5px] font-bold uppercase tracking-[.18em]">
                  Suggested starting point
                </span>
              </div>

              {trimmed ? (
                <>
                  <p className="mt-5 font-display text-[clamp(20px,2.5vw,27px)] font-medium uppercase leading-[1.18] text-ink">
                    {reading.heading}
                  </p>
                  <p className="mt-4 text-[15.5px] font-light leading-[1.68] text-muted">
                    {reading.body}
                  </p>
                </>
              ) : (
                <p className="mt-5 text-[15.5px] font-light leading-[1.68] text-muted">
                  Write something in the box and Guardian Care will suggest where a rollout could
                  begin.
                </p>
              )}
            </div>

            <div className="border-t border-line bg-glass-2 p-6 backdrop-blur-[14px] min-[760px]:px-8 min-[760px]:py-7">
              <div className="text-[10.5px] font-bold uppercase tracking-[.18em] text-blue">
                A rollout could begin by
              </div>
              <ol className="mt-5 space-y-3">
                {ROLLOUT.map((line, index) => (
                  <li key={line} className="flex items-start gap-4">
                    <span className="mono shrink-0 text-[11.5px] font-semibold text-green">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[14.5px] font-light leading-[1.45] text-muted">
                      {line}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </Wrap>
    </Section>
  );
}
