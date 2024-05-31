import { IOrderModel } from "@/interface/Order";
import { loadOrders } from "@/request/orders/load-orders";
import { useQuery } from "@tanstack/react-query";

import { Spinner } from "react-activity";
import { Order } from "./components/Order";
import styles from "./styles.module.css";

export const OrdersSection = () => {
  const { data, isLoading } = useQuery<IOrderModel[]>({
    queryKey: ["orders"],
    queryFn: () => loadOrders(),
  });
  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          marginTop: 18,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Spinner size={30} />
      </div>
    );

  return (
    <div className={styles.content}>
      {data?.map((order) => (
        <Order key={order.id} order={order} />
      ))}
    </div>
  );
};
