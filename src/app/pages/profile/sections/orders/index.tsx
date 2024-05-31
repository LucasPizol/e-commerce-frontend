import { IOrderModel } from "@/interface/Order";
import { loadOrders } from "@/request/orders/load-orders";
import { useQuery } from "@tanstack/react-query";

export const OrdersSection = () => {
  const { data } = useQuery<IOrderModel[]>({
    queryKey: ["orders"],
    queryFn: () => loadOrders(),
  });

  console.log(data);

  return <></>;
};
