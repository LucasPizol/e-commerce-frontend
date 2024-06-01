import { Carousel } from "@/components/Carousel";
import { IProductModel } from "@/interface/Product";
import { loadProducts } from "@/request/product/load-products";
import { useQuery } from "@tanstack/react-query";
import { ProductList } from "./components/ProductList";
import styles from "./styles.module.css";

export const HomeScreen = () => {
  const { data, isLoading } = useQuery<IProductModel[]>({
    queryKey: ["products-list"],
    queryFn: () => loadProducts(),
  });

  return (
    <main className={styles.main}>
      <div className={styles.div}>
        <Carousel products={data} timeToChange={7500} />
        <ProductList products={data} isLoading={isLoading} />
      </div>
    </main>
  );
};
