
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, ArrowDown } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = heroRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach(el => observer.observe(el));
    
    return () => {
      elements?.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Luxury car"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="container max-w-7xl mx-auto px-6 md:px-10 relative z-10 py-24 md:py-32">
        <div className="max-w-3xl">
          <span className="text-white/80 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-[200ms] inline-block mb-4 text-sm md:text-base font-medium tracking-wide">
            Premium Car Rental Service
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-[400ms]">
            Drive Your Dreams, <br/>One Journey at a Time
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-10 max-w-xl animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-[600ms]">
            Experience the thrill of driving premium vehicles with our seamless booking process and exceptional service.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-[800ms]">
            <Link to="/cars">
              <Button size="lg" className="text-sm md:text-base px-8 py-6">
                Explore Cars
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button 
                variant="outline" 
                size="lg" 
                className="text-sm md:text-base px-8 py-6 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              >
                How It Works
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-pulse-soft">
        <button 
          className="flex flex-col items-center text-white/80 hover:text-white transition-colors"
          onClick={() => window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
          })}
        >
          <span className="text-sm mb-2">Scroll Down</span>
          <ArrowDown className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Hero;
