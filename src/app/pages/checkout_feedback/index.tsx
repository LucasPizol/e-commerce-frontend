import { Button } from "@/components/HTMLDefault/Button";
import { useEffect, useMemo, useState } from "react";
import { MdCheckCircle, MdError } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

import { LoadingPage } from "@/components/LoadingPage";
import { useAuthContext } from "@/context/auth-context";
import { clearCart } from "@/request/cart/clear-cart";
import styles from "./styles.module.css";

export type CheckoutStatus = "success" | "error";

export const CheckoutFeedback = () => {
  const params = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const { setCart, loadingPage, user } = useAuthContext();

  const [status, setStatus] = useState<CheckoutStatus>();

  const token = useMemo((): string | null => {
    const searchParams = new URLSearchParams(params.search);

    if (searchParams.has("token")) {
      return searchParams.get("token");
    }

    return null;
  }, []);

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setLoading(false);
    }

    if (token && !loadingPage && user) {
      clearCart(token)
        .then(() => {
          setCart([]);
          setStatus("success");
        })
        .catch(() => setStatus("error"))
        .finally(() => setLoading(false));
    }
  }, [token, loadingPage, user]);

  if (loading || !status || loadingPage) return <LoadingPage />;

  if (status === "success" && token)
    return (
      <main className={styles.main}>
        <div className={styles.div}>
          <MdCheckCircle color="#a4dba4" size={100} />
          <h1>Compra aprovada</h1>
          <p>Agradecemos pela preferência</p>
          <Button btnType="primary" onClick={() => navigate("/home")}>
            Voltar para o início
          </Button>
        </div>
      </main>
    );

  if (status === "error") {
    return (
      <main className={styles.main}>
        <div className={styles.div}>
          <MdError color="#e76b6b" size={100} />
          <h1>Erro</h1>
          <p>Ocorreu um erro ao realizar sua compra</p>
          <Button btnType="primary" onClick={() => navigate("/home")}>
            Voltar para o início
          </Button>
        </div>
      </main>
    );
  }

  navigate("/home");
};
