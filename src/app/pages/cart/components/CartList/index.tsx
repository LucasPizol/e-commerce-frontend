import { Button } from "@/components/HTMLDefault/Button";
import { useAuthContext } from "@/context/auth-context";
import { createCheckout } from "@/request/checkout/create-checkout";
import { useState } from "react";
import { MdShoppingBag } from "react-icons/md";
import { toast } from "react-toastify";
import { CartProduct } from "../CartProduct";
import styles from "./styles.module.css";

export const CartList = () => {
  const { cart } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!cart) return;

    if (cart.length === 0) return toast.error("Seu carrinho está vazio");

    setLoading(true);

    try {
      const checkout = await createCheckout(cart);
      setLoading(false);

      window.location.href = checkout.url;
    } catch (error) {
      setLoading(false);
      toast.error("Erro ao finalizar compra");
    }
  };

  return (
    <div className={styles.cart_list}>
      <article>
        <div className={styles.cart_description}>
          <span className={styles.cart_description_product}>Produto</span>
          <span>Preço</span>
          <span></span>
          <span>Valor total</span>
        </div>

        {cart?.length === 0 && (
          <div
            style={{
              marginTop: 18,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 4,
            }}
          >
            <MdShoppingBag />
            <span style={{ marginTop: 3 }}>Seu carrinho está vazio</span>
          </div>
        )}
        {cart?.map((item) => {
          return <CartProduct toast={toast} key={item.id} cartItem={item} />;
        })}
      </article>
      <aside>
        <h2>Resumo</h2>
        <span>
          Total: R$
          {cart
            ?.reduce((acc, item) => acc + item.price.value * item.quantity, 0)
            .toFixed(2)}
        </span>

        <span>
          Itens: {cart?.reduce((acc, item) => acc + item.quantity, 0)}
        </span>
        <Button loading={loading} onClick={handleCheckout} btnType="primary">
          Finalizar compra
        </Button>
      </aside>
    </div>
  );
};
