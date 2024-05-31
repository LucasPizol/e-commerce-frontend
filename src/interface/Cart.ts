export interface ICartModel {
  id: number;
  stripe_product_id: string;
  quantity: number;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface ICartModelWithAggregation {
  id: number;
  stripe_product_id: string;
  quantity: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  price: {
    id: string;
    value: number;
  };
  name: string;
  description: string;
  images: string[];
}

export type IAddCartModel = Pick<ICartModel, "stripe_product_id" | "quantity">;
