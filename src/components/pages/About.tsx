import { useEffect } from 'react';
import { TrendingUp, Users, GanttChart, Globe } from 'lucide-react';

const About = () => {
  // Change page title on component mount
  useEffect(() => {
    document.title = 'About - LoadMatch';
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="bg-blue-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">About LoadMatch</h1>
          <p className="text-xl max-w-3xl mx-auto">
            We're revolutionizing the logistics industry by connecting loaders and receivers 
            through our intelligent matching platform.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2023, LoadMatch emerged from the recognition that the logistics 
                industry needed a more efficient way to connect load owners with transportation providers.
              </p>
              <p className="text-gray-600 mb-4">
                Our team of logistics experts and software engineers came together to build a platform 
                that uses advanced algorithms to match loads with the right carriers based on multiple factors 
                including capacity, location, pricing, and reliability.
              </p>
              <p className="text-gray-600">
                Today, LoadMatch serves thousands of businesses across the country, helping them optimize 
                their supply chains and reduce transportation costs while ensuring reliable delivery.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="https://images.pexels.com/photos/1427538/pexels-photo-1427538.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Logistics team meeting" 
                className="max-w-full h-auto rounded-lg shadow-lg"
                style={{ maxHeight: '400px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Our Mission</h2>
          <p className="text-xl max-w-3xl mx-auto mb-12 text-gray-600">
            To create the most efficient logistics ecosystem by connecting loaders and receivers 
            through technology, transparency, and trust.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
              <div className="bg-blue-600 text-white p-3 rounded-full mb-4">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Efficiency</h3>
              <p className="text-gray-600 text-center">
                Optimize logistics operations through intelligent matching and route planning.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
              <div className="bg-blue-600 text-white p-3 rounded-full mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
              <p className="text-gray-600 text-center">
                Foster partnerships between loaders and receivers for mutual benefit.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
              <div className="bg-blue-600 text-white p-3 rounded-full mb-4">
                <GanttChart size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Transparency</h3>
              <p className="text-gray-600 text-center">
                Provide clear visibility into the logistics process from start to finish.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
              <div className="bg-blue-600 text-white p-3 rounded-full mb-4">
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
              <p className="text-gray-600 text-center">
                Reduce empty miles and optimize routes to minimize environmental impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Leadership Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="h-48 bg-gray-200">
                <img 
                  src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="CEO" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Michael Johnson</h3>
                <p className="text-blue-600 mb-3">CEO & Co-Founder</p>
                <p className="text-gray-600">
                  With 15+ years in logistics and supply chain management, Michael leads our vision for a more connected transportation ecosystem.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="h-48 bg-gray-200">
                <img 
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="CTO" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Sarah Williams</h3>
                <p className="text-blue-600 mb-3">CTO & Co-Founder</p>
                <p className="text-gray-600">
                  Sarah brings expertise in software development and AI to create our advanced matching algorithms and platform architecture.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="h-48 bg-gray-200">
                <img 
                  src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="COO" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">David Chen</h3>
                <p className="text-blue-600 mb-3">COO</p>
                <p className="text-gray-600">
                  David oversees day-to-day operations and strategic partnerships, ensuring LoadMatch delivers exceptional service to all users.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;