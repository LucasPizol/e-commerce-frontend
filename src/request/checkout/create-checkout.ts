import { api } from "@/api/api";
import { ICartModelWithAggregation } from "@/interface/Cart";

export const createCheckout = async (
  cart: ICartModelWithAggregation[]
): Promise<{ url: string }> => {
  return (
    await api.post("/checkout", {
      line_items: cart.map((product) => ({
        price_id: product.price.id,
        quantity: product.quantity,
      })),
    })
  ).data;
};
