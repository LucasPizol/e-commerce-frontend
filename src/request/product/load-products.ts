import { api } from "@/api/api";
import { IProductModel } from "@/interface/Product";

export const loadProducts = async (): Promise<IProductModel[]> => {
  return (await api.get("/products")).data;
};
