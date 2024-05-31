import { api } from "@/api/api";
import { ICartModelWithAggregation } from "@/interface/Cart";
import { IUserModel } from "@/interface/User";

export const verifyAuth = async (): Promise<{
  user: IUserModel;
  cart: ICartModelWithAggregation[];
}> => {
  return (await api.get("/auth")).data;
};
