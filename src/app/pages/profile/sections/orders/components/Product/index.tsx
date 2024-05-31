import { IProductModel } from "@/interface/Product";
import styles from "./styles.module.css";

interface OrderProductProps {
  product: IProductModel & { quantity: number };
}

export const OrderProduct = ({ product }: OrderProductProps) => {
  return (
    <div className={styles.product}>
      <img
        src={
          product.images[0] ||
          "https://semantic-ui.com/images/wireframe/image.png"
        }
        alt={product.name}
      />
      <div className={styles.description}>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
      </div>
      <p>
        {product.quantity}x R${product.price.value.toFixed(2)}
      </p>
    </div>
  );
};
