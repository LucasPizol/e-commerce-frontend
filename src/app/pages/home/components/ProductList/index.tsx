import { LoadingPage } from "@/components/LoadingPage";
import { Product } from "@/components/Product";
import { useAuthContext } from "@/context/auth-context";
import { IProductModel } from "@/interface/Product";
import styles from "./styles.module.css";

interface ProductListProps {
  products: IProductModel[] | undefined;
  isLoading: boolean;
}

export const ProductList = ({ products, isLoading }: ProductListProps) => {
  const { loadingPage } = useAuthContext();

  if (isLoading || loadingPage) return <LoadingPage />;

  return (
    <div className={styles.product_list}>
      {products?.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};
