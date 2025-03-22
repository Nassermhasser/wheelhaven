
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Helmet } from 'react-helmet';
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
      <Helmet>
        <meta charSet="utf-8" />
        <title>WheelHaven - Premium Car Rental Service</title>
        <meta name="description" content="WheelHaven offers premium car rentals with a wide selection of vehicles. Find the perfect car for your needs, from luxury sedans to SUVs and economy options." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="WheelHaven - Premium Car Rental Service" />
        <meta property="og:description" content="Find and rent the perfect car for your journey with WheelHaven's premium car rental service." />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://wheelhaven.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="WheelHaven - Premium Car Rental Service" />
        <meta name="twitter:description" content="Find and rent the perfect car for your journey with WheelHaven's premium car rental service." />
        <meta name="twitter:image" content="/og-image.png" />
        <link rel="canonical" href="https://wheelhaven.com" />
      </Helmet>
      
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
