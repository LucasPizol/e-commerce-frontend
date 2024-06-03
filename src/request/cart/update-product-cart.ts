import { api } from "@/api/api";

export const updateProductQuantityCart = async (
  id: number,
  quantity: number
) => {
  return (await api.put(`/carts/${id}`, { cart: { quantity } })).data;
};
