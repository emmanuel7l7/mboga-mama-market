
import React from 'react';
import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
  hideNavigation?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hideNavigation = false }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavigation && <Navigation />}
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-earth-800 text-white py-6">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-3">Mboga Mama Market</h3>
              <p className="text-sm text-gray-300">
                Connecting fresh produce vendors with customers across the country.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="hover:text-mboga-300 transition">Home</a></li>
                <li><a href="/browse" className="hover:text-mboga-300 transition">Browse Vegetables</a></li>
                <li><a href="/vendor" className="hover:text-mboga-300 transition">Vendor Dashboard</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">Contact</h3>
              <p className="text-sm text-gray-300">
                Email: support@mbogamamamarket.com<br />
                Phone: +254 712 345 678
              </p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-earth-700 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Mboga Mama Market. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
