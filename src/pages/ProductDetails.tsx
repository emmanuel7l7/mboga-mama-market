
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { mockVegetables, mockVendors } from '@/data/mockData';
import { MapPin } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const vegetable = mockVegetables.find((v) => v.id === id);
  
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

  const vendor = mockVendors.find((v) => v.id === vegetable.vendorId);

  return (
    <Layout>
      <div className="container-custom py-8">
        <Link to="/browse" className="text-mboga-600 hover:text-mboga-700 flex items-center mb-6">
          &larr; Back to Browsing
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="overflow-hidden rounded-lg">
            <img
              src={vegetable.image}
              alt={vegetable.name}
              className="w-full h-auto object-cover"
            />
          </div>
          
          <div>
            <h1 className="text-3xl font-bold mb-2">{vegetable.name}</h1>
            <div className="text-2xl font-bold text-mboga-700 mb-4">
              Ksh {vegetable.price} <span className="text-lg font-medium text-gray-600">per {vegetable.unit}</span>
            </div>
            
            <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-6 ${
              vegetable.inStock 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {vegetable.inStock ? 'In Stock' : 'Out of Stock'}
            </div>
            
            <div className="prose mb-6">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-700">{vegetable.description}</p>
            </div>
            
            {vendor && (
              <div className="border-t pt-6 mt-6">
                <h3 className="text-lg font-semibold mb-2">Sold by</h3>
                <Link to={`/browse?vendor=${vendor.id}`} className="flex items-start gap-3 hover:bg-gray-50 p-3 rounded-md transition-colors">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={vendor.profilePicture}
                      alt={vendor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{vendor.name}</div>
                    <div className="text-mboga-700">{vendor.storeName}</div>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {vendor.location}
                    </div>
                  </div>
                </Link>
              </div>
            )}
            
            <div className="mt-8">
              <Button
                className="w-full bg-mboga-500 hover:bg-mboga-600 text-lg py-6"
                disabled={!vegetable.inStock}
              >
                {vegetable.inStock ? 'Contact Vendor' : 'Currently Unavailable'}
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {mockVegetables
              .filter(v => v.id !== vegetable.id)
              .slice(0, 4)
              .map(v => (
                <div key={v.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <Link to={`/product/${v.id}`} className="block">
                    <div className="aspect-square">
                      <img 
                        src={v.image} 
                        alt={v.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">{v.name}</h3>
                      <div className="font-bold text-mboga-700 mt-1">
                        Ksh {v.price}/{v.unit}
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
