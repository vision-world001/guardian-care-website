import {useCallback, useMemo, useState} from 'react';
import {Link} from 'react-router';
import Reveal from '../../components/Reveal';
import {NO_ANSWERS, type Answers} from '../../components/Assessment/types';
import {ACTION, ACTION_QUIET, ClosingSection} from '../../components/ui';
import {readPosition} from '../../data/existing';
import BirdsEye from './components/BirdsEye';
import Connect from './components/Connect';
import Hero from './components/Hero';
import Result from './components/Result';
import Scattered from './components/Scattered';
import Summary from './components/Summary';
import SystemCheck from './components/SystemCheck';
import Thinking from './components/Thinking';
import Watching from './components/Watching';

/**
 * "I already have solar."
 *
 * A scrolling page with one interactive block in it, rather than a deck. The
 * reader here already owns the thing being discussed and arrives with a
 * specific suspicion — that their system is not doing what they were told it
 * would — so the page has to be readable straight through by somebody who never
 * touches the questionnaire, and materially better for somebody who does.
 *
 * The answers live at this level because three sections downstream are built
 * from them: the initial position, the tariff the opportunity is priced at, and
 * the FIT rate. Holding them in the assessment and handing them out would give
 * two components a different idea of who the visitor is.
 *
 * `generated` is withheld until asked for. Two answers are enough to build a
 * position, but a page that generates before being told to has taken the
 * decision away from the visitor.
 */
export default function Existing() {
  const [answers, setAnswers] = useState<Answers>(NO_ANSWERS);
  const [generated, setGenerated] = useState(false);

  const position = useMemo(() => readPosition(answers), [answers]);

  const reset = useCallback(() => {
    setAnswers(NO_ANSWERS);
    setGenerated(false);
  }, []);

  return (
    <main className="relative isolate">
      <Hero />
      <Scattered />

      <SystemCheck
        answers={answers}
        position={position}
        done={generated}
        onChange={setAnswers}
        onComplete={() => setGenerated(true)}
        onReset={reset}
      />

      {/* Only once the visitor has asked for it. Everything from here down is
          readable without it, but it is theirs rather than an example. */}
      {generated ? <Result position={position} /> : null}

      <Connect />
      <BirdsEye />
      <Thinking position={position} />
      <Watching />
      <Summary />

      <ClosingSection
        title={
          <>
            Your solar system has been
            <br />
            working for years
          </>
        }
        body="Now make the data work for you. Understand how much you generate, how much you use for free, what leaves your property, what you still purchase, and where your system could be working harder."
        bodyClassName="max-w-[600px]"
        action={
          <Reveal className="flex flex-wrap justify-center gap-3">
            <a href="#check" className={ACTION}>
              Check my existing solar system
            </a>
            <Link to="/plan" className={ACTION_QUIET}>
              I’m adding solar or storage
            </Link>
          </Reveal>
        }
      />
    </main>
  );
}
