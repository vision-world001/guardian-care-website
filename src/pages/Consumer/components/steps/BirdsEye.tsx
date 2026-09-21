import Counter from '../../../../components/Counter';
import {TONE_TEXT, TONE_VAR, type StatusTone} from '../../../../data/command';
import {DAY, GRID_COST, HOME, pounds} from '../../../../data/consumer';
import {cn} from '../../../../lib/cn';
import {LiveDot} from '../../../Home/components/Conduit';
import {LABEL, LABEL_BASE} from '../../../../components/kit';

/**
 * Step 05: the bird's-eye view.
 *
 * The brief's own six figures, drawn as what they are — one amount of
 * electricity arriving and three places it went — rather than as six equal
 * tiles. Line weight carries the amount, so the 9 kWh used in the house is
 * physically the widest channel and the eye lands on it first; the dots
 * travelling along each channel are the same crawl the home page draws energy
 * with.
 *
 * The branches meet their columns exactly. The drawing is a fixed-aspect SVG
 * whose three endpoints sit at one sixth, one half and five sixths of its
 * width, and the columns beneath are a hairline grid of thirds — so the centres
 * agree at every width without measuring anything.
 */

const BRANCHES: Array<{label: string; value: number; tone: StatusTone; x: number}> = [
  {label: 'Used in your home', value: DAY.used, tone: 'green', x: 100},
  {label: 'Stored', value: DAY.stored, tone: 'purple', x: 300},
  {label: 'Exported', value: DAY.exported, tone: 'blue', x: 500}
];

const VB = {w: 600, h: 84};

/** 4 kWh reads as a thread, 9 as a channel. */
function weight(kwh: number): number {
  return 3 + kwh * 1.1;
}

export default function BirdsEye() {
  return (
    <div className="glass shadow-lift ring-lit overflow-hidden rounded-frame">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line-2 px-5 py-4 min-[520px]:px-6">
        <span className="flex items-center gap-2.5">
          <LiveDot />
          <span className={cn(LABEL_BASE, 'text-[10.5px] tracking-[.16em] text-green')}>Bird’s-eye view</span>
        </span>
        <span className="mono text-[10px] uppercase tracking-[.16em] text-faint">
          Example home · one sunny day
        </span>
      </div>

      {/* ---------- What arrived ---------- */}
      <div className="px-5 pt-8 text-center min-[520px]:px-6">
        <div className={cn(LABEL, 'text-faint')}>Solar generated</div>
        <div className="mono mt-3 text-[clamp(40px,6vw,56px)] font-semibold leading-none text-amber">
          <Counter value={DAY.generated.toFixed(1)} />
          <span className="mono ml-2 text-[14px] font-normal text-faint">kWh</span>
        </div>
      </div>

      {/* ---------- Where it went ---------- */}
      <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className="mt-4 block h-auto w-full" aria-hidden="true">
        {BRANCHES.map((branch, index) => {
          const d = `M 300 0 C 300 ${VB.h * 0.55}, ${branch.x} ${VB.h * 0.45}, ${branch.x} ${VB.h}`;
          const colour = TONE_VAR[branch.tone];
          return (
            <g key={branch.label}>
              <path
                d={d}
                fill="none"
                stroke={colour}
                strokeWidth={weight(branch.value)}
                strokeLinecap="round"
                opacity="0.18"
              />
              <path
                d={d}
                fill="none"
                stroke={colour}
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeDasharray="2 8"
                opacity="0.95"
                style={{animation: 'crawl 3s linear infinite', animationDelay: `${index * -0.6}s`}}
              />
            </g>
          );
        })}
      </svg>

      <dl className="grid grid-cols-3 gap-px bg-line-2">
        {BRANCHES.map((branch) => (
          <div key={branch.label} className="bg-panel px-2 pb-5 pt-4 text-center min-[520px]:px-4">
            <dt className="text-[12.5px] font-light leading-tight text-muted min-[520px]:text-[13px]">
              {branch.label}
            </dt>
            <dd
              className={cn(
                'mono mt-2 text-[22px] font-semibold leading-none min-[520px]:text-[26px]',
                TONE_TEXT[branch.tone]
              )}
            >
              <Counter value={branch.value.toFixed(1)} />
              <span className="mono ml-1 text-[11px] font-normal text-faint">kWh</span>
            </dd>
            <dd className="mono mt-2 text-[10.5px] text-faint">
              {Math.round((branch.value / DAY.generated) * 100)}%
            </dd>
          </div>
        ))}
      </dl>

      {/* ---------- And what still had to be bought ---------- */}
      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 border-t border-line-2 px-4 py-5 text-center min-[520px]:gap-3 min-[520px]:px-6">
        <Figure label="Grid import" value={`${DAY.imported.toFixed(1)} kWh`} tone="orange" />
        <Operator symbol="×" />
        <Figure label="Current grid rate" value={`${HOME.importRate}p/kWh`} tone="ink" />
        <Operator symbol="=" />
        <Figure label="Grid cost" value={pounds(GRID_COST)} tone="ink" />
      </div>

      <p className="mono border-t border-line-2 bg-bg/40 px-5 py-4 text-center text-[10.5px] uppercase tracking-[.12em] text-faint min-[520px]:px-6">
        {DAY.used} + {DAY.stored} + {DAY.exported} = {DAY.generated} kWh · every unit accounted for
      </p>
    </div>
  );
}

function Figure({label, value, tone}: {label: string; value: string; tone: StatusTone}) {
  return (
    <div className="min-w-0">
      <div className="text-[11.5px] font-light leading-tight text-muted min-[520px]:text-[12.5px]">
        {label}
      </div>
      <div
        className={cn(
          'mono mt-1.5 text-[14px] font-semibold min-[520px]:text-[17px]',
          TONE_TEXT[tone]
        )}
      >
        {value}
      </div>
    </div>
  );
}

function Operator({symbol}: {symbol: string}) {
  return (
    <span aria-hidden="true" className="mono text-[15px] font-semibold text-faint">
      {symbol}
    </span>
  );
}
