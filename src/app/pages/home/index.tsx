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

  const productsByCategory = () => {
    return data?.reduce((prev, product) => {
      product.metadata.categories.forEach((category) => {
        const findCategoryOnPrev = prev.find(
          (cat) => cat.category.toLowerCase() === category.toLowerCase()
        );

        if (findCategoryOnPrev) {
          findCategoryOnPrev.products.push(product);
        } else {
          prev.push({
            category,
            products: [product],
          });
        }
      });

      return prev;
    }, [] as { category: string; products: IProductModel[] }[]);
  };

  return (
    <main className={styles.main}>
      <div className={styles.div}>
        <Carousel products={data} timeToChange={7500} />
        {productsByCategory()?.map((category) => (
          <ProductList
            title={category.category}
            products={category.products}
            isLoading={isLoading}
          />
        ))}
      </div>
    </main>
  );
};
