import { IProductModel } from "./Product";

export type OrderStatus = "paid" | "pending" | "unpaid";

export interface IOrderModel {
  id: string;
  status: OrderStatus;
  created_at: number;
  payment_method_types: string[];
  total_details: {
    amount_discount: number;
    amount_shipping: number;
    amount_tax: number;
  };
  amount_total: number;
  products: (IProductModel & { quantity: number })[];
}
