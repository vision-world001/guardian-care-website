import {useEffect, useLayoutEffect} from 'react';
import {Outlet, useLocation} from 'react-router';
import Header from './header';
import Footer from './footer';
import WaveSign from './WaveSign';
import ScrollTop from '../../components/ScrollTop';

/**
 * Routes that run on the day theme rather than the site's default dark one.
 *
 * The split is by audience, not by page. Both consumer journeys are about a
 * house at midday and are read once a month by somebody standing in it; the
 * business console is read all day by an operator in a room full of screens.
 */
export const DAY_ROUTES = new Set(['/existing', '/plan']);

/**
 * And the route that runs on the platform's own surface.
 *
 * The home page is not telling a journey, it is the product introducing itself
 * — so it gets charcoal rather than blue-black, warm white rather than white,
 * amber rather than the green-to-blue ramp, and near-square corners. See the
 * `.theme-command` block in `index.css` for why each of those is a decision
 * rather than a preference.
 */
const COMMAND_ROUTES = new Set(['/']);

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
     theme on every navigation between two differently lit routes. */
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('theme-day', DAY_ROUTES.has(pathname));
    root.classList.toggle('theme-command', COMMAND_ROUTES.has(pathname));

    return () => root.classList.remove('theme-day', 'theme-command');
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
      {/* <WaveSign /> */}
      <Footer />
      {/* Outside the outlet, so it picks up whichever theme the route put on
          <html> and survives navigation between the two journeys. */}
      <ScrollTop />
    </>
  );
}
