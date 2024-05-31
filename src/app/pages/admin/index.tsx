import { ScreenWithOptions } from "@/components/ScreenWithOptions";
import { FaBoxOpen } from "react-icons/fa6";
import { ProductForm } from "./sections/Form";

export const AdminScreen = () => {
  return (
    <ScreenWithOptions
      defaultUrl="/admin"
      options={[
        {
          sectionName: "Novo produto",
          sectionIcon: <FaBoxOpen size={24} />,
          sectionComponent: <ProductForm />,
          sectionUrl: "/profile",
        },
      ]}
    />
  );
};
