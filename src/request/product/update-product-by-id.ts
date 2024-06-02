import { api } from "@/api/api";
import { IAddProductModel } from "@/interface/Product";

export const updateProductById = async (
  id: string,
  product: Partial<IAddProductModel>
) => {
  return (await api.put(`/products/${id}`, { product })).data;
};
