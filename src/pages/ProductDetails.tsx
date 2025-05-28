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
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-5 w-5 text-mboga-600" />
                  <span>{vendor.location}</span>
                </div>
                <p className="text-gray-600">{vendor.bio}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
