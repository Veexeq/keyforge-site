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