import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { supabase } from '@/lib/supabase';
import type { Tables } from '@/lib/supabase';
import { toast } from 'sonner';

const Admin = () => {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState<Tables['vendors'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [vendorToDelete, setVendorToDelete] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/vendor');
        return;
      }

      // Check if user is admin
      const { data: adminData, error: adminError } = await supabase
        .from('admins')
        .select('*')
        .eq('user_id', session.user.id)
        .single();

      if (adminError || !adminData) {
        navigate('/vendor');
        return;
      }

      setIsAdmin(true);
      fetchVendors();
    } catch (err) {
      setError('Failed to verify admin status');
      setLoading(false);
    }
  };

  const fetchVendors = async () => {
    try {
      const { data, error } = await supabase
        .from('vendors')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVendors(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch vendors');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVendor = async () => {
    if (!vendorToDelete) return;

    try {
      // Delete vendor's vegetables first
      const { error: vegetablesError } = await supabase
        .from('vegetables')
        .delete()
        .eq('vendor_id', vendorToDelete);

      if (vegetablesError) throw vegetablesError;

      // Delete vendor
      const { error: vendorError } = await supabase
        .from('vendors')
        .delete()
        .eq('id', vendorToDelete);

      if (vendorError) throw vendorError;

      // Update local state
      setVendors(vendors.filter(v => v.id !== vendorToDelete));
      setVendorToDelete(null);
      toast.success('Vendor deleted successfully');
    } catch (err) {
      toast.error('Failed to delete vendor');
      console.error(err);
    }
  };

  const handleUpdateSubscription = async (vendorId: string, newStatus: 'active' | 'inactive') => {
    try {
      const { error } = await supabase
        .from('vendors')
        .update({ subscription_status: newStatus })
        .eq('id', vendorId);

      if (error) throw error;

      // Update local state
      setVendors(vendors.map(v => 
        v.id === vendorId 
          ? { ...v, subscription_status: newStatus }
          : v
      ));
      toast.success('Subscription status updated successfully');
    } catch (err) {
      toast.error('Failed to update subscription status');
      console.error(err);
    }
  };

  if (!isAdmin) {
    return null;
  }

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
      <div className="container-custom py-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Vendor Management</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor Name</TableHead>
                <TableHead>Store Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Subscription</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell>{vendor.name}</TableCell>
                  <TableCell>{vendor.store_name}</TableCell>
                  <TableCell>{vendor.email}</TableCell>
                  <TableCell>{vendor.phone}</TableCell>
                  <TableCell>{vendor.location}</TableCell>
                  <TableCell>
                    <select
                      value={vendor.subscription_status}
                      onChange={(e) => handleUpdateSubscription(vendor.id, e.target.value as 'active' | 'inactive')}
                      className="px-2 py-1 border rounded-md"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setVendorToDelete(vendor.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <AlertDialog open={!!vendorToDelete} onOpenChange={() => setVendorToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the vendor
                and all their associated vegetables.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteVendor}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Layout>
  );
};

export default Admin; 