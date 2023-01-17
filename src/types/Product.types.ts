export interface Product {
  createdAt: string;
  id: string;
  image: string;
  is_redemption: boolean;
  points: number;
  product: string;
}

export type ProductList = Product[];
