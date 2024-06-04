import logo from "@/assets/images/logo-jardim-secreto.png";
import { useAuthContext } from "@/context/auth-context";
import { MdAdminPanelSettings, MdPerson, MdShoppingCart } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Button } from "../HTMLDefault/Button";
import { Link } from "../HTMLDefault/Link";
import styles from "./styles.module.css";

export const Header = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const activeStyle = (path: string) => {
    if (location.pathname === path) return `${styles.link} ${styles.active}`;
    return styles.link;
  };

  const { user, cart } = useAuthContext();

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.div}>
          <div className={styles.logo} onClick={() => navigate("/home")}>
            <img src={logo} />
            <h1> Jardim secreto </h1>
          </div>
          <nav>
            <div className={styles.nav_left}>
              <Link to="/home" className={activeStyle("/home")}>
                Início
              </Link>
              <Link to="/products" className={activeStyle("/products")}>
                Produtos
              </Link>
            </div>
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

                {user.role === "admin" && (
                  <div
                    style={{ cursor: "pointer", position: "relative" }}
                    onClick={() => navigate("/admin")}
                  >
                    <MdAdminPanelSettings
                      style={{ cursor: "pointer" }}
                      color="orange"
                      size={30}
                    />
                  </div>
                )}
              </div>
            )}

            {!user && (
              <div className={styles.buttons}>
                <Link
                  style={{ color: "var(--primary-color)" }}
                  to={"/register"}
                >
                  Cadastrar
                </Link>
                <Button
                  btnType="primary"
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
      <ToastContainer
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        position="top-right"
        toastStyle={{
          boxShadow: "0 5px 25px 0px #00000029",
        }}
        style={{
          top: 120,
        }}
      />
      <section className={styles.section}>{children}</section>
    </main>
  );
};
