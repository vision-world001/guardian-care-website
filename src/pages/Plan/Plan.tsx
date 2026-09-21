import CommandField from '../Home/components/CommandField';
import {useCallback, useMemo, useState} from 'react';
import {NO_ANSWERS, type Answers} from '../../components/Assessment/types';
import WaveSign from '../../context/layouts/WaveSign';
import {readPlan} from '../../data/plan';
import Afterwards from './components/Afterwards';
import Ask from './components/Ask';
import Assess from './components/Assess';
import Closing from './components/Closing';
import Goal from './components/Goal';
import Hero from './components/Hero';
import Journey from './components/Journey';
import Mechanism from './components/Mechanism';
import Position from './components/Position';
import Quote from './components/Quote';
import Storage from './components/Storage';

/**
 * "I'm looking for solar, battery or energy storage."
 *
 * The sibling of the existing-system journey, and deliberately the same shape:
 * show the thing, then ask for the reader's own numbers, then produce their
 * result. What differs is the starting point — this reader owns nothing yet,
 * so the page opens on their electricity bill rather than on their roof.
 *
 * One idea carries the whole page, and it is drawn rather than argued: a
 * kilowatt-hour is a square, and every square you do not own is one you are
 * buying. The hero shows ten of them, all hollow. Solar fills six in. Storage
 * changes the colour of five more. The estimate redraws the same row as a year
 * of the reader's own electricity. By the time the quotation appears, the case
 * for every line on it has already been made in pictures, which is why the
 * page can afford to be this short with words.
 *
 *   1. Here is where you are standing.          — the hero's bill
 *   2. What do you want to change?              — the goal picker
 *   3. Here is what solar does.                 — ten squares, six filled
 *   4. Here is what a battery does.             — the same day, twice
 *   5. Now your numbers.                        — the assessment
 *   6. Here is your position.                   — the estimate, with its sum
 *   7. Here is what we would propose, and why.  — the quote
 *   8. And it does not stop there.              — monitoring, and what it says
 *   9. Anything you want to ask.                — the questions
 *  10. The whole arc.                           — seven stages
 *  11. What it is all for.                      — five verbs
 *
 * …and then the name rising out of the water, as on the other two pages.
 *
 * Runs on the brand navy alongside the home and consumer pages: this is the
 * same product, one click further in.
 *
 * Answers live at this level because four things downstream are built from
 * them — the goal picker, the estimate, the quotation's capacities, and the
 * tariff every money figure on the page is priced at. `generated` is withheld
 * until asked for: a page that produces a result before the visitor has
 * finished has taken the decision away from them.
 */
export default function Plan() {
  const [answers, setAnswers] = useState<Answers>(NO_ANSWERS);
  const [generated, setGenerated] = useState(false);

  const position = useMemo(() => readPlan(answers), [answers]);

  const reset = useCallback(() => {
    setAnswers(NO_ANSWERS);
    setGenerated(false);
  }, []);

  /* The picker near the top writes into the assessment's own answers rather
     than keeping a second copy, so question three arrives already answered and
     changing it in either place changes it in both. Two states that have to
     agree eventually stop agreeing. */
  const pickGoal = useCallback((key: string) => {
    setAnswers((current) => ({...current, choice: {...current.choice, goal: key}}));
  }, []);

  return (
    <main className="relative isolate overflow-hidden">
      <CommandField />

      <Hero />
      <Goal goal={answers.choice.goal ?? null} onPick={pickGoal} />
      <Mechanism />
      <Storage />

      <Assess
        answers={answers}
        position={position}
        done={generated}
        onChange={setAnswers}
        onComplete={() => setGenerated(true)}
        onReset={reset}
      />

      {/* Only once the visitor has asked for it. */}
      {generated ? <Position position={position} /> : null}

      <Quote position={position} />
      <Afterwards />
      <Ask />
      <Journey />
      <Closing />

      <WaveSign />
    </main>
  );
}
