import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { uploadImage } from '@/lib/storage';

const VendorRegister = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    storeName: '',
    email: '',
    password: '',
    phone: '',
    location: '',
    bio: '',
    profilePicture: null as File | null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm(prev => ({ ...prev, profilePicture: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Check if user already exists
      const { data: existingUser } = await supabase
        .from('vendors')
        .select('id')
        .eq('email', form.email)
        .single();

      if (existingUser) {
        throw new Error('A vendor with this email already exists. Please use a different email or try logging in.');
      }

      // 2. Sign up the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('No user data returned');

      // 3. Upload profile picture if provided
      let profilePictureUrl = '';
      if (form.profilePicture) {
        profilePictureUrl = await uploadImage(form.profilePicture, 'profiles');
      }

      // 4. Create vendor profile
      const { error: profileError } = await supabase
        .from('vendors')
        .insert({
          id: authData.user.id,
          name: form.name,
          store_name: form.storeName,
          profile_picture: profilePictureUrl,
          location: form.location,
          phone: form.phone,
          email: form.email,
          bio: form.bio,
          subscription_status: 'inactive',
          join_date: new Date().toISOString()
        });

      if (profileError) {
        // If profile creation fails, delete the auth user
        await supabase.auth.admin.deleteUser(authData.user.id);
        throw profileError;
      }

      // 5. Redirect to vendor dashboard
      navigate('/vendor');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container-custom py-16">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm border p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Vendor Registration</h1>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label htmlFor="storeName" className="block text-sm font-medium mb-1">Store Name</label>
              <input
                type="text"
                id="storeName"
                name="storeName"
                value={form.storeName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
                minLength={6}
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={form.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium mb-1">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={form.bio}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                rows={3}
              />
            </div>

            <div>
              <label htmlFor="profilePicture" className="block text-sm font-medium mb-1">Profile Picture</label>
              <input
                type="file"
                id="profilePicture"
                name="profilePicture"
                onChange={handleFileChange}
                className="w-full"
                accept="image/*"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-mboga-500 hover:bg-mboga-600"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </form>

          <div className="text-center mt-4">
            <span className="text-sm text-gray-600">Already have an account?</span>
            <a href="/vendor" className="ml-2 text-mboga-700 hover:underline font-medium">Sign In</a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VendorRegister; 