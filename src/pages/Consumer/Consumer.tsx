import AskGuardian from './components/AskGuardian';
import Closing from './components/Closing';
import Hero from './components/Hero';
import HomeToday from './components/HomeToday';
import HowItWorks from './components/HowItWorks';
import SolarDay from './components/SolarDay';
import Watching from './components/Watching';

/**
 * The consumer journey, ordered as one argument rather than as a feature tour.
 *
 * Here is what happened today → here is why you still bought electricity, and
 * what the day was worth → here is anything else you wanted to ask → and here
 * is the part that runs on the days you never think about it. Only then does
 * the page explain where it comes from, because "provided by your installer"
 * only lands once the reader wants the thing being provided.
 *
 * Every section below the hero is transparent and divided by a rule, so the
 * light field behind them runs the length of the page instead of stopping at
 * the first opaque block. `isolate` keeps that field's negative z-index inside
 * this page rather than letting it slide under the site chrome.
 */
export default function Consumer() {
  return (
    <main className="relative isolate">
      <Hero />
      <HomeToday />
      {/* <SolarDay /> */}
      <AskGuardian />
      <Watching />
      <HowItWorks />
      <Closing />
    </main>
  );
}
