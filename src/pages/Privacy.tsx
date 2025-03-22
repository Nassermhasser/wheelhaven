
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-20">
        <div className="container max-w-3xl mx-auto px-6 md:px-10">
          <h1 className="text-3xl md:text-4xl font-semibold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="lead text-lg mb-6">
              At WheelHaven, we take your privacy seriously. This Privacy Policy describes how we collect, use, and handle your personal information when you use our services.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Information We Collect</h2>
            <p>
              We collect information to provide better services to our users. The types of personal information we collect include:
            </p>
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>Account information (name, email, phone number)</li>
              <li>Profile information (address, preferred payment methods)</li>
              <li>Driving license information</li>
              <li>Transaction details</li>
              <li>Device information</li>
              <li>Location data (with your permission)</li>
              <li>Usage data and preferences</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">How We Use Information</h2>
            <p>
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>Providing, maintaining, and improving our services</li>
              <li>Processing your transactions and sending rental confirmations</li>
              <li>Verifying your identity and eligibility to rent cars</li>
              <li>Communicating with you about your rentals, account, or customer support issues</li>
              <li>Sending promotional emails, special offers, or other marketing communications</li>
              <li>Preventing fraud and enhancing the security of our platform</li>
              <li>Complying with legal obligations</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Information Sharing</h2>
            <p>
              We don't share your personal information with companies, organizations, or individuals outside of WheelHaven except in the following cases:
            </p>
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>With your consent</li>
              <li>For external processing by our service providers</li>
              <li>For legal reasons</li>
              <li>In case of a merger, acquisition, or asset sale</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal data, including:
            </p>
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>Access to your personal data</li>
              <li>Correction of inaccurate or incomplete data</li>
              <li>Deletion of your personal data</li>
              <li>Restriction or objection to processing</li>
              <li>Data portability</li>
              <li>Withdrawal of consent</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
            
            <p className="mt-8 text-sm text-gray-600">Last Updated: March 22, 2025</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Privacy;
