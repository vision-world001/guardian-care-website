import Reveal from '../../components/Reveal';

/**
 * The dashboard's front door, before there is a dashboard.
 *
 * This held an enquiry form — company, name, email, portfolio size, and a
 * "what happens next" panel — which posted nowhere, because there is no
 * backend yet. A form that collects details it cannot deliver is worse than
 * no form: the sender believes the enquiry arrived.
 *
 * So the page says the one true thing instead. Every "Go to dashboard" button
 * on the site lands here, and what a visitor learns is accurate: it is coming,
 * and it is not here today.
 *
 * Deliberately one line and nothing else. A placeholder dressed up with
 * features it does not have reads as a page that failed to load; a placeholder
 * that is plainly a placeholder reads as a decision.
 */
export default function Start() {
  return (
    <main className="relative isolate flex min-h-[68vh] items-center justify-center px-5 py-24">
      <Reveal className="text-center">
        <h1 className="font-display text-[clamp(40px,8vw,92px)] font-semibold uppercase leading-[0.94] tracking-[-0.02em] text-ink">
          Dashboard <span className="text-brand-gradient">coming</span>
        </h1>
      </Reveal>
    </main>
  );
}
