import {cn} from '../lib/cn';

/**
 * The mark plus the two-line GUARDIAN / CARE wordmark.
 *
 * The artwork is the dark-ground variant, whose G is drawn in near-white
 * (#f0f2f5) rather than the navy of the light-ground version. That is what
 * removed the white plate this used to need: the original G is #001128
 * against a #011227 page — 1.01:1, the same colour — so it rendered as a
 * green swoosh with nothing inside it, and a plate was the only way to make
 * the letterform exist. Drawn in white it reads directly on the navy at about
 * 17:1 and needs no help.
 *
 * Served from `public/assets` rather than off Cloudinary, so the mark is not
 * a third-party request on every page. The source was 1307×1203 at 677 KB —
 * for something never drawn above 64px — and is now 256×236 at 39 KB, box
 * filtered with alpha premultiplied so the edges carry no halo. Sampled
 * against the original, every dominant colour survives within 1/255.
 */
const SIZES = {
  entry: {
    mark: 'h-16 w-16',
    name: 'text-[22px] tracking-[.32em]',
    sub: 'text-[15px] tracking-[.42em]'
  },
  nav: {
    mark: 'h-10 w-10',
    name: 'text-[15px] tracking-[.26em]',
    sub: 'text-[11px] tracking-[.36em]'
  },
  footer: {
    mark: 'h-11 w-11',
    name: 'text-[15px] tracking-[.32em]',
    sub: 'text-[11px] tracking-[.42em]'
  }
} as const;

type LockupProps = {
  size?: keyof typeof SIZES;
  className?: string;
};

export default function Lockup({size = 'nav', className}: LockupProps) {
  const s = SIZES[size];

  return (
    <div className={cn('flex items-center gap-[13px]', className)}>
      <img
        src="/assets/logo-mark.png"
        alt=""
        aria-hidden="true"
        width={256}
        height={236}
        className={cn('shrink-0 object-contain', s.mark)}
      />

      <div>
        <div className={cn('font-display font-medium leading-none text-ink', s.name)}>GUARDIAN</div>
        <div className={cn('mt-[3px] font-display font-medium leading-none text-brand-gradient', s.sub)}>
          CARE
        </div>
      </div>
    </div>
  );
}
