export interface ProductVariant {
  id: number;
  name: string;
  priceModifier: number;
  stockQuantity: number;
}

export interface ApiProduct {
  id: number;
  name: string;
  description: string;
  // JSON turns the DB's decimal into a string
  basePrice: string;
  discountPrice: string | null;
  categoryId: number;
  category: {
    name: string;
  };
  images: {
    id: number;
    url: string;
    altText: string;
  }[];
  variants: {
    id: number;
    name: string;
    priceModifier: string | number;
    stockQuantity: number;
    productId: number;
  }[];
  // Data is return as a string
  createdAt: string;
}

// For UI, components use this
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  image: string;
  category: string;
  // Calculated in the front-end
  isNew: boolean;
  variants: ProductVariant[];
}

export interface Address {
  id: number;
  city: string;
  street: string;
  postalCode: string;
  houseNumber: string;
  country: string;
  isDefault: boolean;
}

export interface OrderItem {
  id: number;
  quantity: number;
  unitPrice: string;
  variant: {
    name: string;
  };
}

export interface Order {
  id: number;
  orderDate: string;
  status: string;
  totalAmount: string;
  items: OrderItem[];
}

export interface UserProfile {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: string;
  addresses: Address[];
  orders: Order[];
}

export interface AdminProduct {
  id: number;
  name: string;
  basePrice: string;
  category: {
    name: string;
  };
  totalStock: number;
  status: 'ACTIVE' | 'ARCHIVED';
  boughtCount: number;
  image?: string;
}
