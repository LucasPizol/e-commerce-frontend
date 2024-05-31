import { LoadingPage } from "@/components/LoadingPage";
import { Product } from "@/components/Product";
import { useAuthContext } from "@/context/auth-context";
import { useApi } from "@/hooks/useApi";
import { IProductModel } from "@/interface/Product";
import styles from "./styles.module.css";

export const ProductList = () => {
  const { data, isLoading } = useApi<IProductModel[]>(
    "products-list",
    "/products"
  );

  const { loadingPage } = useAuthContext();

  if (isLoading || loadingPage) return <LoadingPage />;

  return (
    <div className={styles.product_list}>
      {data?.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};
