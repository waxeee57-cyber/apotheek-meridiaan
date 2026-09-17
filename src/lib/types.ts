export type Packaging = "blister" | "bottle" | "tube" | "jar" | "kit";

export type Product = {
  slug: string;
  name: string;
  shortName: string;
  category: string;
  tags: string[];
  price: number;
  vatRate: 9 | 21;
  stock: number;
  unit: string;
  form: string;
  packaging: Packaging;
  accent: string;
  featured: boolean;
  activeIngredient: string;
  description: string;
  usage: string;
  warnings: string[];
  ingredients: string;
  related: string[];
};

export type Category = {
  slug: string;
  name: string;
  summary: string;
  accent: string;
};

export type PharmacyHours = {
  days: string;
  time: string;
};

export type Pharmacy = {
  name: string;
  tagline: string;
  legalName: string;
  address: {
    street: string;
    postalCode: string;
    city: string;
  };
  phone: string;
  email: string;
  kvk: string;
  btw: string;
  big: string;
  hours: PharmacyHours[];
  emergency: string;
  shipping: {
    threshold: number;
    fee: number;
    sameDayCutoff: string;
    area: string;
  };
};

export type CartItem = {
  slug: string;
  quantity: number;
};

export type StoredOrder = {
  id: string;
  createdAt: string;
  email: string;
  name: string;
  fulfillment: "bezorging" | "afhalen";
  payment: string;
  items: Array<{
    slug: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  shipping: number;
  total: number;
};

export type StoredAccount = {
  name: string;
  email: string;
};

export type CookieConsent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};
