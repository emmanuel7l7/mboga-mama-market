
import { Vegetable, Vendor } from "../lib/types";

export const mockVendors: Vendor[] = [
  {
    id: "v1",
    name: "Jane Wanjiku",
    storeName: "Mama Jane's Fresh Produce",
    profilePicture: "https://source.unsplash.com/1581092576-c2fb04d644d3",
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
    profilePicture: "https://source.unsplash.com/1582719661-c5e4f4637895",
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
    price: 50,
    unit: "bunch",
    image: "https://source.unsplash.com/1576097942317-a4e69a4f7cf9",
    description: "Fresh, locally grown spinach. Perfect for salads and cooking.",
    inStock: true,
    vendorId: "v1"
  },
  {
    id: "p2",
    name: "Ripe Tomatoes",
    price: 120,
    unit: "kg",
    image: "https://source.unsplash.com/1518843875892-73e05ac1d15b",
    description: "Juicy, red tomatoes. Great for salads, sauces, and stews.",
    inStock: true,
    vendorId: "v1"
  },
  {
    id: "p3",
    name: "Green Kale",
    price: 45,
    unit: "bunch",
    image: "https://source.unsplash.com/1566485055384-7c6be3d94f11",
    description: "Nutritious kale, freshly harvested. Rich in vitamins and minerals.",
    inStock: true,
    vendorId: "v1"
  },
  {
    id: "p4",
    name: "Red Onions",
    price: 80,
    unit: "kg",
    image: "https://source.unsplash.com/1580480026034-8e3711982c19",
    description: "Sweet red onions. Essential for many dishes.",
    inStock: true,
    vendorId: "v1"
  },
  {
    id: "p5",
    name: "Green Peppers",
    price: 150,
    unit: "kg",
    image: "https://source.unsplash.com/1596040033648-a8361d4d8b33",
    description: "Crisp green peppers. Perfect for salads and cooking.",
    inStock: true,
    vendorId: "v2"
  },
  {
    id: "p6",
    name: "Fresh Carrots",
    price: 90,
    unit: "kg",
    image: "https://source.unsplash.com/15736668/:7zJ5XjHXrU",
    description: "Sweet, crunchy carrots. Great for salads, cooking, or snacking.",
    inStock: true,
    vendorId: "v2"
  },
  {
    id: "p7",
    name: "Green Cabbage",
    price: 70,
    unit: "head",
    image: "https://source.unsplash.com/15757166/uTpicI9O-Cc",
    description: "Fresh, crisp cabbage. Perfect for salads and cooking.",
    inStock: true,
    vendorId: "v2"
  },
  {
    id: "p8",
    name: "Fresh Cilantro",
    price: 30,
    unit: "bunch",
    image: "https://source.unsplash.com/15974393/t9zx_B1jqCw",
    description: "Aromatic cilantro. Adds flavor to many dishes.",
    inStock: false,
    vendorId: "v2"
  }
];

export const currentVendor = mockVendors[0];
export const currentVendorProducts = mockVegetables.filter(v => v.vendorId === currentVendor.id);
