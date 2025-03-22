
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Phone, Mail, MessageSquare, MapPin, Clock, HelpCircle } from 'lucide-react';
import { Helmet } from 'react-helmet';

const Help = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Help Center | WheelHaven - Premium Car Rental Service</title>
        <meta name="description" content="Find answers to your questions about WheelHaven's car rental services, booking processes, payment options, and more in our comprehensive help center." />
        <meta name="keywords" content="car rental help, WheelHaven support, car booking help, rental vehicle assistance" />
        <link rel="canonical" href="https://wheelhaven.com/help" />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow pt-28 pb-20">
        <div className="container max-w-4xl mx-auto px-6 md:px-10">
          <div className="mb-10">
            <Badge variant="outline" className="mb-4">Support</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Help Center</h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Find answers to your questions about our car rental service and learn how to make the most of your WheelHaven experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="card-modern p-6">
              <HelpCircle className="h-10 w-10 text-primary mb-4" />
              <h2 className="text-xl font-semibold mb-2">Need Immediate Help?</h2>
              <p className="text-gray-600 mb-4">Our support team is available 24/7 to assist you with any questions or concerns.</p>
              <div className="flex items-center mt-4">
                <Phone className="h-5 w-5 text-primary mr-2" />
                <span className="text-gray-800">+1 (800) 555-1234</span>
              </div>
            </div>
            
            <div className="card-modern p-6">
              <Clock className="h-10 w-10 text-primary mb-4" />
              <h2 className="text-xl font-semibold mb-2">Business Hours</h2>
              <p className="text-gray-600 mb-4">Our rental locations are open at the following times:</p>
              <div className="text-sm">
                <div className="flex justify-between mb-1">
                  <span>Monday - Friday</span>
                  <span className="font-medium">8:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Saturday</span>
                  <span className="font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-medium">10:00 AM - 4:00 PM</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="prose prose-slate max-w-none">
            <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
              <span className="bg-primary/10 text-primary w-8 h-8 inline-flex items-center justify-center rounded-full mr-3 text-sm">1</span>
              Getting Started
            </h2>
            <p className="text-gray-700">
              New to WheelHaven? Here's how to get started:
            </p>
            <ol className="list-decimal pl-6 my-4 space-y-2">
              <li className="pl-2">Create an account or sign in</li>
              <li className="pl-2">Browse our car collection</li>
              <li className="pl-2">Select pick-up and drop-off dates</li>
              <li className="pl-2">Complete the booking process</li>
              <li className="pl-2">Present your license and payment method at pick-up</li>
            </ol>
            
            <Separator className="my-8" />
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
              <span className="bg-primary/10 text-primary w-8 h-8 inline-flex items-center justify-center rounded-full mr-3 text-sm">2</span>
              Booking Information
            </h2>
            <p className="text-gray-700">
              Learn about our booking policies:
            </p>
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li className="pl-2">Reservations can be made up to 24 hours before pick-up</li>
              <li className="pl-2">A valid driver's license and credit card are required</li>
              <li className="pl-2">Drivers must be at least 21 years old (25 for premium vehicles)</li>
              <li className="pl-2">Insurance options are available at checkout</li>
              <li className="pl-2">Modifications and cancellations can be made through your account</li>
            </ul>
            
            <Separator className="my-8" />
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
              <span className="bg-primary/10 text-primary w-8 h-8 inline-flex items-center justify-center rounded-full mr-3 text-sm">3</span>
              Payment Options
            </h2>
            <p className="text-gray-700">
              We accept various payment methods:
            </p>
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li className="pl-2">Major credit cards (Visa, Mastercard, American Express)</li>
              <li className="pl-2">Debit cards (with credit card logo)</li>
              <li className="pl-2">Digital wallets (Apple Pay, Google Pay)</li>
              <li className="pl-2">Corporate accounts for business customers</li>
            </ul>
            
            <Separator className="my-8" />
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
              <span className="bg-primary/10 text-primary w-8 h-8 inline-flex items-center justify-center rounded-full mr-3 text-sm">4</span>
              Vehicle Pick-up and Return
            </h2>
            <p className="text-gray-700">
              Important information for your rental experience:
            </p>
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li className="pl-2">Please arrive at the pick-up location on time</li>
              <li className="pl-2">Bring your driver's license, booking confirmation, and payment card</li>
              <li className="pl-2">Vehicles should be returned with the same fuel level as at pick-up</li>
              <li className="pl-2">Late returns may incur additional charges</li>
              <li className="pl-2">24-hour drop-off is available at most locations</li>
            </ul>
          </div>
          
          <div className="mt-12 bg-gray-50 rounded-xl p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-6">Contact Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-primary mt-1 mr-3" />
                <div>
                  <h3 className="font-medium mb-1">Phone</h3>
                  <p className="text-gray-700">+1 (800) 555-1234</p>
                  <p className="text-sm text-gray-500 mt-1">Available 24/7</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-primary mt-1 mr-3" />
                <div>
                  <h3 className="font-medium mb-1">Email</h3>
                  <p className="text-gray-700">support@wheelhaven.com</p>
                  <p className="text-sm text-gray-500 mt-1">Responses within 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MessageSquare className="h-5 w-5 text-primary mt-1 mr-3" />
                <div>
                  <h3 className="font-medium mb-1">Live Chat</h3>
                  <p className="text-gray-700">Available 24/7 through our website</p>
                  <p className="text-sm text-gray-500 mt-1">Average response time: 2 minutes</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mt-1 mr-3" />
                <div>
                  <h3 className="font-medium mb-1">In-Person</h3>
                  <p className="text-gray-700">Visit any of our rental locations</p>
                  <p className="text-sm text-gray-500 mt-1">During business hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Help;
