import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Donate from './pages/Donate';
import Success from './pages/Success';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
}
