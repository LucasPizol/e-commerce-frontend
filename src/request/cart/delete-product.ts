import { api } from "@/api/api";

export const deleteCartProduct = async (id: number) => {
  await api.delete(`/carts/${id}`);
};
