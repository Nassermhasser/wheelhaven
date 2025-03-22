
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Help = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-20">
        <div className="container max-w-4xl mx-auto px-6 md:px-10">
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-semibold mb-4">Help Center</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions and learn how to make the most of our car rental services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center hover:shadow-md transition-shadow">
              <h3 className="text-lg font-medium mb-2">Rental Process</h3>
              <p className="text-gray-600 text-sm mb-4">Learn about booking, pickup, and return procedures</p>
              <a href="#rental" className="text-primary hover:underline text-sm">View guides</a>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center hover:shadow-md transition-shadow">
              <h3 className="text-lg font-medium mb-2">Payment & Billing</h3>
              <p className="text-gray-600 text-sm mb-4">Information about payment methods and refund policies</p>
              <a href="#payment" className="text-primary hover:underline text-sm">View guides</a>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center hover:shadow-md transition-shadow">
              <h3 className="text-lg font-medium mb-2">Account Management</h3>
              <p className="text-gray-600 text-sm mb-4">Managing your profile and reservation history</p>
              <a href="#account" className="text-primary hover:underline text-sm">View guides</a>
            </div>
          </div>
          
          <section id="rental" className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 pb-2 border-b">Rental Process</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">How do I book a car?</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-4">Booking a car is simple:</p>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Browse our car selection and choose the one you like</li>
                    <li>Select your pickup and return dates and locations</li>
                    <li>Review the rental details and proceed to checkout</li>
                    <li>Complete payment to confirm your booking</li>
                    <li>You'll receive a confirmation email with all the details</li>
                  </ol>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">What documents do I need for pickup?</AccordionTrigger>
                <AccordionContent>
                  <p>When picking up your car, you'll need:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>A valid driver's license (held for at least 1 year)</li>
                    <li>The credit card used for the reservation</li>
                    <li>A valid ID or passport</li>
                    <li>Your booking confirmation</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">How do I extend my rental period?</AccordionTrigger>
                <AccordionContent>
                  <p>If you need to extend your rental period, please contact our customer service at least 24 hours before your scheduled return time. Extensions are subject to vehicle availability and may incur additional charges.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
          
          <section id="payment" className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 pb-2 border-b">Payment & Billing</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">What payment methods do you accept?</AccordionTrigger>
                <AccordionContent>
                  <p>We accept all major credit cards including Visa, Mastercard, American Express, and Discover. We also accept digital wallets such as Apple Pay and Google Pay in some locations.</p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">Do you require a deposit?</AccordionTrigger>
                <AccordionContent>
                  <p>Yes, we place a hold on your credit card as a security deposit when you pick up the car. The amount varies depending on the vehicle type and rental duration. This hold is released after you return the car in good condition.</p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">What is your cancellation policy?</AccordionTrigger>
                <AccordionContent>
                  <p>Our cancellation policy is as follows:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>Free cancellation up to 48 hours before pickup</li>
                    <li>50% refund for cancellations between 24-48 hours before pickup</li>
                    <li>No refund for cancellations less than 24 hours before pickup</li>
                    <li>No-shows will be charged the full rental amount</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
          
          <section id="account" className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 pb-2 border-b">Account Management</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">How do I create an account?</AccordionTrigger>
                <AccordionContent>
                  <p>Creating an account is easy. Click the "Sign In" button in the top-right corner of our website, then select "Create Account." Fill in your details, and you're ready to go.</p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">How can I view my rental history?</AccordionTrigger>
                <AccordionContent>
                  <p>Once logged in, go to your account dashboard and select "Rental History" to view all your past and upcoming rentals. You can also download receipts for completed rentals from this section.</p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">How do I update my payment information?</AccordionTrigger>
                <AccordionContent>
                  <p>To update your payment information, go to your account settings and select "Payment Methods." From there, you can add new cards, set a default payment method, or remove old cards.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
          
          <div className="text-center p-8 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Still need help?</h3>
            <p className="text-gray-600 mb-4">Our customer support team is ready to assist you.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors">Contact Us</a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Help;
