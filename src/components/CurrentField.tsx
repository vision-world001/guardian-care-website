import {useEffect, useRef, useState} from 'react';

/**
 * The current, on the ground.
 *
 * A lattice of hairlines used to stand here. It was replaced because a grid is
 * a *drawn* thing and the page behind it is about electricity moving through a
 * house: the ground should be the current, not a diagram of where the current
 * might go. So it is short beams that strike at a random point, run out in a
 * random direction and go — and, far less often, a warm flare where the light
 * the whole product is about comes off something.
 *
 * **The division of labour with CSS.** Everything random lives here; nothing
 * else does. The *look* of a discharge is not random at all — it is one fixed
 * sequence of attack, flicker and decay that every strike shares — so that
 * lives in `@keyframes arc-strike` and `@keyframes sun-flare`, and the
 * compositor runs it. This file never touches a style during an animation. It
 * sets a handful of custom properties while the element is invisible, names an
 * animation, and gets out of the way until `animationend`.
 *
 * **Cost.** One element per slot, allocated once and reused forever: no node is
 * created or thrown away while the page is open, so there is nothing for the
 * collector to do. Between strikes a slot has no animation at all — not a
 * running one held at zero opacity — so an idle beam costs a style rule and no
 * frames. The only per-strike work in JavaScript is six `setProperty` calls and
 * a `setTimeout`, at a rate set by `gap`; with the pools the two fields use
 * that is under ten of each per second, none of it in a rAF loop.
 *
 * **Why the strikes follow the reader.** These fields are `absolute inset-0`
 * inside a `<main>` that is five or six screens tall, so scattering slots down
 * the whole of it would put roughly six beams in seven off-screen, and a pool
 * big enough to look alive in the viewport would have to be six times larger
 * for no visible return. Each strike is instead placed inside the band the
 * reader can currently see, recomputed at the moment it fires. The pool stays
 * small and every beam in it is spent where somebody is looking.
 *
 * **Why they keep to the margins.** See `edgeX`. Movement behind a paragraph is
 * the most distracting thing a background can do — far worse than the texture
 * the old lattice was masked back for — so strikes are biased out to the outer
 * third of the page and the container carries `mask-reading` on top of that.
 * Two defences, because one would not be enough.
 *
 * **Reduced motion.** The base stylesheet collapses every animation to one
 * iteration at 0.01ms, which for a ground made entirely of flashes would mean
 * an empty page — and, worse, a scheduler spinning on `animationend` events
 * that fire immediately. So this opts out of scheduling altogether and marks
 * each slot `data-still`: one random arrangement of beams, laid out once, held
 * at a resting opacity by the stylesheet. A composition rather than a blank.
 */

export type Weather = {
  /** How many beams the field can have in flight. */
  arcs: number;
  /** How many flares. Far fewer — a flare is an event, not a texture. */
  flares: number;
  /**
   * The colours a beam can take. Repeat an entry to weight it: the console
   * leans blue because it is an instrument, the journey amber because it is a
   * roof in the sun.
   */
  tones: string[];
  /** Beam length, px. */
  reach: [number, number];
  /** Beam box height, px. The glow fills it; the core stays 2px regardless. */
  thick: [number, number];
  /** How long one strike lasts, ms. */
  strike: [number, number];
  /** How long a slot waits between strikes, ms. */
  gap: [number, number];
  /** Flare diameter, px. */
  flareSize: [number, number];
  /** How long a flare burns, ms. */
  flareBurn: [number, number];
  /** How long a flare slot waits, ms. */
  flareGap: [number, number];
};

/** A flare is the sun. It is warm on both themes and takes no other colour. */
const SUN = 'var(--bolt-amber)';

const rand = (lo: number, hi: number) => lo + Math.random() * (hi - lo);
const pick = (xs: string[]) => xs[Math.floor(Math.random() * xs.length)];

export default function CurrentField({weather}: {weather: Weather}) {
  const host = useRef<HTMLDivElement>(null);

  /* Read before the first paint rather than in an effect, so a reader who asked
     for no motion never gets a single frame of the scheduled version. */
  const [still, setStill] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setStill(query.matches);
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    /* Where this field sits in the document, and how tall it is. Cached rather
       than measured per strike: `getBoundingClientRect` forces layout, and
       doing that on a timer interleaved with the style writes below is the
       classic way to turn a cheap effect into a thrash. A ResizeObserver
       refreshes it when the page actually changes height — images landing, a
       section expanding — which is the only time it can go stale. */
    let top = 0;
    let height = 0;

    const measure = () => {
      const box = el.getBoundingClientRect();
      top = box.top + window.scrollY;
      height = box.height;
    };

    measure();

    const observer =
      typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
    observer?.observe(el);
    window.addEventListener('resize', measure);

    /** A point inside the band the reader can currently see. */
    const bandY = () => {
      const seen = window.scrollY - top + Math.random() * window.innerHeight;
      return Math.max(0, Math.min(Math.max(height - 1, 0), seen));
    };

    /**
     * Biased out to the margins, either side, thinning fast towards the middle.
     *
     * A percentage rather than a pixel offset, because the thing being kept
     * clear is the centred reading column and that is the only landmark that
     * holds still at every width. Picking a side and then an inset — rather
     * than sampling the whole width and rejecting the middle — means every call
     * lands on the first try and the two sides stay evenly weighted.
     *
     * The inset is squared, and that is the part that matters. Sampling the
     * outer 34% flat is barely a bias at all: measured against a 1220px column,
     * 46% of origins still land inside it at 1920px and 78% at 1440px, because
     * the outer 34% of a narrow page *is* mostly column. Squaring pushes the
     * mass to the page edge and roughly halves both figures — 27% and 53%.
     *
     * Halves, not eliminates, and deliberately. A middle swept perfectly clean
     * reads as two curtains of light with a hole between them, which is a more
     * obvious artefact than the thing it avoids. The strikes that do run inward
     * are the rare deep ones, and `mask-reading` takes them down to under half
     * strength when they get there. Below about 1280px the column is the whole
     * page and the mask dims everything, which is the right answer at that
     * width for the same reason.
     */
    const edgeX = () => {
      const roll = Math.random();
      const inset = roll * roll * 34;
      return Math.random() < 0.5 ? inset : 100 - inset;
    };

    const dressArc = (node: HTMLElement) => {
      const thick = rand(weather.thick[0], weather.thick[1]);
      node.style.setProperty('--arc-a', `${Math.round(rand(0, 360))}deg`);
      node.style.setProperty('--arc-tone', pick(weather.tones));
      node.style.setProperty(
        '--arc-dur',
        `${Math.round(rand(weather.strike[0], weather.strike[1]))}ms`
      );
      node.style.left = `${edgeX().toFixed(2)}%`;
      node.style.top = `${Math.round(bandY())}px`;
      node.style.width = `${Math.round(rand(weather.reach[0], weather.reach[1]))}px`;
      node.style.height = `${thick.toFixed(1)}px`;
      /* The box is centred on the strike point, not hung below it. Done in the
         margin rather than the transform because the transform belongs to the
         keyframes, and a translate added here would have to be repeated in
         every one of them to survive. */
      node.style.marginTop = `${(-thick / 2).toFixed(1)}px`;
    };

    const dressFlare = (node: HTMLElement) => {
      const size = Math.round(rand(weather.flareSize[0], weather.flareSize[1]));
      node.style.setProperty('--flare-tone', SUN);
      node.style.setProperty(
        '--arc-dur',
        `${Math.round(rand(weather.flareBurn[0], weather.flareBurn[1]))}ms`
      );
      node.style.left = `${edgeX().toFixed(2)}%`;
      node.style.top = `${Math.round(bandY())}px`;
      node.style.width = `${size}px`;
      node.style.height = `${size}px`;
    };

    const slots = Array.from(el.children) as HTMLElement[];

    if (still) {
      for (const node of slots) {
        /* Cleared first, and not only for tidiness. If the reader turns reduced
           motion on while the field is running, a slot can arrive here with a
           name still on it — and the reduced-motion rule in the base stylesheet
           would then run that animation to its end frame at 0.01ms. An
           animation's fill sits in a higher cascade origin than an ordinary
           declaration, so it would beat the resting opacity below and the
           ground would go black instead of still. */
        node.style.animationName = 'none';
        if (node.dataset.kind === 'arc') dressArc(node);
        else dressFlare(node);
        node.dataset.still = '';
      }
      return () => {
        observer?.disconnect();
        window.removeEventListener('resize', measure);
      };
    }

    const timers = new Set<number>();
    const stops: Array<() => void> = [];

    for (const node of slots) {
      const arc = node.dataset.kind === 'arc';
      const dress = arc ? dressArc : dressFlare;
      const name = arc ? 'arc-strike' : 'sun-flare';
      const gap = arc ? weather.gap : weather.flareGap;

      delete node.dataset.still;

      const fire = () => {
        dress(node);
        node.style.animationName = name;
      };

      /* Clearing the name is what makes the next `fire` restart the animation
         rather than being ignored as a no-op assignment of the same value. The
         wait between the two is long enough that the style flush happens on its
         own, so there is no reflow to force. */
      const rest = (ms: number) => {
        node.style.animationName = 'none';
        const timer = window.setTimeout(() => {
          timers.delete(timer);
          fire();
        }, ms);
        timers.add(timer);
      };

      const onEnd = () => rest(rand(gap[0], gap[1]));
      node.addEventListener('animationend', onEnd);
      stops.push(() => node.removeEventListener('animationend', onEnd));

      /* Staggered from nothing, so the ground arrives over the first few
         seconds instead of every slot firing on the same frame as the page. */
      rest(Math.random() * gap[1]);
    }

    return () => {
      for (const timer of timers) window.clearTimeout(timer);
      for (const stop of stops) stop();
      observer?.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [weather, still]);

  return (
    <div
      ref={host}
      aria-hidden="true"
      className="mask-reading pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {Array.from({length: weather.arcs}, (_, i) => (
        <span key={`arc-${i}`} data-kind="arc" className="paint-arc absolute" />
      ))}
      {Array.from({length: weather.flares}, (_, i) => (
        <span key={`flare-${i}`} data-kind="flare" className="paint-flare absolute" />
      ))}
    </div>
  );
}
