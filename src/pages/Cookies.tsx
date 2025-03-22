
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Cookies = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-20">
        <div className="container max-w-3xl mx-auto px-6 md:px-10">
          <h1 className="text-3xl md:text-4xl font-semibold mb-8">Cookie Policy</h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="lead text-lg mb-6">
              This Cookie Policy explains how WheelHaven uses cookies and similar technologies to recognize you when you visit our website.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">What are cookies?</h2>
            <p>
              Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">How we use cookies</h2>
            <p>
              We use cookies for the following purposes:
            </p>
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>
                <strong>Essential cookies:</strong> These cookies are required for the operation of our website. They include, for example, cookies that enable you to log into secure areas of our website or use a shopping cart.
              </li>
              <li>
                <strong>Analytical/performance cookies:</strong> These allow us to recognize and count the number of visitors and to see how visitors move around our website when they are using it. This helps us to improve the way our website works, for example, by ensuring that users are finding what they are looking for easily.
              </li>
              <li>
                <strong>Functionality cookies:</strong> These are used to recognize you when you return to our website. This enables us to personalize our content for you, greet you by name and remember your preferences.
              </li>
              <li>
                <strong>Targeting cookies:</strong> These cookies record your visit to our website, the pages you have visited and the links you have followed. We will use this information to make our website and the advertising displayed on it more relevant to your interests.
              </li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Third-party cookies</h2>
            <p>
              In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the website, deliver advertisements on and through the website, and so on.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">How to control cookies</h2>
            <p>
              You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. If you do this, however, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">More information</h2>
            <p>
              For more information about cookies and how to disable them, you can consult the information at <a href="https://www.allaboutcookies.org" className="text-primary hover:underline">www.allaboutcookies.org</a>.
            </p>
            
            <p className="mt-8 text-sm text-gray-600">Last Updated: March 22, 2025</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cookies;
