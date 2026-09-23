import {cn} from '../lib/cn';
import {useTheme} from '../lib/theme';

/**
 * The mark plus the two-line GUARDIAN / CARE wordmark.
 *
 * Two files, because a mark is drawn for a ground. The dark-ground artwork's
 * G is near-white (#f0f2f5) rather than navy, which is what removed the white
 * plate this used to need: the original G is #001128 against a #011227 page —
 * 1.01:1, the same colour — so it rendered as a green swoosh with nothing
 * inside it, and a plate was the only way to make the letterform exist. Drawn
 * in white it reads directly on the navy at about 17:1 and needs no help.
 *
 * The day file is that same artwork with its letterform repainted in the
 * brand navy and the swoosh left alone. Without it the identical failure
 * happens in mirror image on the white page, and a navy plate to fix it would
 * be the plate all over again.
 *
 * Which one is used comes off React state rather than off two stacked images
 * hidden by CSS: the inline script in index.html sets `data-theme` before the
 * app mounts, so the first render already picks the right file and the
 * browser only ever fetches one of them.
 *
 * Served from `public/assets` rather than off Cloudinary, so the mark is not
 * a third-party request on every page. The source was 1307×1203 at 677 KB —
 * for something never drawn above 64px — and is now 256×236 at 39 KB, box
 * filtered with alpha premultiplied so the edges carry no halo. Sampled
 * against the original, every dominant colour survives within 1/255.
 */
/**
 * `words` is how the wordmark behaves when there is no room for it.
 *
 * Only the nav has that problem: at 320px the bar has to hold the lockup, the
 * theme switch and a button, and the two-line GUARDIAN / CARE is a third of
 * the width on its own. Below 400px it drops to the mark alone.
 *
 * `sr-only` rather than `hidden`, because the mark is decorative — it carries
 * `alt=""` — and the wordmark is the only place the company is named. Hiding
 * it outright would leave a screen reader on a small phone with a nav bar
 * belonging to nobody. This keeps the name in the accessibility tree and takes
 * it out of the layout, which is exactly the distinction the two utilities
 * exist to make.
 */
/**
 * `navy` is whether this lockup sits on the brand ground rather than on the
 * page, and it decides which of the two files is used regardless of theme.
 *
 * The bar and the footer stay navy on the day theme — they are the frame the
 * page sits in — so the mark in them wants the near-white G at every setting.
 * Only the entry lockup is on the page itself and follows the theme. Getting
 * this backwards is not subtle: the day file's G is the brand navy, and on a
 * navy band that is 1.01:1, the exact disappearing act both files exist to
 * prevent.
 */
const SIZES = {
  entry: {
    mark: 'h-16 w-16',
    gap: 'gap-[13px]',
    words: '',
    navy: false,
    name: 'text-[22px] tracking-[.32em]',
    sub: 'text-[15px] tracking-[.42em]'
  },
  nav: {
    mark: 'h-10 w-10',
    gap: 'gap-0 min-[400px]:gap-[13px]',
    words: 'sr-only min-[400px]:not-sr-only',
    navy: true,
    name: 'text-[15px] tracking-[.26em]',
    sub: 'text-[11px] tracking-[.36em]'
  },
  footer: {
    mark: 'h-11 w-11',
    gap: 'gap-[13px]',
    words: '',
    navy: true,
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
  const {theme} = useTheme();

  return (
    <div className={cn('flex items-center', s.gap, className)}>
      <img
        src={
          theme === 'day' && !s.navy ? '/assets/logo-mark-day.png' : '/assets/logo-mark.png'
        }
        alt=""
        aria-hidden="true"
        width={256}
        height={236}
        className={cn('shrink-0 object-contain', s.mark)}
      />

      <div className={s.words}>
        <div className={cn('font-display font-medium leading-none text-ink', s.name)}>GUARDIAN</div>
        <div className={cn('mt-[3px] font-display font-medium leading-none text-brand-gradient', s.sub)}>
          CARE
        </div>
      </div>
    </div>
  );
}
