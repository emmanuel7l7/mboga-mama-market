import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import VegetableCard from '@/components/VegetableCard';
import VendorProfile from '@/components/VendorProfile';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import type { Tables } from '@/lib/supabase';

const Index = () => {
  const [featuredVegetables, setFeaturedVegetables] = useState<Tables['vegetables'][]>([]);
  const [featuredVendors, setFeaturedVendors] = useState<Tables['vendors'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch featured vegetables
        const { data: vegetables, error: vegetablesError } = await supabase
          .from('vegetables')
          .select('*')
          .eq('in_stock', true)
          .order('created_at', { ascending: false })
          .limit(4);

        if (vegetablesError) throw vegetablesError;
        
        // Fetch featured vendors
        const { data: vendors, error: vendorsError } = await supabase
          .from('vendors')
          .select('*')
          .eq('subscription_status', 'active')
          .order('created_at', { ascending: false })
          .limit(2);

        if (vendorsError) throw vendorsError;

        setFeaturedVegetables(vegetables || []);
        setFeaturedVendors(vendors || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Hero />

      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Featured Fresh Vegetables</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse our selection of the freshest vegetables directly from local vendors
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featuredVegetables.map((vegetable) => (
              <VegetableCard 
                key={vegetable.id} 
                vegetable={{
                  id: vegetable.id,
                  name: vegetable.name,
                  price: vegetable.price,
                  unit: vegetable.unit,
                  image: vegetable.image,
                  description: vegetable.description,
                  inStock: vegetable.in_stock,
                  vendorId: vegetable.vendor_id
                }} 
              />
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild className="bg-mboga-500 hover:bg-mboga-600">
              <Link to="/browse">View All Vegetables</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Meet Our Vendors</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get to know the people behind the fresh vegetables in our marketplace
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredVendors.map((vendor) => (
              <VendorProfile 
                key={vendor.id} 
                vendor={{
                  id: vendor.id,
                  name: vendor.name,
                  storeName: vendor.store_name,
                  profilePicture: vendor.profile_picture,
                  location: vendor.location,
                  contact: {
                    phone: vendor.phone,
                    email: vendor.email
                  },
                  bio: vendor.bio,
                  joinDate: vendor.join_date,
                  subscriptionStatus: vendor.subscription_status,
                  subscriptionEnds: vendor.subscription_ends
                }} 
              />
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-lg text-earth-800 mb-4">
              Are you a vegetable vendor? Join our platform today!
            </p>
            <Button asChild variant="outline" className="border-mboga-500 text-mboga-700 hover:bg-mboga-50">
              <Link to="/vendor">Register as a Vendor</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-mboga-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Why Choose Mboga Mama Market?</h2>
              <ul className="space-y-4">
                <li className="flex">
                  <div className="h-6 w-6 rounded-full bg-mboga-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Fresh Local Produce</h3>
                    <p className="text-gray-600">Connect directly with local vendors for the freshest vegetables</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="h-6 w-6 rounded-full bg-mboga-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Support Local Vendors</h3>
                    <p className="text-gray-600">Help small businesses grow by buying directly from them</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="h-6 w-6 rounded-full bg-mboga-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Quality Guarantee</h3>
                    <p className="text-gray-600">We ensure all vegetables are fresh and of high quality</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="h-6 w-6 rounded-full bg-mboga-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Easy to Use</h3>
                    <p className="text-gray-600">Our platform makes it simple to find and purchase fresh vegetables</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="aspect-square max-w-md overflow-hidden rounded-lg shadow-lg">
                  <img
                    src="https://source.unsplash.com/1518843875892-73e05ac1d15b"
                    alt="Fresh vegetables"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-40 h-40 overflow-hidden rounded-lg shadow-lg border-4 border-white">
                  <img
                    src="https://source.unsplash.com/1596040033648-a8361d4d8b33"
                    alt="Fresh vegetables"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
