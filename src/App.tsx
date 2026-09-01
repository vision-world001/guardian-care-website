import {BrowserRouter, Navigate, Route, Routes} from 'react-router';
import Layout from './context/layouts';
import Business from './pages/Business/Business';
import Consumer from './pages/Consumer/Consumer';
import Entry from './pages/Entry/Entry';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* The splitter stands alone — no nav, no footer. */}
        <Route path="/" element={<Entry />} />

        <Route element={<Layout />}>
          <Route path="/business" element={<Business />} />
          <Route path="/consumers" element={<Consumer />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
