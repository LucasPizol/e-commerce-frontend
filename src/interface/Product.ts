export interface IAddProductModel {
  name: string;
  description: string;
  price: number;
  metadata: {
    brand: string;
  };
}

export interface IAddProductFieldsModel {
  name: string;
  description: string;
  price: number;
  brand: string;
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
    brand: string;
    category: string;
    tags: string[];
  };
}
