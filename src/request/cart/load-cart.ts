import { api } from "@/api/api";
import { ICartModelWithAggregation } from "@/interface/Cart";

export const loadCart = async (): Promise<ICartModelWithAggregation[]> => {
  return (await api.get("/carts")).data;
};
