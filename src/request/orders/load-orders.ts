import { api } from "@/api/api";

export const loadOrders = async () => {
  return (await api.get("/orders")).data;
};
