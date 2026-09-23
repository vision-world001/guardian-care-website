import {useEffect, useRef} from 'react';
import {useTheme} from '../../lib/theme';
import Reveal from '../../components/Reveal';
import {cn} from '../../lib/cn';

/**
 * The site's sign-off, just before the footer: the name rising out of a
 * surface of water drawn as a lattice of small points.
 *
 * The lattice is square — at rest every point is exactly the same distance
 * from its four neighbours, left, right, above and below. The waves are a
 * height field over that lattice, and the surface is seen from the front: each
 * point is lifted by its height, so a row of points becomes one wave line and
 * the rows together become the surface. Nothing is foreshortened toward a
 * horizon; the depth comes from the surface itself — waves grow toward the
 * viewer, crests catch the light, faces turned toward the viewer are lit and
 * faces turned away fall into shadow, and the far rows fade out.
 *
 * The name sits inside the water, not over it: the surface is drawn on two
 * canvases split at the name's baseline, so the rows in front of the word
 * pass over its foot while the rows behind it show between the letters.
 *
 * Canvas rather than SVG: several thousand points redrawn every frame. The
 * loop runs only while the section is on screen, and a reader who has asked
 * for reduced motion gets a single still frame.
 */

/* The mark's three colours, left to right across the surface — once per
   ground. The points are painted onto a canvas rather than styled, so they
   cannot inherit a token; the day ramp is the same three hues walked down
   until they hold against a white page, where the dark one's amber lands at
   about 1.4:1 and the surface reads as a smudge. */
const RAMPS: Record<'night' | 'day', Array<[number, number, number]>> = {
  night: [
    [255, 210, 97],
    [113, 190, 19],
    [61, 154, 232]
  ],
  day: [
    [176, 122, 0],
    [69, 111, 6],
    [10, 95, 181]
  ]
};

function ramp(stops: Array<[number, number, number]>, t: number): string {
  const seg = t <= 0.5 ? 0 : 1;
  const local = seg === 0 ? t / 0.5 : (t - 0.5) / 0.5;
  const a = stops[seg];
  const b = stops[seg + 1];
  const c = a.map((v, k) => Math.round(v + (b[k] - v) * local));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

const SHADES = 128;
const PALETTES = {
  night: Array.from({length: SHADES}, (_, i) => ramp(RAMPS.night, i / (SHADES - 1))),
  day: Array.from({length: SHADES}, (_, i) => ramp(RAMPS.day, i / (SHADES - 1)))
};

/** Rows beyond the bottom edge, so a near crest can rise into view. */
const SPARE_ROWS = 4;

const clamp = (v: number, lo: number, hi: number) => (v < lo ? lo : v > hi ? hi : v);

export default function WaveSign() {
  const sectionRef = useRef<HTMLElement>(null);
  const backRef = useRef<HTMLCanvasElement>(null);
  const frontRef = useRef<HTMLCanvasElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const {theme} = useTheme();
  const colours = PALETTES[theme];

  useEffect(() => {
    const section = sectionRef.current;
    const back = backRef.current;
    const front = frontRef.current;
    const word = wordRef.current;
    if (!section || !back || !front || !word) return;
    const bctx = back.getContext('2d');
    const fctx = front.getContext('2d');
    if (!bctx || !fctx) return;

    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let W = 0;
    let H = 0;
    /** Spacing between neighbouring points — the same across and down. */
    let S = 12;
    let cols = 0;
    let rows = 0;
    let x0 = 0;
    let waterline = 0;
    let heights = new Float32Array(0);
    let arch = new Float32Array(0);
    let shade = new Uint8Array(0);
    let frame = 0;
    let running = false;
    const epoch = performance.now();

    function measure() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const box = section!.getBoundingClientRect();
      W = box.width;
      H = box.height;
      if (!W || !H) return;

      for (const canvas of [back!, front!]) {
        canvas.width = Math.round(W * dpr);
        canvas.height = Math.round(H * dpr);
      }
      bctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      fctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      S = clamp(Math.round(W / 96), 10, 15);
      cols = Math.ceil(W / S) + 3;
      rows = Math.ceil(H / S) + SPARE_ROWS;
      x0 = (W - (cols - 1) * S) / 2;
      heights = new Float32Array(cols * rows);

      /* A gentle parabola across the whole surface, so every row bows up
         toward the middle: the surface swells under the name. The same lift
         for every row, so the rows stay parallel and evenly spaced. */
      arch = new Float32Array(cols);
      shade = new Uint8Array(cols);
      for (let i = 0; i < cols; i++) {
        const u = clamp((x0 + i * S) / W, 0, 1);
        arch[i] = H * 0.07 * (1 - (2 * u - 1) ** 2);
        shade[i] = Math.round(u * (SHADES - 1));
      }

      waterline = word!.getBoundingClientRect().bottom - box.top;
    }

    /** Wave amplitude for a row: small in the distance, large up close. */
    const amplitude = (j: number) => S * (1 + 4 * clamp(j / (rows - SPARE_ROWS), 0, 1.15));

    function draw(time: number) {
      bctx!.clearRect(0, 0, W, H);
      fctx!.clearRect(0, 0, W, H);
      if (!cols) return;

      /* Heights first, so each point can be shaded from its neighbours. Three
         swells in three directions at three speeds: one alone is a sine
         sheet, three together are water. */
      for (let j = 0; j < rows; j++) {
        const amp = amplitude(j);
        for (let i = 0; i < cols; i++) {
          const wave =
            0.6 * Math.sin(0.12 * i + 0.16 * j - 0.8 * time) +
            0.3 * Math.sin(-0.09 * i + 0.21 * j - 1.05 * time + 1.7) +
            0.1 * Math.sin(0.27 * i + 0.33 * j - 1.6 * time + 0.4);
          heights[j * cols + i] = amp * wave + arch[i];
        }
      }

      for (let j = 0; j < rows; j++) {
        const restY = j * S;
        /* Rows nearer than the name's baseline are drawn in front of it. */
        const ctx = restY > waterline ? fctx! : bctx!;
        const depth = clamp(restY / H, 0, 1);
        /* The far rows fade out, like water running into haze. */
        const rowAlpha = Math.min(1, (depth / 0.36) ** 1.4);
        if (rowAlpha < 0.02) continue;
        const amp = amplitude(j);
        const up = j > 0 ? j - 1 : j;
        const down = j < rows - 1 ? j + 1 : j;
        const size = 1.5 + 1.4 * depth;

        for (let i = 0; i < cols; i++) {
          const k = j * cols + i;
          const h = heights[k];
          const crest = (h - arch[i]) / amp;

          /* Slope toward the viewer: a face whose far side is higher than its
             near side is turned toward us and catches the light. */
          const slopeY = (heights[up * cols + i] - heights[down * cols + i]) / (2 * S);
          const left = i > 0 ? heights[k - 1] : h;
          const right = i < cols - 1 ? heights[k + 1] : h;
          const slopeX = (left - right) / (2 * S);
          const facing = clamp(slopeY * 1.1 + slopeX * 0.3, -1, 1);

          const light = clamp(0.36 + 0.42 * (crest + 1) * 0.5 + 0.6 * facing, 0.08, 1);
          const dot = size + 0.8 * Math.max(0, crest);

          ctx.globalAlpha = rowAlpha * light;
          ctx.fillStyle = colours[shade[i]];
          ctx.fillRect(x0 + i * S - dot / 2, restY - h - dot / 2, dot, dot);
        }
      }

      bctx!.globalAlpha = 1;
      fctx!.globalAlpha = 1;
    }

    function loop(now: number) {
      draw((now - epoch) / 1000);
      frame = requestAnimationFrame(loop);
    }

    function start() {
      if (running || still) return;
      running = true;
      frame = requestAnimationFrame(loop);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(frame);
    }

    function redraw() {
      measure();
      draw(still ? 2.4 : (performance.now() - epoch) / 1000);
    }

    redraw();

    /* The web font arriving late resizes the name, and with it the waterline. */
    const resize = new ResizeObserver(redraw);
    resize.observe(section);
    resize.observe(word);

    const visible = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else stop();
    });
    visible.observe(section);

    return () => {
      stop();
      resize.disconnect();
      visible.disconnect();
    };
  }, [colours]);

  return (
    <section
      ref={sectionRef}
      aria-hidden="true"
      className={cn(
        'relative isolate h-[clamp(320px,42vw,640px)] overflow-hidden bg-bg'
      )}
    >
      <canvas ref={backRef} className="pointer-events-none absolute inset-0 h-full w-full" />

      {/* Light on the water where the name breaks the surface. */}
      <div
        className="pointer-events-none absolute left-1/2 top-[56%] h-[60%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]"
        style={{
          background:
            'radial-gradient(ellipse, color-mix(in srgb, var(--color-green) 13%, transparent), color-mix(in srgb, var(--color-amber) 5%, transparent) 45%, transparent 72%)'
        }}
      />

      <div ref={wordRef} className="absolute inset-x-0 bottom-[36%] z-10 flex justify-center">
        <Reveal animation="animate-rise">
          <div style={{filter: 'drop-shadow(0 0 44px color-mix(in srgb, var(--color-green) 22%, transparent))'}}>
            <span
              className="block whitespace-nowrap font-display font-semibold uppercase leading-[0.78] tracking-[0.005em]"
              style={{
                fontSize: 'clamp(34px, 13vw, 250px)',
                background: 'linear-gradient(100deg, var(--ramp-far), var(--ramp-mid))',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                /* The foot of the word dissolves into the water. */
                maskImage: 'linear-gradient(180deg, #000 38%, rgba(0,0,0,0.12) 100%)',
                WebkitMaskImage: 'linear-gradient(180deg, #000 38%, rgba(0,0,0,0.12) 100%)'
              }}
            >
              Guardian Care
            </span>
          </div>
        </Reveal>
      </div>

      {/* The near water, over the foot of the name. */}
      <canvas
        ref={frontRef}
        className="pointer-events-none absolute inset-0 z-20 h-full w-full"
      />
    </section>
  );
}
