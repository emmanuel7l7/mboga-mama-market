import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database tables
export type Tables = {
  vendors: {
    id: string;
    name: string;
    store_name: string;
    profile_picture: string;
    location: string;
    phone: string;
    email: string;
    bio: string;
    join_date: string;
    subscription_status: 'active' | 'inactive';
    subscription_ends?: string;
    created_at: string;
  };
  vegetables: {
    id: string;
    name: string;
    price: number;
    unit: string;
    image: string;
    description: string;
    in_stock: boolean;
    vendor_id: string;
    created_at: string;
  };
}; 