import { api } from "@/api/api";

export const clearCart = async (token: string) => {
  // This function is not implemented yet

  await api.delete(`/carts/clear?token=${token}`);
};
