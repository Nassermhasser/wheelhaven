
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Help = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-20">
        <div className="container max-w-3xl mx-auto px-6 md:px-10">
          <h1 className="text-3xl md:text-4xl font-semibold mb-8">Help Center</h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="lead text-lg mb-6">
              Welcome to the WheelHaven Help Center. Here you'll find information to help you make the most of our car rental service.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Getting Started</h2>
            <p>
              New to WheelHaven? Here's how to get started:
            </p>
            <ol className="list-decimal pl-6 my-4 space-y-2">
              <li>Create an account or sign in</li>
              <li>Browse our car collection</li>
              <li>Select pick-up and drop-off dates</li>
              <li>Complete the booking process</li>
              <li>Present your license and payment method at pick-up</li>
            </ol>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Booking Information</h2>
            <p>
              Learn about our booking policies:
            </p>
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>Reservations can be made up to 24 hours before pick-up</li>
              <li>A valid driver's license and credit card are required</li>
              <li>Drivers must be at least 21 years old (25 for premium vehicles)</li>
              <li>Insurance options are available at checkout</li>
              <li>Modifications and cancellations can be made through your account</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Payment Options</h2>
            <p>
              We accept various payment methods:
            </p>
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>Major credit cards (Visa, Mastercard, American Express)</li>
              <li>Debit cards (with credit card logo)</li>
              <li>Digital wallets (Apple Pay, Google Pay)</li>
              <li>Corporate accounts for business customers</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Vehicle Pick-up and Return</h2>
            <p>
              Important information for your rental experience:
            </p>
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>Please arrive at the pick-up location on time</li>
              <li>Bring your driver's license, booking confirmation, and payment card</li>
              <li>Vehicles should be returned with the same fuel level as at pick-up</li>
              <li>Late returns may incur additional charges</li>
              <li>24-hour drop-off is available at most locations</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Contact Support</h2>
            <p>
              Need additional help? Our support team is available:
            </p>
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>Phone: +1 (800) 555-1234</li>
              <li>Email: support@wheelhaven.com</li>
              <li>Live chat: Available 24/7 through our website</li>
              <li>In-person: Visit any of our rental locations during business hours</li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Help;
