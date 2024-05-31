import { useAuthContext } from "@/context/auth-context";
import { MdPerson, MdShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Button } from "../HTMLDefault/Button";
import { Link } from "../HTMLDefault/Link";
import styles from "./styles.module.css";

export const Header = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const { user, cart } = useAuthContext();

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.div}>
          <h1 className={styles.h1} onClick={() => navigate("/home")}>
            Header
          </h1>
          <nav>
            {user && (
              <div className={styles.auth_buttons}>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/profile")}
                >
                  <MdPerson style={{ cursor: "pointer" }} size={30} />
                </div>
                <div
                  style={{ cursor: "pointer", position: "relative" }}
                  onClick={() => navigate("/cart")}
                >
                  <MdShoppingCart style={{ cursor: "pointer" }} size={30} />
                  <span className={styles.item_count}>
                    {cart?.reduce((prev, item) => item.quantity + prev, 0)}
                  </span>
                </div>
              </div>
            )}

            {!user && (
              <div className={styles.buttons}>
                <Link style={{ color: "#fff" }} to={"/register"}>
                  Cadastrar
                </Link>
                <Button
                  onClick={() => navigate("/login")}
                  style={{
                    paddingLeft: 20,
                    paddingRight: 20,
                  }}
                >
                  Entrar
                </Button>
              </div>
            )}
          </nav>
        </div>
      </header>
      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
      <section className={styles.section}>{children}</section>
    </main>
  );
};
