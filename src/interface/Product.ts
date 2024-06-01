export interface IAddProductModel {
  name: string;
  description: string;
  price: number;
}

export interface IProductModel {
  id: string;
  name: string;
  description: string;
  price: {
    id: string;
    value: number;
  };
  images: string[];
  metadata: {
    carousel?: boolean;
    carousel_background?: string;
    category: string;
    tags: string[];
  };
}
