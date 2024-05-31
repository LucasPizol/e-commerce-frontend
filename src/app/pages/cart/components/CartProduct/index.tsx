import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useCart } from "@/hooks/useCart";
import { ICartModelWithAggregation } from "@/interface/Cart";
import { sliceString } from "@/utils/slice-string";
import { BiMinus, BiPlus } from "react-icons/bi";
import { Id, ToastContent, ToastOptions } from "react-toastify";
import styles from "./styles.module.css";

interface CartProductProps {
  cartItem: ICartModelWithAggregation;
  toast: (content: ToastContent, options?: ToastOptions) => Id;
}

export const CartProduct = ({ cartItem, toast }: CartProductProps) => {
  const { incrementProduct, decrementProduct, deleteProduct } = useCart();

  const { breakpoint } = useBreakpoint();

  const handleDecrementProduct = async () => {
    try {
      if (cartItem.quantity === 1) {
        await deleteProduct(cartItem.id);
        toast("Produto removido do carrinho", {
          autoClose: 2000,
          type: "success",
        });
        return;
      }

      await decrementProduct(cartItem.id);
    } catch (error) {}
  };

  if (breakpoint === "mobile") {
    return (
      <div className={styles.cart_product} style={{ padding: 4 }}>
        <div className={styles.cart_product_info}>
          <img
            src={
              cartItem.images[0] ||
              "https://semantic-ui.com/images/wireframe/image.png"
            }
            alt={cartItem.name}
            style={{ width: 100, height: 100 }}
          />
          <div className={styles.cart_product_description} style={{ gap: 12 }}>
            <div>
              <h3>{cartItem.name}</h3>
              <p>{sliceString(cartItem.description, 80)}</p>
            </div>

            <span className={styles.cart_value} style={{ textAlign: "start" }}>
              R${cartItem.price.value.toFixed(2)} x {cartItem.quantity}
            </span>
          </div>
          <div
            className={styles.cart_modifiers}
            style={{ justifyContent: "flex-end" }}
          >
            <div
              className={styles.cart_modifier}
              style={{ flexDirection: "column", minWidth: "0" }}
            >
              <button onClick={() => incrementProduct(cartItem.id)}>
                <BiPlus />
              </button>
              <span>{cartItem.quantity}</span>
              <button onClick={() => handleDecrementProduct()}>
                <BiMinus />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cart_product}>
      <div className={styles.cart_product_info}>
        <img
          src={
            cartItem.images[0] ||
            "https://semantic-ui.com/images/wireframe/image.png"
          }
          alt={cartItem.name}
        />
        <div className={styles.cart_product_description}>
          <h3>{cartItem.name}</h3>
          <p>{sliceString(cartItem.description, 160)}</p>
        </div>
      </div>
      <p className={styles.cart_value}>R${cartItem.price.value.toFixed(2)}</p>
      <div className={styles.cart_modifiers}>
        <div className={styles.cart_modifier}>
          <button onClick={() => incrementProduct(cartItem.id)}>
            <BiPlus />
          </button>
          <span>{cartItem.quantity}</span>
          <button onClick={() => handleDecrementProduct()}>
            <BiMinus />
          </button>
        </div>
      </div>
      <div className={styles.cart_total_value}>
        <span>R${(cartItem.price.value * cartItem.quantity).toFixed(2)}</span>
      </div>
    </div>
  );
};
