import { api } from "@/api/api";
import { IUserModel } from "@/interface/User";

export const updateUser = async (
  user: Partial<IUserModel>
): Promise<IUserModel> => {
  return (await api.put("/users", { user })).data;
};
