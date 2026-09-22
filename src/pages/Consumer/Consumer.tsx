import CommandField from '../Home/components/CommandField';
import {useCallback, useMemo, useState} from 'react';
import {NO_ANSWERS, type Answers} from '../../components/Assessment/types';
import WaveSign from '../../context/layouts/WaveSign';
import {readPosition} from '../../data/consumer';
import Activation from './components/Activation';
import Aim from './components/Aim';
import Findings from './components/Findings';
// import Gap from './components/Gap'; — re-enable with the <Gap /> below
import Hero from './components/Hero';
import Summary from './components/Summary';
import SystemCheck from './components/SystemCheck';
import Why from './components/Why';

/**
 * "I already have solar."
 *
 * Written for somebody who owns a system and cannot say what it is doing. They
 * are not shopping; they are wondering — is it still working, why do I still
 * get a bill, is anybody going to try to sell me a battery, and do I have to
 * become an expert to find out. The page answers those in the order they are
 * felt:
 *
 *   1. Here is what you would see.              — the hero's live card
 *   2. Here is why you cannot see it today.     — many parts, one picture
 *   3. Nothing is sold without a reading.       — the engineer's findings
 *   4. Then someone is watching it.             — what it does, what it costs
 *   5. What it is all for.                      — our aim
 *   6. So start.                                — the system check, and its result
 *
 * …and then the name rising out of the water, as on the home page.
 *
 * Stages three and four are taken from the working dashboard rather than
 * written for this page, which is why they are the concrete ones. Two sections
 * that used to sit between them are gone: an account section promising a
 * login, which is now one of the seven things activation lists, and a
 * ten-stage walk through the app's Core Journey — accurate, but a process
 * diagram in the middle of a page that has to sell the outcome first.
 *
 * One example household runs through all of it — the same 18 kWh day in the
 * hero, the bird's-eye view, the insight and the dashboard — so the page reads
 * as one system being explained rather than as a set of separate claims.
 *
 * Runs on the site's one ground, the brand navy, because it is the home page's
 * customer product opened up rather than a separate journey.
 *
 * The answers live at this level because the result is built from them, and
 * `generated` is withheld until asked for: a page that produces a summary
 * before the visitor finishes has taken the decision away from them.
 */
export default function Consumer() {
  const [answers, setAnswers] = useState<Answers>(NO_ANSWERS);
  const [generated, setGenerated] = useState(false);

  const position = useMemo(() => readPosition(answers), [answers]);

  const reset = useCallback(() => {
    setAnswers(NO_ANSWERS);
    setGenerated(false);
  }, []);

  return (
    <main className="relative isolate overflow-hidden">
      <CommandField />

      <Hero />
      {/* <Gap /> */}

      {/* Straight under the hero, because the hero's button points here.
          Landing a visitor who just clicked "check my system" on four
          sections of explanation makes them scroll to reach the thing they
          asked for; the explanation is what they read afterwards, if the
          questions have earned it. */}
      <SystemCheck
        answers={answers}
        position={position}
        done={generated}
        onChange={setAnswers}
        onComplete={() => setGenerated(true)}
        onReset={reset}
      />

      {/* Only once the visitor has asked for it. */}
      {generated ? <Summary position={position} /> : null}

      <Why />
      <Findings />
      <Activation />
      <Aim />

      <WaveSign />
    </main>
  );
}
