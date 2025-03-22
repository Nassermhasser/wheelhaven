
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faqs = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-20">
        <div className="container max-w-3xl mx-auto px-6 md:px-10">
          <h1 className="text-3xl md:text-4xl font-semibold mb-8">Frequently Asked Questions</h1>
          
          <p className="text-gray-600 mb-8">
            Find answers to the most common questions about our car rental service. If you can't find what you're looking for, please contact our customer support team.
          </p>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-medium">
                What documents do I need to rent a car?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                <p>To rent a car, you'll need:</p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li>A valid driver's license</li>
                  <li>A major credit card in the driver's name</li>
                  <li>Proof of insurance (in some locations)</li>
                  <li>A valid ID or passport (for international rentals)</li>
                </ul>
                <p className="mt-2">Additional documentation may be required for luxury or specialty vehicles.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-medium">
                What is your cancellation policy?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                <p>Our standard cancellation policy allows free cancellation up to 48 hours before your scheduled pick-up time. Cancellations made within 48 hours may be subject to a cancellation fee equivalent to one day's rental. No-shows will be charged the full rental amount.</p>
                <p className="mt-2">Prepaid reservations have different terms that are provided at the time of booking.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-medium">
                Can I modify my reservation?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                <p>Yes, you can modify your reservation through your account on our website or by contacting our customer service. Changes to pick-up/drop-off times, locations, or vehicle type are subject to availability and may result in price adjustments.</p>
                <p className="mt-2">We recommend making any changes as early as possible to ensure availability.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg font-medium">
                What is the minimum age to rent a car?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                <p>The standard minimum age to rent a car is 21 years. However, drivers under 25 may:</p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li>Be subject to a young driver surcharge</li>
                  <li>Have limitations on the types of vehicles they can rent</li>
                </ul>
                <p className="mt-2">Luxury, premium, and specialty vehicles often require the driver to be at least 25 years old.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-lg font-medium">
                Do you offer insurance options?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                <p>Yes, we offer several insurance options:</p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li>Collision Damage Waiver (CDW)</li>
                  <li>Loss Damage Waiver (LDW)</li>
                  <li>Supplemental Liability Insurance</li>
                  <li>Personal Accident Insurance</li>
                  <li>Personal Effects Coverage</li>
                </ul>
                <p className="mt-2">You can add these to your booking during the reservation process. Your personal auto insurance or credit card may also provide coverage for rental cars.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-6">
              <AccordionTrigger className="text-lg font-medium">
                What happens if I return the car late?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                <p>We provide a 30-minute grace period after your scheduled return time. Returns after this grace period may be charged at the hourly rate, up to a maximum of one additional day's rental fee.</p>
                <p className="mt-2">If you know you'll be late, please contact us as soon as possible to extend your rental and avoid additional fees.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-7">
              <AccordionTrigger className="text-lg font-medium">
                Do I need to refill the gas tank before returning the car?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                <p>Yes, our rentals come with a full tank of gas, and we expect the vehicle to be returned with a full tank. If the car is returned with less fuel than at pickup, you'll be charged for the missing fuel plus a refueling service fee.</p>
                <p className="mt-2">We also offer a pre-paid fuel option that allows you to return the car with any amount of gas without additional fees.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-8">
              <AccordionTrigger className="text-lg font-medium">
                Can I pick up the car in one location and return it to another?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                <p>Yes, one-way rentals are available between many of our locations. There may be an additional one-way fee depending on the distance between locations and the type of vehicle.</p>
                <p className="mt-2">One-way rentals should be arranged in advance during the booking process to ensure availability.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Faqs;
