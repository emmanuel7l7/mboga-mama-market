
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import VendorProfile from '@/components/VendorProfile';
import VegetableCard from '@/components/VegetableCard';
import AddEditVegetable from '@/components/AddEditVegetable';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { currentVendor, currentVendorProducts } from '@/data/mockData';
import { Vegetable } from '@/lib/types';
import { Plus } from 'lucide-react';

const Vendor = () => {
  const [vegetables, setVegetables] = useState<Vegetable[]>(currentVendorProducts);
  const [editingVegetable, setEditingVegetable] = useState<Vegetable | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleEditVegetable = (id: string) => {
    const vegetable = vegetables.find((v) => v.id === id) || null;
    setEditingVegetable(vegetable);
    setIsAddingNew(false);
  };

  const handleSaveVegetable = (updatedVegetable: Partial<Vegetable>) => {
    if (editingVegetable) {
      // Updating existing vegetable
      setVegetables(
        vegetables.map((v) =>
          v.id === editingVegetable.id ? { ...v, ...updatedVegetable } : v
        )
      );
      setEditingVegetable(null);
    } else if (isAddingNew) {
      // Adding new vegetable
      const newVegetable: Vegetable = {
        id: `p${vegetables.length + 1}`,
        vendorId: currentVendor.id,
        ...updatedVegetable as Omit<Vegetable, 'id' | 'vendorId'>,
      } as Vegetable;
      
      setVegetables([...vegetables, newVegetable]);
      setIsAddingNew(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingVegetable(null);
    setIsAddingNew(false);
  };

  return (
    <Layout>
      <div className="bg-mboga-600 py-10">
        <div className="container-custom">
          <h1 className="text-3xl font-bold text-white">Vendor Dashboard</h1>
        </div>
      </div>

      <div className="container-custom py-8">
        <VendorProfile vendor={currentVendor} isEditable />

        <Tabs defaultValue="products" className="mt-8">
          <TabsList className="mb-8">
            <TabsTrigger value="products">My Products</TabsTrigger>
            <TabsTrigger value="subscription">My Subscription</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Vegetables</h2>
              <Button 
                onClick={() => {
                  setEditingVegetable(null);
                  setIsAddingNew(true);
                }}
                className="bg-mboga-500 hover:bg-mboga-600"
              >
                <Plus className="mr-1 h-4 w-4" /> Add New Vegetable
              </Button>
            </div>
            
            {vegetables.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Vegetables Listed</h3>
                <p className="text-gray-600 mb-6">
                  You haven't added any vegetables to your store yet.
                </p>
                <Button 
                  onClick={() => {
                    setEditingVegetable(null);
                    setIsAddingNew(true);
                  }}
                  className="bg-mboga-500 hover:bg-mboga-600"
                >
                  <Plus className="mr-1 h-4 w-4" /> Add Your First Vegetable
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {vegetables.map((vegetable) => (
                  <VegetableCard 
                    key={vegetable.id} 
                    vegetable={vegetable} 
                    isEditable={true}
                    onEdit={handleEditVegetable}
                  />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="subscription">
            <div className="bg-white rounded-lg shadow-sm border p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Your Subscription</h2>
                <p className="text-gray-600">
                  Manage your vendor subscription details and payment information
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
                <div className={`p-6 rounded-lg border-2 ${
                  currentVendor.subscriptionStatus === 'active' 
                  ? 'border-mboga-500 bg-mboga-50' 
                  : 'border-gray-200'
                }`}>
                  <h3 className="text-xl font-semibold mb-2">Basic Plan</h3>
                  <div className="text-3xl font-bold mb-2">Ksh 500<span className="text-sm text-gray-500">/month</span></div>
                  <ul className="text-gray-600 space-y-2 mb-6 text-left">
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-mboga-500 mr-2" />
                      <span>List up to 10 vegetables</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-mboga-500 mr-2" />
                      <span>Basic profile customization</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-mboga-500 mr-2" />
                      <span>Email support</span>
                    </li>
                  </ul>
                  
                  {currentVendor.subscriptionStatus === 'active' ? (
                    <>
                      <div className="text-sm text-gray-600 mb-4">
                        Your subscription renews on {new Date(currentVendor.subscriptionEnds || "").toLocaleDateString()}
                      </div>
                      <Button variant="outline" className="w-full">Manage Subscription</Button>
                    </>
                  ) : (
                    <Button className="w-full bg-mboga-500 hover:bg-mboga-600">Subscribe Now</Button>
                  )}
                </div>
                
                <div className="p-6 rounded-lg border-2 border-gray-200">
                  <h3 className="text-xl font-semibold mb-2">Premium Plan</h3>
                  <div className="text-3xl font-bold mb-2">Ksh 1000<span className="text-sm text-gray-500">/month</span></div>
                  <ul className="text-gray-600 space-y-2 mb-6 text-left">
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-mboga-500 mr-2" />
                      <span>Unlimited vegetables</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-mboga-500 mr-2" />
                      <span>Featured profile listing</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-mboga-500 mr-2" />
                      <span>Priority email & phone support</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-mboga-500 hover:bg-mboga-600">Upgrade</Button>
                </div>
                
                <div className="p-6 rounded-lg border-2 border-gray-200">
                  <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
                  <div className="text-3xl font-bold mb-2">Ksh 2500<span className="text-sm text-gray-500">/month</span></div>
                  <ul className="text-gray-600 space-y-2 mb-6 text-left">
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-mboga-500 mr-2" />
                      <span>All Premium features</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-mboga-500 mr-2" />
                      <span>Custom branding options</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-mboga-500 mr-2" />
                      <span>Dedicated account manager</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-mboga-500 hover:bg-mboga-600">Contact Sales</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modal for adding/editing vegetables */}
      {(editingVegetable || isAddingNew) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-lg">
            <AddEditVegetable
              vegetable={editingVegetable || undefined}
              onSave={handleSaveVegetable}
              onCancel={handleCancelEdit}
              isNew={isAddingNew}
            />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Vendor;
