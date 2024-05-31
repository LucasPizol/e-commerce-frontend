import { Button } from "@/components/HTMLDefault/Button";
import { useAuthContext } from "@/context/auth-context";
import { useEffect, useMemo, useState } from "react";
import { MdPerson, MdShoppingCart } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { OrdersSection } from "./sections/orders";
import { ProfileSection } from "./sections/profile";
import styles from "./styles.module.css";

type Sections = "profile" | "orders";

export const ProfileScreen = () => {
  const { user } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  const [section, setSection] = useState<Sections>();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    if (searchParams.has("section"))
      setSection(searchParams.get("section") as Sections);
    else navigate("/profile?section=profile");
  }, [location]);

  const sectionComponent = useMemo(() => {
    if (!user) return;

    if (section === "profile") return <ProfileSection user={user} />;
    if (section === "orders") return <OrdersSection />;
  }, [user, section]);

  return (
    <main className={styles.main}>
      <div className={styles.div}>
        <aside>
          <Button
            onClick={() => navigate("/profile?section=profile")}
            btnType={section === "profile" ? "primary" : "secondary"}
          >
            <MdPerson />
            Suas informações
          </Button>

          <Button
            onClick={() => navigate("/profile?section=orders")}
            btnType={section === "orders" ? "primary" : "secondary"}
          >
            <MdShoppingCart />
            Pedidos
          </Button>
        </aside>

        <section className={styles.section}>{sectionComponent}</section>
      </div>
    </main>
  );
};
