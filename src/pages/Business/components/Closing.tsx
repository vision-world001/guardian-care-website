import {LABEL, PRIMARY, SECONDARY, ramp} from '../../../components/kit';
import Reveal from '../../../components/Reveal';
import {Section, Wrap} from '../../../components/ui';
import {cn} from '../../../lib/cn';

/**
 * The sign-off.
 *
 * Five questions, because every one of them is a question a customer asks
 * their installer and the installer currently cannot answer. Kept in the
 * customer's own voice rather than translated into operator language — an
 * installation company recognises these as the calls they take, and the
 * recognition is the argument.
 *
 * Inline rather than in `data/`, because unlike the products or the rules
 * engine nothing else on the site reads them. A constant exported for one
 * consumer is indirection, not structure.
 */
const ASKED = [
  'Is my system working?',
  'What is it producing?',
  'Where is my energy going?',
  'Am I using it well?',
  'Who is looking after it?'
];

export default function Closing() {
  return (
    <Section id="close" hairline className="py-20 min-[760px]:py-28">
      <Wrap>
        <Reveal className="mx-auto max-w-[820px] text-center">
          <div className={cn(LABEL, 'text-green')}>&#9671; What it is all for</div>

          <h2 className="mt-6 font-display text-[clamp(32px,5.4vw,62px)] font-semibold uppercase leading-[0.96] tracking-[-0.02em] text-ink">
            Installations end.
            <br />
            <span className="text-brand-gradient">Relationships don&rsquo;t have to.</span>
          </h2>

          <p className="mx-auto mt-7 max-w-[540px] text-[16.5px] font-light leading-[1.65] text-muted">
            Five questions your customers are already asking. Guardian Care answers all of them, for
            every system you have ever installed.
          </p>
        </Reveal>

        {/* ---------- The five ---------- */}
        <ol className="mx-auto mt-14 max-w-[820px]">
          {ASKED.map((question, index) => {
            const colour = ramp(index, ASKED.length);

            return (
              <Reveal
                key={question}
                as="li"
                delay={index * 0.06}
                className="flex items-center gap-5 border-b border-line-2 py-5 last:border-b-0 min-[760px]:gap-8 min-[760px]:py-6"
              >
                {/* The ramp resolves to a color-mix() at render rather than to
                    one of the palette's named tones, so it is carried inline —
                    there is no utility class that could hold it. */}
                <span
                  className="mono shrink-0 text-[11px] tracking-[.16em]"
                  style={{color: colour}}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                <span
                  className="font-display text-[clamp(22px,4.2vw,44px)] font-semibold uppercase leading-[0.96] tracking-[-0.015em]"
                  style={{color: colour}}
                >
                  {question}
                </span>

                <span className="mono ml-auto hidden shrink-0 text-[10.5px] uppercase tracking-[.14em] text-faint min-[900px]:block">
                  Answered
                </span>
              </Reveal>
            );
          })}
        </ol>

        {/* ---------- And the three ways out ---------- */}
        <Reveal delay={0.2} className="mt-14 flex flex-wrap justify-center gap-3">
          <a href="#join" className={PRIMARY}>
            Join Guardian Care &#8594;
          </a>
          <a href="#console" className={SECONDARY}>
            See the console
          </a>
          <a href="#assess" className={SECONDARY}>
            Start my assessment
          </a>
        </Reveal>
      </Wrap>
    </Section>
  );
}
