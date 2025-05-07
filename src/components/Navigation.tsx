
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container-custom py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-mboga-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="text-xl font-semibold text-earth-900">Mboga Mama</span>
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md"
            onClick={toggleMobileMenu}
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-earth-900 hover:text-mboga-600 transition font-medium">
              Home
            </Link>
            <Link to="/browse" className="text-earth-900 hover:text-mboga-600 transition font-medium">
              Browse
            </Link>
            <Link to="/vendor" className="text-earth-900 hover:text-mboga-600 transition font-medium">
              Vendor Dashboard
            </Link>
            <Button className="bg-mboga-500 hover:bg-mboga-600 text-white">
              Sign In
            </Button>
          </nav>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pt-4 pb-3 border-t mt-3">
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="block text-earth-900 hover:bg-mboga-50 px-3 py-2 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/browse" 
                  className="block text-earth-900 hover:bg-mboga-50 px-3 py-2 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Browse
                </Link>
              </li>
              <li>
                <Link 
                  to="/vendor" 
                  className="block text-earth-900 hover:bg-mboga-50 px-3 py-2 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Vendor Dashboard
                </Link>
              </li>
              <li>
                <Button 
                  className="w-full bg-mboga-500 hover:bg-mboga-600 text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navigation;
