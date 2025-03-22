
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Terms = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-20">
        <div className="container max-w-3xl mx-auto px-6 md:px-10">
          <h1 className="text-3xl md:text-4xl font-semibold mb-8">Terms of Service</h1>
          
          <div className="prose prose-slate max-w-none">
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Terms</h2>
            <p>
              By accessing this website, you are agreeing to be bound by these website Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) on WheelHaven's website for personal, non-commercial transitory viewing only.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">3. Disclaimer</h2>
            <p>
              The materials on WheelHaven's website are provided "as is". WheelHaven makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">4. Limitations</h2>
            <p>
              In no event shall WheelHaven or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on WheelHaven's website, even if WheelHaven or a WheelHaven authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">5. Revisions and Errata</h2>
            <p>
              The materials appearing on WheelHaven's website could include technical, typographical, or photographic errors. WheelHaven does not warrant that any of the materials on its website are accurate, complete, or current. WheelHaven may make changes to the materials contained on its website at any time without notice.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">6. Links</h2>
            <p>
              WheelHaven has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by WheelHaven of the site. Use of any such linked website is at the user's own risk.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">7. Site Terms of Use Modifications</h2>
            <p>
              WheelHaven may revise these terms of use for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these Terms and Conditions of Use.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">8. Governing Law</h2>
            <p>
              Any claim relating to WheelHaven's website shall be governed by the laws of the country without regard to its conflict of law provisions.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
