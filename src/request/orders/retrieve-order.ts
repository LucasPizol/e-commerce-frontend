import { api } from "@/api/api";

export const retrieveOrder = async (orderId: string) => {
  return (await api.get(`/orders/${orderId}`)).data;
};
