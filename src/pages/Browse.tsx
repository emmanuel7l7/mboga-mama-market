
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import VegetableCard from '@/components/VegetableCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { mockVegetables } from '@/data/mockData';
import { Search } from 'lucide-react';

const Browse = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterInStock, setFilterInStock] = useState(false);

  const filteredVegetables = mockVegetables.filter((vegetable) => {
    // Apply search filter
    const matchesSearch = vegetable.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           vegetable.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply in-stock filter
    const matchesStock = filterInStock ? vegetable.inStock : true;
    
    return matchesSearch && matchesStock;
  });

  return (
    <Layout>
      <div className="bg-mboga-600 py-10">
        <div className="container-custom">
          <h1 className="text-3xl font-bold text-white mb-4">Browse Fresh Vegetables</h1>
          <p className="text-white/90 max-w-2xl">
            Explore our diverse selection of fresh vegetables from local vendors. Filter and search to find exactly what you need.
          </p>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              placeholder="Search vegetables..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant={filterInStock ? "default" : "outline"}
            className={`${filterInStock ? 'bg-mboga-500 hover:bg-mboga-600' : 'border-mboga-500 text-mboga-700 hover:bg-mboga-50'}`}
            onClick={() => setFilterInStock(!filterInStock)}
          >
            {filterInStock ? 'In Stock Only' : 'Show All'}
          </Button>
        </div>

        {filteredVegetables.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Vegetables Found</h2>
            <p className="text-gray-600">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            {searchTerm && (
              <Button 
                onClick={() => setSearchTerm('')}
                variant="link" 
                className="mt-4"
              >
                Clear search
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredVegetables.map((vegetable) => (
              <VegetableCard key={vegetable.id} vegetable={vegetable} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Browse;
