import { IOrderModel } from "@/interface/Order";
import { OrderProduct } from "../Product";
import { Tag, TagStatus } from "../Tag";
import styles from "./styles.module.css";

interface OrderProps {
  order: IOrderModel;
}

export type FormattedOrderStatus = "Paga" | "Pendente" | "Não paga";
type FormattedPaymentMethod = "Cartão de crédito" | "Boleto bancário" | "PIX";

const orderStatusMap: {
  [key: string]: { status: FormattedOrderStatus; color: TagStatus };
} = {
  paid: { status: "Paga", color: "green" },
  pending: { status: "Pendente", color: "yellow" },
  unpaid: { status: "Não paga", color: "red" },
};

const paymentMethodsMap: {
  [key: string]: { method: FormattedPaymentMethod; color: TagStatus };
} = {
  card: { method: "Cartão de crédito", color: "yellow" },
  boleto: { method: "Boleto bancário", color: "purple" },
  pix: { method: "PIX", color: "green" },
};

export const Order = ({ order }: OrderProps) => {
  return (
    <div className={styles.div}>
      <header>
        <div className={styles.description}>
          <h1>Ordem #{order.id.slice(order.id.length - 4).toUpperCase()}</h1>
          <div className={styles.tags}>
            <Tag color={orderStatusMap[order.status].color}>
              {orderStatusMap[order.status].status}
            </Tag>
            {order.payment_method_types
              .filter((method) => method)
              .map((method) => (
                <Tag key={method} color={paymentMethodsMap[method].color}>
                  {paymentMethodsMap[method].method}
                </Tag>
              ))}
          </div>
        </div>

        <span></span>
        <p>R${order.amount_total.toFixed(2)}</p>
      </header>
      <section className={styles.products}>
        {order.products.map((product) => (
          <OrderProduct key={product.id} product={product} />
        ))}
      </section>
    </div>
  );
};
