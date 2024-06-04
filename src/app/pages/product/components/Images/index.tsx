import { useMemo, useState } from "react";
import styles from "./styles.module.css";

interface ImagesProps {
  images: string[];
}

export const Images = ({ images }: ImagesProps) => {
  const [image, setImage] = useState<string>(images[0]);

  const imageContentType = useMemo(() => {
    if (images.length === 1)
      return (
        <img
          key="product-image"
          src={image}
          alt="Product image"
          loading="lazy"
          className={styles.product_main_image}
        />
      );

    if (images.length <= 4) {
      return (
        <section className={styles.product_images_section}>
          <div className={styles.product_small_image_section}>
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Product image"
                loading="lazy"
                className={
                  styles.product_small_image +
                  " " +
                  (img === image ? styles.active : "")
                }
                onClick={() => setImage(img)}
              />
            ))}
          </div>
          <img
            key="product-main-image"
            src={image}
            alt="Product image"
            loading="lazy"
            className={styles.product_main_image}
          />
        </section>
      );
    }
  }, [images, image]);

  return <div className="product-images">{imageContentType}</div>;
};
