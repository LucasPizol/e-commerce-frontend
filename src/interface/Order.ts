import { IProductModel } from "./Product";

export interface IOrderModel {
  id: string;
  status: string;
  payment_method_types: string[];
  total_details: {
    amount_discount: number;
    amount_shipping: number;
    amount_tax: number;
  };
  total: number;
  produts: IProductModel[];
}
