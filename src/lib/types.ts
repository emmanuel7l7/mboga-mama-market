
export interface Vegetable {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  description: string;
  inStock: boolean;
  vendorId: string;
}

export interface Vendor {
  id: string;
  name: string;
  storeName: string;
  profilePicture: string;
  location: string;
  contact: {
    phone: string;
    email: string;
  };
  bio: string;
  joinDate: string;
  subscriptionStatus: 'active' | 'inactive';
  subscriptionEnds?: string;
}
