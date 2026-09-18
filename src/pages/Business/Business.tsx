import {useCallback, useMemo, useState} from 'react';
import {NO_ANSWERS, type Answers} from '../../components/Assessment/types';
import {readBusiness} from '../../data/businessFlow';
import BusinessCheck from './components/BusinessCheck';
import Closing from './components/Closing';
import CommandCentre from './components/CommandCentre';
import ConsoleField from './components/ConsoleField';
import Hero from './components/Hero';
import Markets from './components/Markets';
import Pillars from './components/Pillars';
import Profile from './components/Profile';
import Signals from './components/Signals';
import SmartNote from './components/SmartNote';

/**
 * The operator's journey.
 *
 * Same structure as the two consumer pages — assessment, derived position, then
 * the explanation that makes the position mean something — lit differently
 * because it is read differently. A homeowner opens their page once a month
 * standing in daylight; an operator has this one open all day in a room full of
 * screens.
 *
 * Every section is transparent and divided by a rule rather than by an
 * alternating ground: #00060f against #040d1a is a 2% step that divides nothing
 * on its own, and an opaque band would punch a hole in the field behind it.
 * `isolate` keeps that field's negative z-index inside the page instead of
 * letting it slide under the site chrome.
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
    <main className="relative isolate">
      <ConsoleField />
      <Hero />

      <BusinessCheck
        answers={answers}
        position={position}
        done={generated}
        onChange={setAnswers}
        onComplete={() => setGenerated(true)}
        onReset={reset}
      />

      {generated ? <Profile position={position} /> : null}

      <Pillars />
      <Signals />
      <CommandCentre />
      <Markets />
      <SmartNote />
      <Closing />
    </main>
  );
}
