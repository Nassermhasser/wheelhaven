
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, profile, signOut, isAdmin } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Define navigation links - conditionally include Admin link only for admin users
  const getNavLinks = () => {
    const links = [
      { name: 'Home', path: '/' },
      { name: 'Cars', path: '/cars' },
      { name: 'About', path: '/about' },
      { name: 'Contact', path: '/contact' },
    ];
    
    // Show Admin link if user is an admin
    console.log("Navbar - Checking admin status for link:", profile?.is_admin);
    if (profile?.is_admin === true) {
      links.push({ name: 'Admin', path: '/admin' });
    }
    
    return links;
  };

  const NavItems = () => {
    const navLinks = getNavLinks();
    return (
      <>
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              to={link.path}
              className={`text-base font-medium transition-colors hover:text-primary ${
                isActive(link.path) ? 'text-primary' : 'text-gray-700'
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </>
    );
  };
  
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-gray-900">
            CarRental
          </Link>
          
          {isMobile ? (
            <div className="flex items-center space-x-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <nav className="flex flex-col mt-12">
                    <ul className="space-y-4">
                      <NavItems />
                    </ul>
                    
                    <div className="mt-6 pt-6 border-t">
                      {user ? (
                        <div className="space-y-4">
                          <Button onClick={signOut} variant="outline" className="w-full">
                            Sign out
                          </Button>
                        </div>
                      ) : (
                        <Button asChild className="w-full">
                          <Link to="/auth?mode=login">
                            <User className="mr-2 h-4 w-4" />
                            Sign in
                          </Link>
                        </Button>
                      )}
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          ) : (
            <div className="flex items-center space-x-10">
              <nav>
                <ul className="flex space-x-8">
                  <NavItems />
                </ul>
              </nav>
              
              {user ? (
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="sm" onClick={signOut}>
                    Sign out
                  </Button>
                </div>
              ) : (
                <Button asChild size="sm">
                  <Link to="/auth?mode=login">
                    <User className="mr-2 h-4 w-4" />
                    Sign in
                  </Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
