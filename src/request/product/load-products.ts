import { api } from "@/api/api";
import { IProductModel } from "@/interface/Product";

export const loadProducts = async (
  ids?: string[]
): Promise<IProductModel[]> => {
  return (
    await api.get("/products", {
      params: {
        ids: ids?.join(","),
      },
    })
  ).data;
};
