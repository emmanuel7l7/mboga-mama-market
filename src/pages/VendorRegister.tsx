import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';

const VendorRegister = () => {
  const [form, setForm] = useState({
    name: '',
    storeName: '',
    email: '',
    password: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would send the form data to your backend
  };

  return (
    <Layout>
      <div className="container-custom py-16">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm border p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Vendor Registration</h1>
          {submitted ? (
            <div className="text-center text-green-600 font-semibold">
              Registration successful! (Demo only)
            </div>
          ) : (
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
                />
              </div>
              <Button type="submit" className="w-full bg-mboga-500 hover:bg-mboga-600">
                Register
              </Button>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default VendorRegister; 