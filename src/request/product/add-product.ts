import { api } from "@/api/api";
import { IAddProductModel, IProductModel } from "../../interface/Product";

export const addProduct = async (
  data: IAddProductModel,
  images?: File[]
): Promise<IProductModel> => {
  const formData = new FormData();

  formData.append("product[name]", data.name);
  formData.append("product[description]", data.description);
  formData.append("product[price]", data.price.toString());

  images?.forEach((image) => {
    formData.append("product[images][]", image);
  });

  return (await api.post("/products", formData)).data;
};
