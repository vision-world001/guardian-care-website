/**
 * The ground a step stands on.
 *
 * The hero has the sun behind it and the two steps after it had nothing — a
 * flat grey panel each. That is most of why they read as lesser pages: the
 * content was fine, but the first screen was lit and the next two were not, so
 * the journey looked like it started well and then handed over to a form.
 *
 * Two soft glows tinted by the step's own colour, and a hairline across the
 * top edge to seat the block against whatever came before it. Held far enough
 * back that no readout ever competes with it — this is atmosphere, and the
 * moment anybody notices it directly it is too strong.
 */
export default function StepField({tone}: {tone: 'blue' | 'green'}) {
  const colour = tone === 'blue' ? 'var(--color-blue)' : 'var(--color-green)';

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 1100px 620px at 14% -8%, color-mix(in srgb, ${colour} 13%, transparent), transparent 62%), radial-gradient(ellipse 900px 560px at 92% 104%, color-mix(in srgb, ${colour} 10%, transparent), transparent 60%)`
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, color-mix(in srgb, ${colour} 40%, transparent), transparent)`
        }}
      />
    </div>
  );
}
