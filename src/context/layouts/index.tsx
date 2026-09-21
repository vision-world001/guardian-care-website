import {useEffect} from 'react';
import {Outlet, useLocation} from 'react-router';
import Header from './header';
import Footer from './footer';
import ScrollTop from '../../components/ScrollTop';

/**
 * Chrome shared by every route.
 *
 * There is no theme class to toggle any more. Every route runs on the one
 * surface — the mark's navy, with its green and gold on top — so a route that
 * does nothing is already correct.
 *
 * That removed a whole class of bug rather than just some code. While there
 * were competing themes, <html> had to be re-classed on every navigation
 * before paint or a differently lit route showed one frame of the wrong
 * ground, and the footer and the wave sign each had to ask the router which
 * way round they were before they could draw.
 *
 * Cross-page anchors (the footer links into `/business#join`, for example)
 * land here with a hash the router does not scroll to on its own, so it is
 * handled once for every child route.
 */
export default function Layout() {
  const {pathname, hash} = useLocation();

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
