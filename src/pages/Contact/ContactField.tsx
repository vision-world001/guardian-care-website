/**
 * The ground the contact page stands on.
 *
 * A photograph rather than the journeys' lattice of light: this is the one page
 * where the subject is a person getting in touch, so the ground is a person
 * getting in touch. It replaces `CommandField` here rather than sitting under
 * it — arcs striking across a photograph would be two grounds competing, and
 * behind a form that is simply noise.
 *
 * **The blur is deliberately weak.** It started at 46px, which reduced the frame
 * to a wash of colour — the hands, the phone and the laptop were gone, and what
 * was left could have been any photograph at all. At 14px the subject is legible
 * as a subject while still being plainly a background.
 *
 * That is as sharp as it can usefully go, and the limit is the file rather than
 * the design: the source is 576x384, well under the 1600px the photo guide asks
 * for, so at full-bleed it is already being upscaled three or four times over. A
 * modest blur is doing double duty here — it is the effect that was asked for,
 * and it is what keeps that upscaling from reading as a fault. Taking it much
 * below this starts showing JPEG blocking rather than detail, because there is
 * no detail left to show. Wanting it genuinely sharp means a bigger file.
 *
 * The 1.06 scale is not decoration either. A CSS blur samples beyond the
 * element's own edges, where there is nothing, so an unscaled blurred image
 * fades to transparent for roughly the blur radius on all four sides and draws a
 * pale border around the page. Oversizing pushes that band outside the crop, and
 * it only has to cover the radius — 6% of a 1200px-wide field is around 36px
 * either side against a 14px blur, so this is already generous.
 *
 * **Both themes, from one set of stops.** The veil mixes against `--color-bg`,
 * which is navy on the night theme and warm off-white on the day one, so the
 * same three layers read as a dark wash over a bright photograph in one and a
 * soft haze in the other, without a second rule for either. It reaches a solid
 * `--color-bg` at the bottom edge, so the join to the footer has no seam in it.
 *
 * Entirely presentational: `aria-hidden`, no pointer events, negative z-index,
 * and the image carries an empty `alt` because it is the page's ground rather
 * than any of its content. Nothing animates.
 */
export default function ContactField() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <img
        src="/assets/photos/contact.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          /* One chain, written out, and not `img-graded blur-[46px]` as classes.
             Both of those utilities set `filter` — `.img-graded` to
             `var(--img-grade)` and the blur to Tailwind's own filter stack — so
             put together on one element the later rule in the stylesheet wins
             outright and the other is dropped in silence. The page still looked
             plausible either way, which is what makes it worth spelling out:
             the image was graded but unblurred, or blurred but unGraded,
             depending on nothing the markup could show you.

             Grade first, then blur, because grading is a correction to the
             photograph and blurring is what is done to the corrected image. */
          filter: 'var(--img-grade) blur(14px)',
          transform: 'scale(1.06)'
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: [
            /* Heaviest where the heading sits, so large display type is read
               against something near-solid rather than against a window. */
            'radial-gradient(ellipse 900px 620px at 50% 0%, color-mix(in srgb, var(--color-bg) 48%, transparent), transparent 72%)',
            /* Down the page, and all the way to the page's own colour at the
               foot of it. */
            'linear-gradient(180deg, color-mix(in srgb, var(--color-bg) 58%, transparent) 0%, color-mix(in srgb, var(--color-bg) 68%, transparent) 42%, color-mix(in srgb, var(--color-bg) 86%, transparent) 78%, var(--color-bg) 100%)',
            /* And the sides in, so the field reads as lit rather than as a flat
               band laid across the width. */
            'linear-gradient(90deg, color-mix(in srgb, var(--color-bg) 34%, transparent), transparent 22%, transparent 78%, color-mix(in srgb, var(--color-bg) 34%, transparent))'
          ].join(', ')
        }}
      />
    </div>
  );
}
