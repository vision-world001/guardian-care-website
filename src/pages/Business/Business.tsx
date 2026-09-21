import ConsoleField from './components/ConsoleField';
import {useCallback, useMemo, useState} from 'react';
import {NO_ANSWERS, type Answers} from '../../components/Assessment/types';
import WaveSign from '../../context/layouts/WaveSign';
import {readBusiness} from '../../data/businessFlow';
import Assess from './components/Assess';
import Closing from './components/Closing';
import Console from './components/Console';
import Handover from './components/Handover';
import Hero from './components/Hero';
import Join from './components/Join';
import Model from './components/Model';
import Products from './components/Products';
import Revenue from './components/Revenue';
import Views from './components/Views';
import Watch from './components/Watch';

/**
 * "I'm a solar or energy company."
 *
 * The third journey, and the only one whose reader is buying rather than being
 * looked after. They install for a living, they do not need solar explained,
 * and they are deciding in about a second whether this page answers the one
 * question they have: what happens to a customer after the handover.
 *
 * So the page is built to be felt rather than read. One idea carries it and it
 * is drawn, not argued — one dot is one customer — and every section is a
 * single picture with a line under it:
 *
 *   1. Here is your whole portfolio.             — 1,245 dots, 42 of them blipping
 *   2. Here is where you lose them.              — a chain that stops at handover
 *   3. Here is what we are.                      — three products, one record
 *   4. Here it is, working.                      — the console, operable
 *   5. It is already watching.                   — six rules, five words each
 *   6. Your customer never sees a fault code.    — one event, two readings
 *   7. Here is the revenue in it.                — the same battery, sold twice
 *   8. Here is how you join.                     — four steps, four objections
 *   9. Now your business.                        — the assessment
 *  10. Here is where you start.                  — their own first five moves
 *  11. What it is all for.                       — five questions, answered
 *
 * …and then the name rising out of the water, as on the other three pages.
 *
 * Runs on the brand navy with the console grid behind it. The other three
 * pages are lit the same way, which is the point: an operator who has just
 * been shown the customer's dashboard should recognise it as the same product
 * rather than as a different company's.
 *
 * The assessment sits after the console rather than before it. Six questions
 * asked of somebody who has not yet seen what they are for is a form; the same
 * six asked of somebody who has just operated the thing are the obvious next
 * click.
 */
export default function Business() {
  const [answers, setAnswers] = useState<Answers>(NO_ANSWERS);
  const [generated, setGenerated] = useState(false);

  const position = useMemo(() => readBusiness(answers), [answers]);

  const reset = useCallback(() => {
    setAnswers(NO_ANSWERS);
    setGenerated(false);
  }, []);

  return (
    <main className="relative isolate overflow-hidden">
      <ConsoleField />

      <Hero />
      <Handover />
      <Products />
      <Console />
      <Watch />
      <Views />
      <Revenue />
      <Join />

      <Assess
        answers={answers}
        position={position}
        done={generated}
        onChange={setAnswers}
        onComplete={() => setGenerated(true)}
        onReset={reset}
      />

      {/* Only once the visitor has asked for it. */}
      {generated ? <Model position={position} /> : null}

      <Closing />

      <WaveSign />
    </main>
  );
}
