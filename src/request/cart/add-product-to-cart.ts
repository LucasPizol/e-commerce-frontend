import { api } from "@/api/api";
import { IAddCartModel } from "@/interface/Cart";

export const addProductToCart = async (cart: IAddCartModel) => {
  return (await api.post("/carts", { cart })).data;
};
