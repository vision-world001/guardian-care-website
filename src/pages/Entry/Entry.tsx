import Hero from './components/Hero';
import JourneyPanels from './components/JourneyPanels';
import SolarField from './components/SolarField';

export default function Entry() {
  return (
    <main className="bg-entry-glow relative isolate flex min-h-screen flex-col justify-center overflow-hidden py-15">
      {/* Sits on a negative z-index inside this stacking context: above the
          page gradient, beneath every piece of content, and out of the way of
          both the pointer and the accessibility tree. */}
      <SolarField />
      <Hero />
      <JourneyPanels />
    </main>
  );
}
