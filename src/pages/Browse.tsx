import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import VegetableCard from '@/components/VegetableCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Vegetable } from '@/lib/types';

const Browse = () => {
  const [vegetables, setVegetables] = useState<Vegetable[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchVegetables();
  }, []);

  const fetchVegetables = async () => {
    try {
      const { data, error } = await supabase
        .from('vegetables')
        .select('*')
        .eq('in_stock', true);

      if (error) throw error;

      if (data) {
        setVegetables(data.map(v => ({
          id: v.id,
          name: v.name,
          price: v.price,
          unit: v.unit,
          image: v.image,
          description: v.description,
          inStock: v.in_stock,
          vendorId: v.vendor_id
        })));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const filteredVegetables = vegetables.filter(vegetable =>
    vegetable.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Browse Vegetables</h1>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search vegetables..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="bg-mboga-500 hover:bg-mboga-600">
              Filter
            </Button>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-md mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <p>Loading vegetables...</p>
          </div>
        ) : filteredVegetables.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Vegetables Found</h3>
            <p className="text-gray-600">
              {searchQuery ? 'Try a different search term' : 'No vegetables are currently available'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredVegetables.map((vegetable) => (
              <VegetableCard 
                key={vegetable.id} 
                vegetable={vegetable}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Browse;
