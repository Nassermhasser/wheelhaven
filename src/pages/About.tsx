
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';

const About = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for smooth transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-20">
        <div className="container max-w-7xl mx-auto px-6 md:px-10">
          {isLoading ? (
            <div className="space-y-6">
              <div className="h-10 bg-gray-200 rounded animate-pulse w-1/3"></div>
              <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-10">
                <h1 className="text-3xl md:text-4xl font-semibold mb-4">About WheelHaven</h1>
                <p className="text-gray-600 max-w-3xl">
                  Your premium car rental service providing luxury and comfort for every journey.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
                <div>
                  <h2 className="text-2xl font-medium mb-4">Our Story</h2>
                  <p className="text-gray-600 mb-4">
                    Founded in 2018, WheelHaven began with a simple mission: to provide exceptional car rental experiences that go beyond just transportation. We believe that the journey matters as much as the destination.
                  </p>
                  <p className="text-gray-600 mb-4">
                    Our founder, Alex Wheeler, noticed a gap in the market for premium car rentals that offered both luxury vehicles and personalized service. Drawing from his experience in the automotive industry, he assembled a team of car enthusiasts and customer service experts to create WheelHaven.
                  </p>
                  <p className="text-gray-600">
                    Today, we're proud to serve thousands of customers each year, helping them create memorable experiences on the road with our fleet of meticulously maintained vehicles.
                  </p>
                </div>
                <div className="rounded-lg overflow-hidden h-80 md:h-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" 
                    alt="Car showroom" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <Separator className="my-12" />

              <div className="mb-16">
                <h2 className="text-2xl font-medium mb-6 text-center">Our Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      title: "Excellence",
                      description: "We strive for excellence in every aspect of our service, from vehicle maintenance to customer interactions."
                    },
                    {
                      title: "Reliability",
                      description: "Our customers count on us to provide dependable vehicles and consistent service every time."
                    },
                    {
                      title: "Transparency",
                      description: "We believe in clear communication and no hidden fees, ensuring a trustworthy relationship with our customers."
                    }
                  ].map((value, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-xl font-medium mb-3">{value.title}</h3>
                      <p className="text-gray-600">{value.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-16">
                <h2 className="text-2xl font-medium mb-6">Our Team</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    {
                      name: "Alex Wheeler",
                      position: "Founder & CEO",
                      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                    },
                    {
                      name: "Sarah Johnson",
                      position: "Operations Director",
                      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80"
                    },
                    {
                      name: "Michael Chen",
                      position: "Fleet Manager",
                      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      name: "Emma Rodriguez",
                      position: "Customer Relations",
                      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80"
                    }
                  ].map((member, index) => (
                    <div key={index} className="text-center">
                      <div className="mb-4 rounded-full overflow-hidden h-32 w-32 mx-auto">
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-medium">{member.name}</h3>
                      <p className="text-gray-600 text-sm">{member.position}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
