
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Faqs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-20">
        <div className="container max-w-3xl mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-semibold mb-4">Frequently Asked Questions</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to the most common questions about our car rental service.
            </p>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left font-medium">What is the minimum age to rent a car?</AccordionTrigger>
              <AccordionContent>
                <p>The minimum age to rent a car is 21 years. However, drivers under 25 may be subject to a young driver surcharge and may be restricted from renting certain high-end or luxury vehicles.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left font-medium">Do I need insurance to rent a car?</AccordionTrigger>
              <AccordionContent>
                <p>Basic insurance is included in all our rental prices. However, we recommend purchasing additional coverage for complete peace of mind. You can add this during the booking process or at the rental counter when you pick up your car.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left font-medium">How do I pay for my rental?</AccordionTrigger>
              <AccordionContent>
                <p>We accept all major credit cards for payment. The credit card used for the reservation must be in the name of the main driver and presented at the time of pickup. We may place a hold on your card for a security deposit, which will be released upon return of the vehicle in good condition.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left font-medium">Can I cancel my reservation?</AccordionTrigger>
              <AccordionContent>
                <p>Yes, you can cancel your reservation. For most bookings, cancellations made at least 48 hours before the pickup time are free of charge. Later cancellations may incur a fee. Please refer to the specific terms and conditions provided during your booking process.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left font-medium">What documents do I need to rent a car?</AccordionTrigger>
              <AccordionContent>
                <p>You'll need a valid driver's license that you've held for at least one year, a credit card in your name for the security deposit, and a valid ID or passport. International customers may also need an International Driving Permit depending on the country of origin.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-6">
              <AccordionTrigger className="text-left font-medium">Is there a mileage limit?</AccordionTrigger>
              <AccordionContent>
                <p>Most of our rentals come with unlimited mileage within the country of rental. However, some special offers or long-term rentals may have mileage restrictions. Any mileage limitations will be clearly indicated during the booking process.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-7">
              <AccordionTrigger className="text-left font-medium">Can I take the rental car across borders?</AccordionTrigger>
              <AccordionContent>
                <p>Cross-border travel is allowed to certain countries with prior authorization. Additional fees and insurance may apply. Please contact our customer service at least 7 days before your trip to arrange the necessary permissions and documentation.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-8">
              <AccordionTrigger className="text-left font-medium">What happens if I return the car late?</AccordionTrigger>
              <AccordionContent>
                <p>We allow a 29-minute grace period for returns. After that, you may be charged for an additional day. If you know you're going to be late, please contact us as soon as possible to extend your rental (subject to availability) or to make alternative arrangements.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-9">
              <AccordionTrigger className="text-left font-medium">What is your fuel policy?</AccordionTrigger>
              <AccordionContent>
                <p>Our rentals follow a "full-to-full" fuel policy. This means you'll receive the car with a full tank and are expected to return it with a full tank. If the car is not returned with a full tank, you will be charged for the missing fuel plus a refueling service fee.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-10">
              <AccordionTrigger className="text-left font-medium">Do you offer one-way rentals?</AccordionTrigger>
              <AccordionContent>
                <p>Yes, one-way rentals are available between many of our locations. A one-way fee may apply, which varies depending on the pickup and drop-off locations. This fee will be displayed during the booking process if you select different locations.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Didn't find what you were looking for?</p>
            <a href="/contact" className="text-primary hover:underline font-medium">Contact our support team</a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Faqs;
