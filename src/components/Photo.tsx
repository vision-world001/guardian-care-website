import {useState} from 'react';
import {cn} from '../lib/cn';

/**
 * A photograph, graded to sit on a near-black page.
 *
 * The page is about somebody's house and needs to look like it — a homeowner
 * recognises a roof long before they recognise a chart. But a daylight
 * photograph dropped straight onto #050e1a glares, and instantly reads as
 * stock art pasted onto a product. So every image is pulled down in
 * brightness, cooled slightly, and married to the ground beneath it with a
 * gradient veil, which is also what keeps overlaid type legible.
 *
 * Files live in `public/assets/photos/`. If one is missing the slot falls back
 * to a brand-tinted gradient rather than a broken frame, so the page never
 * looks unfinished while a photograph is being swapped.
 */
export default function Photo({
  src,
  alt,
  className,
  imgClassName,
  veil = true,
  children
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  /** The fade into the page. Off for images inside their own bordered card. */
  veil?: boolean;
  /** Anything sitting over the image — a caption, a floating card. */
  children?: React.ReactNode;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={cn('relative overflow-hidden bg-panel', className)}>
      {failed ? (
        <div
          className="h-full w-full"
          role="img"
          aria-label={alt}
          style={{background: 'var(--photo-fallback)'}}
        />
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className={cn('img-graded h-full w-full object-cover', imgClassName)}
        />
      )}

      {veil ? <div className="bg-photo-veil pointer-events-none absolute inset-0" /> : null}
      {children}
    </div>
  );
}
