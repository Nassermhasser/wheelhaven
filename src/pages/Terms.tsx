
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { CalendarClock } from 'lucide-react';
import { Helmet } from 'react-helmet';

const Terms = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Terms of Service | WheelHaven - Premium Car Rental Service</title>
        <meta name="description" content="Review WheelHaven's terms of service. Learn about our policies, user obligations, and legal agreements for using our car rental services." />
        <meta name="keywords" content="car rental terms, WheelHaven legal, rental terms and conditions, car hire agreement" />
        <link rel="canonical" href="https://wheelhaven.com/terms" />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow pt-28 pb-20">
        <div className="container max-w-4xl mx-auto px-6 md:px-10">
          <div className="mb-10">
            <Badge variant="outline" className="mb-4">Legal</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Please read these terms carefully before using our services.
            </p>
            
            <div className="flex items-center text-sm text-gray-500 mt-6">
              <CalendarClock className="h-4 w-4 mr-2" />
              Last updated: March 22, 2023
            </div>
          </div>
          
          <div className="prose prose-slate max-w-none">
            <div className="bg-gray-50 p-6 rounded-xl mb-10">
              <p className="text-gray-600 italic">
                By accessing or using WheelHaven's services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services.
              </p>
            </div>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Terms</h2>
            <p>
              By accessing this website, you are agreeing to be bound by these website Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
            </p>
            
            <Separator className="my-8" />
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) on WheelHaven's website for personal, non-commercial transitory viewing only.
            </p>
            <p>This is the grant of a license, not a transfer of title, and under this license you may not:</p>
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on WheelHaven's website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
            
            <Separator className="my-8" />
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Disclaimer</h2>
            <p>
              The materials on WheelHaven's website are provided "as is". WheelHaven makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            <p>
              Further, WheelHaven does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
            </p>
            
            <Separator className="my-8" />
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Limitations</h2>
            <p>
              In no event shall WheelHaven or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on WheelHaven's website, even if WheelHaven or a WheelHaven authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
            
            <Separator className="my-8" />
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Revisions and Errata</h2>
            <p>
              The materials appearing on WheelHaven's website could include technical, typographical, or photographic errors. WheelHaven does not warrant that any of the materials on its website are accurate, complete, or current. WheelHaven may make changes to the materials contained on its website at any time without notice.
            </p>
            
            <Separator className="my-8" />
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Links</h2>
            <p>
              WheelHaven has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by WheelHaven of the site. Use of any such linked website is at the user's own risk.
            </p>
            
            <Separator className="my-8" />
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Site Terms of Use Modifications</h2>
            <p>
              WheelHaven may revise these terms of use for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these Terms and Conditions of Use.
            </p>
            
            <Separator className="my-8" />
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Governing Law</h2>
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
