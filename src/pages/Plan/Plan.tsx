import {useCallback, useMemo, useState} from 'react';
import Reveal from '../../components/Reveal';
import {NO_ANSWERS, type Answers} from '../../components/Assessment/types';
import {ACTION, ACTION_QUIET, ClosingSection} from '../../components/ui';
import {readPlan} from '../../data/plan';
import Afterwards from './components/Afterwards';
import Ask from './components/Ask';
import Changes from './components/Changes';
import EnergyAssessment from './components/EnergyAssessment';
import Hero from './components/Hero';
import Position from './components/Position';
import Setup from './components/Setup';
import Storage from './components/Storage';

/**
 * "I'm looking for solar, battery or energy storage."
 *
 * The sibling of the existing-system journey, and deliberately the same shape:
 * an assessment near the top, a result derived from it, then the explanation
 * that makes the result mean something. What differs is the starting point —
 * this reader owns nothing yet, so the page opens on their electricity bill
 * rather than on their roof.
 *
 * Answers live at this level because three sections downstream are built from
 * them: the estimate, the suggested setup, and the tariff every saving figure
 * is priced at.
 */
export default function Plan() {
  const [answers, setAnswers] = useState<Answers>(NO_ANSWERS);
  const [generated, setGenerated] = useState(false);

  const position = useMemo(() => readPlan(answers), [answers]);

  const reset = useCallback(() => {
    setAnswers(NO_ANSWERS);
    setGenerated(false);
  }, []);

  return (
    <main className="relative isolate">
      <Hero />

      <EnergyAssessment
        answers={answers}
        position={position}
        done={generated}
        onChange={setAnswers}
        onComplete={() => setGenerated(true)}
        onReset={reset}
      />

      {/* Only once the visitor has asked for it. */}
      {generated ? <Position position={position} /> : null}

      <Changes />
      <Storage />
      <Setup position={position} />
      <Ask />
      <Afterwards />

      <ClosingSection
        title="Start with your current electricity bill"
        body="Tell Guardian Care what you pay now and what you want to achieve, and we will build an initial solar and storage position around you rather than around a package."
        bodyClassName="max-w-[580px]"
        action={
          <Reveal className="flex flex-wrap justify-center gap-3">
            <a href="#assess" className={ACTION}>
              See my solar saving estimate
            </a>
            <a href="#storage" className={ACTION_QUIET}>
              Explore battery storage
            </a>
            <a href="#ask" className={ACTION_QUIET}>
              Ask Guardian Care a question
            </a>
          </Reveal>
        }
      />
    </main>
  );
}
