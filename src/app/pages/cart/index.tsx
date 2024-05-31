import { CartList } from "./components/CartList";
import styles from "./styles.module.css";
export const CartScreen = () => {
  return (
    <main className={styles.main}>
      <div className={styles.div}>
        <CartList />
      </div>
    </main>
  );
};
