import Closing from './components/Closing';
import CommandCentre from './components/CommandCentre';
import Concierge from './components/Concierge';
import ConsoleField from './components/ConsoleField';
import Hero from './components/Hero';
import Lifecycle from './components/Lifecycle';
import Markets from './components/Markets';
import OnsiteOnboarding from './components/OnsiteOnboarding';

/**
 * The operator's journey.
 *
 * Every section is transparent and divided by a rule rather than by an
 * alternating ground: #00060f against #040d1a is a 2% step that divides nothing
 * on its own, and an opaque band would punch a hole in the field behind it.
 * `isolate` keeps that field's negative z-index inside the page instead of
 * letting it slide under the site chrome.
 */
export default function Business() {
  return (
    <main className="relative isolate">
      <ConsoleField />
      <Hero />
      <Lifecycle />
      <OnsiteOnboarding />
      <CommandCentre />
      <Concierge />
      <Markets />
      <Closing />
    </main>
  );
}
