import { ScreenWithOptions } from "@/components/ScreenWithOptions";
import { MdPerson, MdShoppingCart } from "react-icons/md";
import { OrdersSection } from "./sections/orders";
import { ProfileSection } from "./sections/profile";

export const ProfileScreen = () => {
  return (
    <ScreenWithOptions
      defaultUrl="/profile"
      options={[
        {
          sectionName: "Perfil",
          sectionIcon: <MdPerson size={24} />,
          sectionComponent: <ProfileSection />,
          sectionUrl: "/profile",
        },
        {
          sectionName: "Pedidos",
          sectionIcon: <MdShoppingCart size={24} />,
          sectionComponent: <OrdersSection />,
          sectionUrl: "/profile",
        },
      ]}
    />
  );
};
