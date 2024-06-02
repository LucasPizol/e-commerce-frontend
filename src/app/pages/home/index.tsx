import { Carousel } from "@/components/Carousel";
import { IProductModel } from "@/interface/Product";
import { loadProducts } from "@/request/product/load-products";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { HomeFilters } from "./components/Filters";
import { ProductList } from "./components/ProductList";
import styles from "./styles.module.css";

export const HomeScreen = () => {
  const [filter, setFilter] = useState<string>("all");

  const { data, isLoading } = useQuery<IProductModel[]>({
    queryKey: ["products-list"],
    queryFn: () => loadProducts(),
  });

  return (
    <main className={styles.main}>
      <div className={styles.div}>
        <HomeFilters data={data} filter={filter} setFilter={setFilter} />
        <Carousel products={data} timeToChange={7500} />
        <ProductList
          products={
            filter === "all"
              ? data
              : data?.filter(
                  (product) =>
                    product.metadata.brand.toLowerCase() ===
                    filter.toLowerCase()
                )
          }
          isLoading={isLoading}
        />
      </div>
    </main>
  );
};
