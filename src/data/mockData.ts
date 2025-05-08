import { Vegetable, Vendor } from "../lib/types";

export const mockVendors: Vendor[] = [
  {
    id: "v1",
    name: "Jane Wanjiku",
    storeName: "Mama Jane's Fresh Produce",
    profilePicture: "/images/vanessa-bucceri-mFoOiQPg0Kk-unsplash.jpg",
    location: "Nairobi Central Market, Stall #45",
    contact: {
      phone: "+254 712 345 678",
      email: "jane@example.com"
    },
    bio: "I've been selling fresh vegetables for over 15 years. All my produce comes from local farms around Nairobi.",
    joinDate: "2023-10-05",
    subscriptionStatus: "active",
    subscriptionEnds: "2024-06-28"
  },
  {
    id: "v2",
    name: "Grace Atieno",
    storeName: "Atieno's Garden",
    profilePicture: "/images/elena-mozhvilo-g8t1W2eoCV0-unsplash.jpg",
    location: "Nakuru Town Market, Stall #12",
    contact: {
      phone: "+254 723 456 789",
      email: "grace@example.com"
    },
    bio: "I grow all my vegetables on my farm just outside Nakuru. Everything is organic and pesticide-free.",
    joinDate: "2023-11-15",
    subscriptionStatus: "active",
    subscriptionEnds: "2024-05-15"
  }
];

export const mockVegetables: Vegetable[] = [
  {
    id: "p1",
    name: "Fresh Spinach",
    price: 1500,
    unit: "bunch",
    image: "/images/spinach.jpg",
    description: "Fresh, locally grown spinach. Perfect for salads and cooking.",
    inStock: true,
    vendorId: "v1"
  },
  {
    id: "p2",
    name: "Ripe Tomatoes",
    price: 3500,
    unit: "kg",
    image: "/images/nyanya2.jpg",
    description: "Juicy, red tomatoes. Great for salads, sauces, and stews.",
    inStock: true,
    vendorId: "v1"
  },
  {
    id: "p3",
    name: "Green Kale",
    price: 1800,
    unit: "bunch",
    image: "/images/kale.jpg",
    description: "Nutritious kale, freshly harvested. Rich in vitamins and minerals.",
    inStock: true,
    vendorId: "v1"
  },
  {
    id: "p4",
    name: "Red Onions",
    price: 3200,
    unit: "kg",
    image: "/images/kitunguu2.jpg",
    description: "Sweet red onions. Essential for many dishes.",
    inStock: true,
    vendorId: "v1"
  },
  {
    id: "p5",
    name: "Green Peppers",
    price: 3800,
    unit: "kg",
    image: "/images/greenpeppers.jpg",
    description: "Crisp green peppers. Perfect for salads and cooking.",
    inStock: true,
    vendorId: "v2"
  },
  {
    id: "p6",
    name: "Fresh Carrots",
    price: 3000,
    unit: "kg",
    image: "/images/carrot.jpg",
    description: "Sweet, crunchy carrots. Great for salads, cooking, or snacking.",
    inStock: true,
    vendorId: "v2"
  },
  {
    id: "p7",
    name: "Green Cabbage",
    price: 2500,
    unit: "head",
    image: "/images/cabbege.jpg",
    description: "Fresh, crisp cabbage. Perfect for salads and cooking.",
    inStock: true,
    vendorId: "v2"
  },
  {
    id: "p8",
    name: "Fresh Cilantro",
    price: 2000,
    unit: "bunch",
    image: "/images/cilantro.jpg",
    description: "Aromatic cilantro. Adds flavor to many dishes.",
    inStock: false,
    vendorId: "v2"
  }
];

export const currentVendor = mockVendors[0];
export const currentVendorProducts = mockVegetables.filter(v => v.vendorId === currentVendor.id);
