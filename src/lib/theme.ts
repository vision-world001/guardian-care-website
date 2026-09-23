import {useEffect, useState} from 'react';

/**
 * Which room the site is lit in.
 *
 * Two values only, and the attribute they write is the same one the inline
 * script in index.html sets before first paint — so the page never flashes
 * navy on its way to white, or the reverse. The CSS does the rest: every
 * surface, rule, rim and shadow on the site resolves through a token, and the
 * day block in index.css is a list of values rather than a second stylesheet.
 *
 * `night` is the default on a first visit whatever the operating system
 * prefers. This is a deliberate departure from the usual advice. The dark
 * ground is the product's own surface — it is the colour of the mark, and the
 * dashboard this site is selling is dark — so handing a first-time visitor the
 * day theme because their laptop is set to light would show them a version of
 * the brand nobody chose for them. Once somebody picks, the choice sticks.
 */
export type Theme = 'night' | 'day';

export const THEME_KEY = 'gc-theme';

/** Read whatever the inline script already decided, so the two never disagree. */
function current(): Theme {
  if (typeof document === 'undefined') return 'night';
  return document.documentElement.dataset.theme === 'day' ? 'day' : 'night';
}

/**
 * The attribute is written on <html>, not on a wrapper.
 *
 * `body` gets its background from `--color-bg`, and a wrapper inside it would
 * leave the overscroll area — the strip a phone shows when you drag past the
 * end of a page — painted in the other theme.
 */
function apply(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* Private mode, or storage disabled. The theme still applies for this
       visit; it just will not be remembered, which is a fair trade for not
       throwing on a click. */
  }
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(current);

  /* No mount-time reconciliation is needed. The initialiser is the lazy form,
     so `current()` runs during the first render — which happens after the
     inline script in index.html has already written the attribute — and the
     two agree from the start. Re-reading it in an effect would only add a
     second render that changes nothing.

     Another tab switching theme switches this one too. Without it, two open
     windows disagree and the next navigation in either flips underneath the
     reader. */
  useEffect(() => {
    const sync = (event: StorageEvent) => {
      if (event.key !== THEME_KEY) return;
      const next: Theme = event.newValue === 'day' ? 'day' : 'night';
      document.documentElement.dataset.theme = next;
      setTheme(next);
    };

    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'day' ? 'night' : 'day';
    apply(next);
    setTheme(next);
  };

  return {theme, toggle};
}
