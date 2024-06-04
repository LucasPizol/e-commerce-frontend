import { IProductModel } from "@/interface/Product";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

interface ProductProps {
  product: IProductModel;
}

export const Product = ({ product }: ProductProps) => {
  const navigate = useNavigate();

  // const handleAddProduct = async () => {
  //   try {
  //     setLoading(true);
  //     if (!user) {
  //       navigate("/login");
  //       toast("Você precisa estar logado para adicionar ao carrinho", {
  //         type: "error",
  //       });

  //       setLoading(false);
  //       return;
  //     }

  //     await addProduct(product, 1);
  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //     toast("Erro ao adicionar produto ao carrinho", {
  //       type: "error",
  //     });
  //   }
  // };

  // const existsInCart = useMemo(() => {
  //   const exists = cart?.find((item) => item.stripe_product_id === product.id);
  //   return exists;
  // }, [cart]);

  return (
    <div
      className={styles.product}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className={styles.image_div}>
        <img
          src={
            product.images[0] ||
            "https://semantic-ui.com/images/wireframe/image.png"
          }
          loading="lazy"
        />
        <div className={styles.image_overflow}></div>
      </div>

      <div className={styles.product_data}>
        <h1>{product.metadata.brand}</h1>
        <p className={styles.description}>{product.name}</p>
        <p className={styles.value}>R${product.price.value.toFixed(2)}</p>
      </div>
    </div>
  );
};
