import { Button } from "@/components/HTMLDefault/Button";
import { IProductModel } from "@/interface/Product";
import { MdModeEditOutline } from "react-icons/md";
import styles from "./styles.module.css";

interface ProductProps {
  product: IProductModel;
  setProduct: React.Dispatch<React.SetStateAction<IProductModel | null>>;
}

export const ProductAdminSection = ({ product, setProduct }: ProductProps) => {
  const handleEdit = () => {
    setProduct(product);
  };

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
        <h1>{product.metadata.brand}</h1>
        <p className={styles.description}>{product.name}</p>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.footer}>
          <p className={styles.value}>R${product.price.value.toFixed(2)}</p>
          <Button
            btnType="primary"
            style={{ maxWidth: 40 }}
            onClick={handleEdit}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                justifyContent: "center",
              }}
            >
              <MdModeEditOutline size={16} />
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};
