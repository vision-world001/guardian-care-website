/**
 * The ground the home page stands on.
 *
 * Deliberately quieter than the business journey's console field. That page is
 * six sections of readouts and needs texture underneath them; this one carries
 * very large type and exactly one bright object at a time, and a busy ground
 * turns the hero into a poster pinned to graph paper.
 *
 * So: a fine lattice at barely over 2% white, one warm bloom behind the hero
 * where the live system sits, and a second much further down so the lower half
 * of the page is not unlit. Nothing moves. The motion budget on this page is
 * spent entirely on the diagrams, which is the point — intelligence is the
 * animation here, not the background.
 *
 * Entirely presentational: `aria-hidden`, no pointer events, negative
 * z-index, bounded to the page rather than the viewport so it stops at the
 * footer instead of running underneath it.
 */
export default function CommandField() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="bg-command-grid absolute inset-0" />

      {/* Behind the hero, in the mark's gold. Warm, because the subject
          directly on top of it is the sun arriving at somebody's roof. */}
      <div
        className="absolute -top-[22%] left-1/2 h-[80vw] w-[80vw] -translate-x-1/2 rounded-full blur-[140px]"
        style={{background: 'radial-gradient(circle, color-mix(in srgb, var(--color-amber) 9%, transparent), transparent 66%)'}}
      />

      {/* A lime wash where the journeys sit, so the middle of the page is lit
          by the other half of the wordmark. */}
      <div
        className="absolute top-[26%] -left-[18%] h-[56vw] w-[56vw] rounded-full blur-[150px]"
        style={{background: 'radial-gradient(circle, color-mix(in srgb, var(--color-green) 5.5%, transparent), transparent 68%)'}}
      />

      {/* And the panel blue, far enough down to light the operations half. */}
      <div
        className="absolute top-[62%] -right-[20%] h-[64vw] w-[64vw] rounded-full blur-[150px]"
        style={{background: 'radial-gradient(circle, color-mix(in srgb, var(--color-blue) 8.5%, transparent), transparent 68%)'}}
      />

      {/* Sides down, and the last few per cent held for the handoff to the
          footer. Linear passes rather than a vignette: the element is many
          screens tall, so an ellipse sized to it would mean nothing. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, color-mix(in srgb, var(--color-bg) 85%, transparent), transparent 18%, transparent 82%, color-mix(in srgb, var(--color-bg) 85%, transparent)), linear-gradient(180deg, transparent 0%, transparent 96%, color-mix(in srgb, var(--color-bg) 90%, transparent))'
        }}
      />
    </div>
  );
}
