import { Product } from "./product.entity";

export interface  CartItem {
  id: string;
  product: Product;
  quantity: number;
}
