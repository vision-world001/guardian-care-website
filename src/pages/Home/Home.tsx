import CommandField from './components/CommandField';
import WaveSign from '../../context/layouts/WaveSign';
import CustomerView from './components/CustomerView';
import Hero from './components/Hero';
import Intelligence from './components/Intelligence';
import Journeys from './components/Journeys';
import Operations from './components/Operations';
import Pipeline from './components/Pipeline';
import Record from './components/Record';

/**
 * The platform, introducing itself.
 *
 * Ordered as an argument rather than as a feature tour:
 *
 *   1. A system, reading itself.                — this is the object
 *   2. Three journeys.                          — and here is your way in
 *   3. Eight stages, one relationship.          — this is the mechanism
 *   4. Data → intelligence → action.            — this is what we do with it
 *   5. The operational brain.                   — at portfolio scale
 *   6. Complex energy, simple to understand.    — and at kitchen-table scale
 *   7. One customer, one record.                — and none of it is separate
 *
 * …and then the footer, where the name rises out of the sea.
 *
 * The journeys sit at position two deliberately. A visitor arrives already
 * belonging to one of the three roles, and making them read four sections of
 * platform philosophy before offering a route turns a product page into a
 * brochure. The page used to repeat that choice at the foot; it now ends on the
 * record and hands straight to the footer's wordmark, and the journeys stay one
 * click away in the header and the footer's own links.
 *
 * Runs on the one ground the whole site now shares — the mark's own navy, set
 * in `@theme` rather than under a class, with the brand green as the accent.
 * There is no longer a per-page surface to opt into: four pages telling one
 * product in one set of colours is the point, and the difference between them
 * is what they say rather than what they are lit with.
 */
export default function Home() {
  return (
    <main className="relative isolate overflow-hidden">
      <CommandField />

      <Hero />
      <Journeys />
      <Pipeline />
      <Intelligence />
      <Operations />
      <CustomerView />
      <Record />
      <WaveSign />

    </main>
  );
}
