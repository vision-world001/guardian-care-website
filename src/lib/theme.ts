import {useCallback, useSyncExternalStore} from 'react';

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

/* ---------- One value, however many components read it ---------- */

/**
 * The theme is shared state, and it used to be four copies of it.
 *
 * `useTheme` held a `useState` of its own, and four components call it — the
 * header, the lockup inside it, the toggle, and the sign-off wave. Each got its
 * own copy seeded from the DOM at first render, which agreed with the others
 * exactly until somebody pressed the switch. Then `toggle` wrote the attribute
 * and updated *its* copy, the stylesheet repainted the whole page, and the
 * other three went on believing the theme they were born in, with no render
 * scheduled to tell them otherwise.
 *
 * On the day theme that had a visible cost rather than a theoretical one. The
 * header decides whether to carry a background from `theme`, so a stale value
 * left it transparent — white type and a near-white mark, sitting on a page
 * that had just turned cream. The logo disappeared, which is how the bug was
 * found.
 *
 * So there is one snapshot and a set of subscribers, read through
 * `useSyncExternalStore`. That hook exists for precisely this shape: a value
 * that lives outside React — here, an attribute on <html> — which any number of
 * components need to stay in step with. Adding a context provider would work
 * too and would mean wrapping the tree to share a two-character string.
 *
 * The listener is attached while somebody is subscribed and not before, so
 * importing this module still costs nothing.
 */
const listeners = new Set<() => void>();

let snapshot: Theme = current();

function notify(next: Theme) {
  if (snapshot === next) return;
  snapshot = next;
  for (const listener of listeners) listener();
}

/** Another tab switched theme. Without this, two windows disagree. */
function onStorage(event: StorageEvent) {
  if (event.key !== THEME_KEY) return;
  const next: Theme = event.newValue === 'day' ? 'day' : 'night';
  document.documentElement.dataset.theme = next;
  notify(next);
}

function subscribe(listener: () => void) {
  if (listeners.size === 0 && typeof window !== 'undefined') {
    window.addEventListener('storage', onStorage);
  }
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && typeof window !== 'undefined') {
      window.removeEventListener('storage', onStorage);
    }
  };
}

/** A string, so React can compare snapshots by identity without a cache. */
function read(): Theme {
  return snapshot;
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, read, serverRead);

  const toggle = useCallback(() => {
    const next: Theme = snapshot === 'day' ? 'night' : 'day';
    apply(next);
    notify(next);
  }, []);

  return {theme, toggle};
}

/** Nothing renders this on a server, but the hook requires the third argument. */
function serverRead(): Theme {
  return 'night';
}
