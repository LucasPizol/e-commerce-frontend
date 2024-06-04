import { LoadingPage } from "@/components/LoadingPage";
import { IProductModel } from "@/interface/Product";
import { loadProducts } from "@/request/product/load-products";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Description } from "./components/Description";
import { Images } from "./components/Images";
import styles from "./styles.module.css";

export const ProductScreen = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery<IProductModel[]>({
    queryKey: ["product", id],
    queryFn: () => loadProducts([id!]),
  });

  if (!data || isLoading) return <LoadingPage />;

  return (
    <main className={styles.main}>
      <div className={styles.div}>
        <Images images={data[0].images} />
        <Description product={data[0]} />
      </div>
    </main>
  );
};
