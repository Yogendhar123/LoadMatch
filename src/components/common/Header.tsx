import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Truck, Package, Menu, X, User } from 'lucide-react';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const goToDashboard = () => {
    if (user?.userType === 'loader') {
      navigate('/dashboard/loader');
    } else {
      navigate('/dashboard/receiver');
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            {user?.userType === 'loader' ? (
              <Package className="h-8 w-8" />
            ) : (
              <Truck className="h-8 w-8" />
            )}
            <span className="font-bold text-xl">LoadMatch</span>
          </Link>

          {/* Desktop menu */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`hover:text-blue-200 transition-colors ${
                location.pathname === '/' ? 'font-medium' : ''
              }`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`hover:text-blue-200 transition-colors ${
                location.pathname === '/about' ? 'font-medium' : ''
              }`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`hover:text-blue-200 transition-colors ${
                location.pathname === '/contact' ? 'font-medium' : ''
              }`}
            >
              Contact
            </Link>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <button 
                  onClick={goToDashboard}
                  className="flex items-center space-x-1 bg-white text-blue-700 px-4 py-1.5 rounded-md hover:bg-blue-50 transition-colors"
                >
                  <User size={18} />
                  <span>Dashboard</span>
                </button>
                <button 
                  onClick={handleLogout}
                  className="border border-white px-4 py-1.5 rounded-md hover:bg-white hover:text-blue-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="hover:text-blue-200 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-white text-blue-700 px-4 py-1.5 rounded-md hover:bg-blue-50 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <nav className="md:hidden pt-4 pb-4 space-y-2 border-t border-blue-500 mt-3">
            <Link 
              to="/" 
              className="block py-2 hover:bg-blue-600 px-2 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="block py-2 hover:bg-blue-600 px-2 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="block py-2 hover:bg-blue-600 px-2 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            
            {isAuthenticated ? (
              <>
                <button 
                  onClick={goToDashboard}
                  className="block w-full text-left py-2 hover:bg-blue-600 px-2 rounded"
                >
                  Dashboard
                </button>
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left py-2 hover:bg-blue-600 px-2 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block py-2 hover:bg-blue-600 px-2 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="block py-2 hover:bg-blue-600 px-2 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;