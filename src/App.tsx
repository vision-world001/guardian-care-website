import {BrowserRouter, Navigate, Route, Routes} from 'react-router';
import Layout from './context/layouts';
import Business from './pages/Business/Business';
import Consumer from './pages/Consumer/Consumer';
import Home from './pages/Home/Home';
import Plan from './pages/Plan/Plan';
import Start from './pages/Start/Start';

/**
 * Three journeys and the door they open from.
 *
 * The home page shares the chrome now rather than standing alone: it is no
 * longer only a splitter, and a page that explains the platform without a way
 * back into it is a dead end.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/consumer" element={<Consumer />} />
          {/* The journey's old address, kept so earlier links still land. */}
          <Route path="/existing" element={<Navigate to="/consumer" replace />} />
          <Route path="/plan" element={<Plan />} />
          <Route path="/business" element={<Business />} />

          {/* The way in, from anywhere. The header's button points here on
              every route, so it is a page rather than a section — a visitor
              who clicks "get started" on the home page should not land in the
              middle of the business page to find the form. */}
          <Route path="/start" element={<Start />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
