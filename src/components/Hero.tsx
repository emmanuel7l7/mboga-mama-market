
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="banner-shape pb-16 pt-12 md:pt-24 md:pb-32">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Fresh Vegetables <br /> From Local Vendors
            </h1>
            <p className="text-white/90 text-lg mb-8 max-w-md">
              Connect with local vegetable vendors and get fresh produce delivered to your doorstep.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                className="bg-white text-mboga-700 hover:bg-gray-100"
                size="lg"
              >
                <Link to="/browse">Browse Vegetables</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                size="lg"
              >
                <Link to="/vendor">Vendor Dashboard</Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:block relative">
            <div className="aspect-square overflow-hidden rounded-full border-4 border-white shadow-lg">
              <img
                src="https://source.unsplash.com/1576097942317-a4e69a4f7cf9"
                alt="Fresh vegetables"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 aspect-square w-40 overflow-hidden rounded-full border-4 border-white shadow-lg">
              <img
                src="https://source.unsplash.com/1582719661-c5e4f4637895"
                alt="Vegetable vendor"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
