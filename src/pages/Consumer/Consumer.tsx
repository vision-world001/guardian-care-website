import {useEffect, useState} from 'react';
import Answer from './components/Answer';
import Hero from './components/Hero';
import Result from './components/Result';
import {useProfile} from './useProfile';

/**
 * Three steps, one on screen at a time.
 *
 * Not a long page divided into panels — a deck. Only the current step is
 * rendered; the others are not below the fold, they are not in the document.
 * Nothing to scroll past, nothing to skim ahead to, and no way to reach the
 * result without having answered the two questions it is built from.
 *
 *   1. Which of these is your question?      — six, in their own words
 *   2. Here is the answer. What do you have? — answered before anything is asked
 *   3. This is what you would get            — and the one thing to do next
 *
 * Answering advances. There is no "next" on steps one and two, because the
 * answer *is* the intent, and asking somebody to confirm a choice they just
 * made is a click that buys nothing.
 *
 * It always opens on the question. Nothing is remembered between visits: a
 * returning visitor used to land on a result assembled from a conversation
 * they no longer remembered having, which is a worse first impression than
 * simply starting. Three clicks is not a cost worth optimising away.
 */
export default function Consumer() {
  const {profile, derived, systemLabel, concernLabel, setSystem, setConcern, generate} =
    useProfile();

  const [view, setView] = useState(0);

  /* Each step is a new screen, not a scroll position, so it starts at the top.
     Instant rather than smooth: this is a cut between views, and easing it
     would read as the page sliding away underneath the reader. */
  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'auto'});
  }, [view]);

  function chooseConcern(key: Parameters<typeof setConcern>[0]) {
    setConcern(key);
    setView(1);
  }

  function showResult() {
    generate();
    setView(2);
  }

  return (
    <main className="relative isolate">
      {view === 0 ? <Hero concern={profile.concern} onSelect={chooseConcern} /> : null}

      {view === 1 && profile.concern ? (
        <Answer
          concern={profile.concern}
          system={profile.system}
          onSystem={setSystem}
          onGenerate={showResult}
          onBack={() => setView(0)}
        />
      ) : null}

      {view === 2 && profile.generated ? (
        <Result
          derived={derived}
          systemLabel={systemLabel}
          concernLabel={concernLabel}
          onBack={() => setView(1)}
        />
      ) : null}
    </main>
  );
}
