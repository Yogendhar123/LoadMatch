import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Truck, Package, BarChart4, ShieldCheck } from 'lucide-react';

const Home = () => {
  // Change page title on component mount
  useEffect(() => {
    document.title = 'LoadMatch - Connecting Loaders and Receivers';
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-600 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 animate-fade-in">
                Efficient Load Matching for Modern Logistics
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Connect with the right partners for your logistics needs through our intelligent scoring system.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link 
                  to="/register" 
                  className="bg-white text-blue-700 px-6 py-3 rounded-md font-medium text-center hover:bg-blue-50 transition-colors shadow-md"
                >
                  Get Started
                </Link>
                <Link 
                  to="/about" 
                  className="border border-white text-white px-6 py-3 rounded-md font-medium text-center hover:bg-white hover:text-blue-700 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Logistics illustration" 
                className="max-w-full h-auto rounded-lg shadow-lg"
                style={{ maxHeight: '400px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How LoadMatch Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <div className="bg-blue-600 text-white p-3 rounded-full mb-4">
                <Package size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Post Your Loads</h3>
              <p className="text-gray-600">Easily post details about your shipment needs including weight, dimensions, and deadlines.</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <div className="bg-blue-600 text-white p-3 rounded-full mb-4">
                <BarChart4 size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Matching</h3>
              <p className="text-gray-600">Our algorithm scores and matches loads with the most suitable receivers based on multiple factors.</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <div className="bg-blue-600 text-white p-3 rounded-full mb-4">
                <Truck size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Efficient Transport</h3>
              <p className="text-gray-600">Receivers can access loads that match their capabilities and requirements.</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <div className="bg-blue-600 text-white p-3 rounded-full mb-4">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
              <p className="text-gray-600">End-to-end secure transactions and communications for peace of mind.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Streamline Your Logistics?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of companies optimizing their logistics operations with LoadMatch.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/register" 
              className="bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors shadow-md"
            >
              Register Now
            </Link>
            <Link 
              to="/contact" 
              className="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                  JD
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">John Doe</h4>
                  <p className="text-gray-500 text-sm">Logistics Manager</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "LoadMatch has revolutionized how we find carriers for our shipments. The scoring system ensures we always get reliable partners."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                  JS
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Jane Smith</h4>
                  <p className="text-gray-500 text-sm">Transport Company Owner</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "As a receiver, the dashboard provides all the information I need to make quick decisions on which loads to accept."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                  RB
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Robert Brown</h4>
                  <p className="text-gray-500 text-sm">Supply Chain Director</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The analytics provided by LoadMatch have helped us optimize our shipping strategies and reduce costs by 23%."
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;