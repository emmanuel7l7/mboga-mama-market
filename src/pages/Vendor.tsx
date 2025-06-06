import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import VendorProfile from '@/components/VendorProfile';
import EditVendorProfile from '@/components/EditVendorProfile';
import VegetableCard from '@/components/VegetableCard';
import AddEditVegetable from '@/components/AddEditVegetable';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Vegetable, Vendor } from '@/lib/types';
import { Plus } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Tables } from '@/lib/supabase';
import myImage from '/images/mohammad-ebrahimi-4l-xBWZTq6o-unsplash (1).jpg'

const Vendor = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [vendor, setVendor] = useState<Vendor>({
    id: '',
    name: '',
    storeName: '',
    profilePicture: '',
    location: '',
    contact: {
      phone: '',
      email: ''
    },
    bio: '',
    joinDate: new Date().toISOString(),
    subscriptionStatus: 'inactive'
  });
  const [vegetables, setVegetables] = useState<Vegetable[]>([]);
  const [editingVegetable, setEditingVegetable] = useState<Vegetable | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsAuthenticated(true);
        fetchVendorData(session.user.id);
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const fetchVendorData = async (userId: string) => {
    try {
      // Fetch vendor profile
      const { data: vendorData, error: vendorError } = await supabase
        .from('vendors')
        .select('*')
        .eq('id', userId)
        .single();

      if (vendorError) throw vendorError;

      if (vendorData) {
        setVendor({
          id: vendorData.id,
          name: vendorData.name,
          storeName: vendorData.store_name,
          profilePicture: vendorData.profile_picture,
          location: vendorData.location,
          contact: {
            phone: vendorData.phone,
            email: vendorData.email
          },
          bio: vendorData.bio,
          joinDate: vendorData.join_date,
          subscriptionStatus: vendorData.subscription_status,
          subscriptionEnds: vendorData.subscription_ends
        });

        // Fetch vendor's vegetables
        const { data: vegetablesData, error: vegetablesError } = await supabase
          .from('vegetables')
          .select('*')
          .eq('vendor_id', userId);

        if (vegetablesError) throw vegetablesError;

        if (vegetablesData) {
          setVegetables(vegetablesData.map(v => ({
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
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      if (data.session) {
        setIsAuthenticated(true);
        fetchVendorData(data.session.user.id);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleSaveVegetable = async (updatedVegetable: Partial<Vegetable>) => {
    try {
      if (editingVegetable) {
        // Update existing vegetable
        const { error } = await supabase
          .from('vegetables')
          .update({
            name: updatedVegetable.name,
            price: updatedVegetable.price,
            unit: updatedVegetable.unit,
            image: updatedVegetable.image,
            description: updatedVegetable.description,
            in_stock: updatedVegetable.inStock
          })
          .eq('id', editingVegetable.id);

        if (error) throw error;

        setVegetables(
          vegetables.map((v) =>
            v.id === editingVegetable.id ? { ...v, ...updatedVegetable } : v
          )
        );
        setEditingVegetable(null);
      } else if (isAddingNew) {
        // Add new vegetable
        const { data, error } = await supabase
          .from('vegetables')
          .insert({
            name: updatedVegetable.name,
            price: updatedVegetable.price,
            unit: updatedVegetable.unit,
            image: updatedVegetable.image,
            description: updatedVegetable.description,
            in_stock: updatedVegetable.inStock,
            vendor_id: vendor.id
          })
          .select()
          .single();

        if (error) throw error;

        if (data) {
          const newVegetable: Vegetable = {
            id: data.id,
            vendorId: vendor.id,
            ...updatedVegetable as Omit<Vegetable, 'id' | 'vendorId'>,
          } as Vegetable;
          
          setVegetables([...vegetables, newVegetable]);
          setIsAddingNew(false);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleSaveProfile = async (updatedVendor: Partial<Vendor>) => {
    try {
      const { error } = await supabase
        .from('vendors')
        .update({
          name: updatedVendor.name,
          store_name: updatedVendor.storeName,
          profile_picture: updatedVendor.profilePicture,
          location: updatedVendor.location,
          phone: updatedVendor.contact?.phone,
          email: updatedVendor.contact?.email,
          bio: updatedVendor.bio
        })
        .eq('id', vendor.id);

      if (error) throw error;

      setVendor(prev => ({ ...prev, ...updatedVendor }));
      setIsEditingProfile(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleEditVegetable = (id: string) => {
    const vegetable = vegetables.find((v) => v.id === id) || null;
    setEditingVegetable(vegetable);
    setIsAddingNew(false);
  };

  const handleCancelEdit = () => {
    setEditingVegetable(null);
    setIsAddingNew(false);
  };

  const handleEditProfile = () => {
    setIsEditingProfile(true);
  };

  const handleCancelProfileEdit = () => {
    setIsEditingProfile(false);
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setIsAuthenticated(false);
      setVendor({
        id: '',
        name: '',
        storeName: '',
        profilePicture: '',
        location: '',
        contact: {
          phone: '',
          email: ''
        },
        bio: '',
        joinDate: new Date().toISOString(),
        subscriptionStatus: 'inactive'
      });
      setVegetables([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="container-custom py-16">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Vendor Login</h1>
              <p className="text-gray-600">Sign in to manage your store</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-8">
              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-md">
                  {error}
                </div>
              )}
              <form onSubmit={handleLogin}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-3 py-2 border rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="w-full px-3 py-2 border rounded-md"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-mboga-500 hover:bg-mboga-600">
                    Sign In
                  </Button>
                </div>
              </form>
              
              <div className="text-center mt-4">
                <span className="text-sm text-gray-600">Don't have an account?</span>
                <a href="/vendor/register" className="ml-2 text-mboga-700 hover:underline font-medium">Register as Vendor</a>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-mboga-600 py-10">
        <div className="container-custom flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Vendor Dashboard</h1>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="bg-white text-mboga-700 hover:bg-gray-100"
          >
            Log Out
          </Button>
        </div>
      </div>

      <div className="container-custom py-8">
        {isEditingProfile ? (
          <EditVendorProfile
            vendor={vendor}
            onSave={handleSaveProfile}
            onCancel={handleCancelProfileEdit}
          />
        ) : (
          <VendorProfile 
            vendor={vendor} 
            isEditable={true}
            onEdit={handleEditProfile}
          />
        )}

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
                  vendor.subscriptionStatus === 'active' 
                  ? 'border-mboga-500 bg-mboga-50' 
                  : 'border-gray-200'
                }`}>
                  <h3 className="text-xl font-semibold mb-2">Basic Plan</h3>
                  <div className="text-3xl font-bold mb-2">Tshs 500<span className="text-sm text-gray-500">/month</span></div>
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
                  
                  {vendor.subscriptionStatus === 'active' ? (
                    <>
                      <div className="text-sm text-gray-600 mb-4">
                        Your subscription renews on {new Date(vendor.subscriptionEnds || "").toLocaleDateString()}
                      </div>
                      <Button variant="outline" className="w-full">Manage Subscription</Button>
                    </>
                  ) : (
                    <Button className="w-full bg-mboga-500 hover:bg-mboga-600">Subscribe Now</Button>
                  )}
                </div>
                
                <div className="p-6 rounded-lg border-2 border-gray-200">
                  <h3 className="text-xl font-semibold mb-2">Premium Plan</h3>
                  <div className="text-3xl font-bold mb-2">Tshs 1000<span className="text-sm text-gray-500">/month</span></div>
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
                  <div className="text-3xl font-bold mb-2">Tshs 2500<span className="text-sm text-gray-500">/month</span></div>
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
