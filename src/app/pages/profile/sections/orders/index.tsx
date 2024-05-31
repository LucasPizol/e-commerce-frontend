import { IOrderModel } from "@/interface/Order";
import { loadOrders } from "@/request/orders/load-orders";
import { useQuery } from "@tanstack/react-query";

import { Order } from "./components/Order";
import styles from "./styles.module.css";

export const OrdersSection = () => {
  const { data } = useQuery<IOrderModel[]>({
    queryKey: ["orders"],
    queryFn: () => loadOrders(),
  });

  return (
    <div className={styles.content}>
      {data?.map((order) => (
        <Order key={order.id} order={order} />
      ))}
    </div>
  );
};
