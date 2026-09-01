import {useEffect, useLayoutEffect} from 'react';
import {Outlet, useLocation} from 'react-router';
import Header from './header';
import Footer from './footer';
import ScrollTop from '../../components/ScrollTop';

/** Routes that run on the day theme rather than the site's default dark one. */
const DAY_ROUTES = new Set(['/consumers']);

/**
 * Chrome shared by the two journey pages. Cross-page anchors (the footer links
 * into `/business#b-command`, for example) land here with a hash the router
 * does not scroll to on its own, so it is handled once for every child route.
 *
 * The theme is toggled on <html> rather than on a wrapper, for two reasons:
 * `body` takes its background from `--color-bg`, so a wrapper would leave the
 * dark ground showing through overscroll and behind the sticky header; and the
 * header and footer belong to the page they frame — a dark bar over a daylight
 * page reads as a rendering fault, not as a design.
 */
export default function Layout() {
  const {pathname, hash} = useLocation();

  /* Before paint, not after: an effect here would show one frame of the wrong
     theme on every navigation into or out of the consumer journey. */
  useLayoutEffect(() => {
    const day = DAY_ROUTES.has(pathname);
    document.documentElement.classList.toggle('theme-day', day);
    return () => document.documentElement.classList.remove('theme-day');
  }, [pathname]);

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    document.querySelector(hash)?.scrollIntoView({behavior: 'smooth'});
  }, [pathname, hash]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      {/* Outside the outlet, so it picks up whichever theme the route put on
          <html> and survives navigation between the two journeys. */}
      <ScrollTop />
    </>
  );
}
