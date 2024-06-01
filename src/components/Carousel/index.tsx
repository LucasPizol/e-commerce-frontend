import { IProductModel } from "@/interface/Product";
import { useEffect, useState } from "react";
import { Button } from "../HTMLDefault/Button";
import styles from "./styles.module.css";

interface CarouselProps {
  products: IProductModel[] | undefined;
  timeToChange: number;
  showDots?: boolean;
  showArrows?: boolean;
}

export const Carousel = ({ products, timeToChange }: CarouselProps) => {
  const [productIndex, setProductIndex] = useState(0);
  const [reload, setReload] = useState(false);

  const filteredProducts = products?.filter((data) => data.metadata.carousel);

  useEffect(() => {
    if (filteredProducts) {
      const interval = setInterval(() => {
        setProductIndex((prev) => {
          if (prev === filteredProducts?.length - 1) return 0;
          return prev + 1;
        });
      }, timeToChange);

      return () => clearInterval(interval);
    }
  }, [products, reload]);

  return (
    <div className={styles.carousel}>
      <div
        className={styles.carousel_div}
        style={{ transform: `translateX(-${productIndex * 100}%)` }}
      >
        {filteredProducts?.map((product) => (
          <div className={styles.product_div}>
            <div className={styles.product_info}>
              <h2>{product.name}</h2>
              <p>{product.description}</p>

              <p className={styles.price}>
                Por apenas: R${product.price.value.toFixed(2)}
              </p>
              <Button
                btnType="secondary"
                style={{
                  maxWidth: 200,
                  marginTop: 16,
                  width: "100%",
                  background: "#e7ae87",
                  borderColor: "#e7ae87",
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                Comprar
              </Button>
            </div>

            <img src={product.images[0]} className={styles.product} />
          </div>
        ))}
      </div>
      <div className={styles.carousel_dots}>
        {Array.from({ length: filteredProducts?.length || 2 }, (_, index) => (
          <span
            key={index}
            onClick={() => {
              setProductIndex(index);
              setReload(!reload);
            }}
            className={
              index === productIndex
                ? `${styles.carousel_dot} ${styles.carousel_active}`
                : `${styles.carousel_dot}`
            }
          ></span>
        ))}
      </div>
    </div>
  );
};
