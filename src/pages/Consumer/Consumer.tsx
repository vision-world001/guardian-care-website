import CommandField from '../Home/components/CommandField';
import {useCallback, useMemo, useState} from 'react';
import {NO_ANSWERS, type Answers} from '../../components/Assessment/types';
import WaveSign from '../../context/layouts/WaveSign';
import {readPosition} from '../../data/consumer';
import Account from './components/Account';
import Aim from './components/Aim';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
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
 *   3. Here is how we get you there.            — seven steps, shown not told
 *   4. You can look, but you do not have to.    — your account
 *   5. What it is all for.                      — our aim
 *   6. So start.                                — the system check, and its result
 *
 * …and then the name rising out of the water, as on the home page.
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
      <Why />
      <HowItWorks />
      <Account />
      <Aim />

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

      <WaveSign />
    </main>
  );
}
