
import { Link } from 'react-router-dom';
import { Car, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8">
      <div className="container max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Car className="h-6 w-6" />
              <span className="text-xl font-semibold tracking-tight">WheelHaven</span>
            </div>
            <p className="text-gray-600 mb-6 text-sm">
              Premium car rental service with a wide selection of vehicles for your travel needs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-gray-800 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-800 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-800 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-800 transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider mb-6">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-600 hover:text-gray-900 text-sm">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-600 hover:text-gray-900 text-sm">Careers</Link></li>
              <li><Link to="/blog" className="text-gray-600 hover:text-gray-900 text-sm">Blog</Link></li>
              <li><Link to="/press" className="text-gray-600 hover:text-gray-900 text-sm">Press</Link></li>
              <li><Link to="/partners" className="text-gray-600 hover:text-gray-900 text-sm">Partners</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider mb-6">Support</h3>
            <ul className="space-y-3">
              <li><Link to="/help" className="text-gray-600 hover:text-gray-900 text-sm">Help Center</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-gray-900 text-sm">Contact Us</Link></li>
              <li><Link to="/faqs" className="text-gray-600 hover:text-gray-900 text-sm">FAQs</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-gray-900 text-sm">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-gray-900 text-sm">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider mb-6">Newsletter</h3>
            <p className="text-gray-600 mb-4 text-sm">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <div className="space-y-3">
              <Input placeholder="Your email address" className="bg-white" />
              <Button className="w-full">Subscribe</Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} WheelHaven. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/terms" className="text-gray-500 hover:text-gray-700 text-sm">Terms</Link>
            <Link to="/privacy" className="text-gray-500 hover:text-gray-700 text-sm">Privacy</Link>
            <Link to="/cookies" className="text-gray-500 hover:text-gray-700 text-sm">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
