import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Tables } from '@/lib/supabase';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [vegetable, setVegetable] = useState<Tables['vegetables'] | null>(null);
  const [vendor, setVendor] = useState<Tables['vendors'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        
        // Fetch vegetable details
        const { data: vegetableData, error: vegetableError } = await supabase
          .from('vegetables')
          .select('*')
          .eq('id', id)
          .single();

        if (vegetableError) throw vegetableError;

        if (vegetableData) {
          setVegetable(vegetableData);

          // Fetch vendor details
          const { data: vendorData, error: vendorError } = await supabase
            .from('vendors')
            .select('*')
            .eq('id', vegetableData.vendor_id)
            .single();

          if (vendorError) throw vendorError;
          setVendor(vendorData);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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

  if (!vegetable) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-8">The vegetable you're looking for doesn't exist or has been removed.</p>
          <Button asChild className="bg-mboga-500 hover:bg-mboga-600">
            <Link to="/browse">Back to Browsing</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={vegetable.image}
              alt={vegetable.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">{vegetable.name}</h1>
            <p className="text-2xl font-semibold text-mboga-700 mb-4">
              Tshs {vegetable.price.toLocaleString()} / {vegetable.unit}
            </p>
            <p className="text-gray-600 mb-6">{vegetable.description}</p>
            
            {vendor && (
              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold mb-4">Vendor Information</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-mboga-600" />
                    <span>{vendor.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-mboga-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    <a href={`tel:${vendor.phone}`} className="text-mboga-600 hover:text-mboga-700">
                      {vendor.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-mboga-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    <a href={`mailto:${vendor.email}`} className="text-mboga-600 hover:text-mboga-700">
                      {vendor.email}
                    </a>
                  </div>
                  <p className="text-gray-600 mt-4">{vendor.bio}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
