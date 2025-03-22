import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import Index from '@/pages/Index';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Cars from '@/pages/Cars';
import CarDetail from '@/pages/CarDetail';
import Auth from '@/pages/Auth';
import Admin from '@/pages/Admin';
import NotFound from '@/pages/NotFound';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Cookies from './pages/Cookies';
import Help from './pages/Help';
import Faqs from './pages/Faqs';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/cars/:id" element={<CarDetail />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/help" element={<Help />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="top-center" richColors />
    </>
  );
}

export default App;
