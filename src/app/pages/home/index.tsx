import { ProductList } from "./components/ProductList";
import styles from "./styles.module.css";

export const HomeScreen = () => {
  return (
    <main className={styles.main}>
      <div className={styles.div}>
        <ProductList />
      </div>
    </main>
  );
};
