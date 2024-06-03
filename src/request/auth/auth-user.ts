import { api } from "@/api/api";
import { ICartModelWithAggregation } from "@/interface/Cart";
import { IAuthenticateUserModel, IUserTokenModel } from "@/interface/User";

export const authUser = async (
  user: IAuthenticateUserModel
): Promise<{
  user: IUserTokenModel;
  cart: ICartModelWithAggregation[];
}> => {
  return (await api.post("/auth/login", { user })).data;
};
