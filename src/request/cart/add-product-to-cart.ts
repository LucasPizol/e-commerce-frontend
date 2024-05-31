import { api } from "@/api/api";
import { IAddCartModel } from "@/interface/Cart";

export const addProductToCart = async (data: IAddCartModel) => {
  return (await api.post("/carts", data)).data;
};
