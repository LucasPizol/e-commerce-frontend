import { api } from "@/api/api";
import { IAddUserModel, IUserTokenModel } from "@/interface/User";

export const registerUser = async (
  user: IAddUserModel
): Promise<IUserTokenModel> => {
  return (await api.post("/auth/register", { user })).data;
};
