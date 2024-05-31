import { useAuthContext } from "@/context/auth-context";
import { useCart } from "@/hooks/useCart";
import { IProductModel } from "@/interface/Product";
import { useMemo, useState } from "react";
import { BiCartAdd } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../HTMLDefault/Button";
import styles from "./styles.module.css";

interface ProductProps {
  product: IProductModel;
}

export const Product = ({ product }: ProductProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { addProduct } = useCart();
  const { user, cart } = useAuthContext();

  const handleAddProduct = async () => {
    try {
      setLoading(true);
      if (!user) {
        navigate("/login");
        toast("Você precisa estar logado para adicionar ao carrinho", {
          type: "error",
        });

        setLoading(false);
        return;
      }

      await addProduct(product, 1);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast("Erro ao adicionar produto ao carrinho", {
        type: "error",
      });
    }
  };

  const existsInCart = useMemo(() => {
    const exists = cart?.find((item) => item.stripe_product_id === product.id);
    console.log(exists);

    return exists;
  }, [cart]);

  return (
    <div className={styles.product}>
      <img
        src={
          product.images[0] ||
          "https://semantic-ui.com/images/wireframe/image.png"
        }
        loading="lazy"
      />
      <div className={styles.product_data}>
        <h1>{product.name}</h1>
        <p className={styles.description}>{product.description}</p>
        <p className={styles.value}>R${product.price.value.toFixed(2)}</p>
      </div>
      <Button onClick={handleAddProduct} btnType="primary" loading={loading}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            justifyContent: "center",
          }}
        >
          <BiCartAdd size={16} />
          Carrinho
          <span>{existsInCart ? `( ${existsInCart.quantity} )` : ""}</span>
        </div>
      </Button>
    </div>
  );
};
