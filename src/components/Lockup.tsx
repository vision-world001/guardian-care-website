import {cn} from '../lib/cn';

const SIZES = {
  entry: {mark: 'h-[52px] w-[52px]', name: 'text-[20px] tracking-[.32em]', sub: 'text-[14px] tracking-[.42em]'},
  nav: {mark: 'h-8 w-8', name: 'text-[14px] tracking-[.26em]', sub: 'text-[10px] tracking-[.36em]'},
  footer: {mark: 'h-9 w-9', name: 'text-[14px] tracking-[.32em]', sub: 'text-[10px] tracking-[.42em]'}
} as const;

type LockupProps = {
  size?: keyof typeof SIZES;
  className?: string;
};

/** The mark plus the two-line GUARDIAN / CARE wordmark. */
export default function Lockup({size = 'nav', className}: LockupProps) {
  const s = SIZES[size];

  return (
    <div className={cn('flex items-center gap-[13px]', className)}>
      <img
        src="https://res.cloudinary.com/maefwdv4/image/upload/f_auto,q_auto/logo2"
        alt=""
        aria-hidden="true"
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
