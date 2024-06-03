import { CustomFile } from "@/components/HTMLDefault/Input";
import { ScreenWithOptions } from "@/components/ScreenWithOptions";
import { useForm } from "@/hooks/useForm";
import { IAddProductFieldsModel } from "@/interface/Product";
import { addProduct } from "@/request/product/add-product";
import { loadProducts } from "@/request/product/load-products";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { FaBoxOpen } from "react-icons/fa6";
import { toast } from "react-toastify";
import { ProductForm } from "./sections/Form";
import { ProductsList } from "./sections/Products";

export const AdminScreen = () => {
  const { fields, handleChange, setFields } = useForm<IAddProductFieldsModel>();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<CustomFile[]>([]);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["products-list"],
    queryFn: () => loadProducts(),
  });

  const handleSubmit = async () => {
    try {
      const addProductFields = {
        name: fields.name,
        description: fields.description,
        price: fields.price,
        metadata: {
          brand: fields.brand,
        },
      };

      setLoading(true);
      await addProduct(addProductFields, fileList);
      toast.success("Produto adicionado com sucesso!");
      setFields({} as IAddProductFieldsModel);
      setFileList([]);
    } catch (error) {
      toast.error("Erro ao adicionar produto!");
    }
    setLoading(false);
  };

  const options = useMemo(() => {
    return [
      {
        sectionName: "Novo produto",
        sectionIcon: <FaBoxOpen size={24} />,
        sectionComponent: (
          <ProductForm
            data={data}
            fields={fields}
            handleChange={handleChange}
            setFields={setFields}
            onSubmit={handleSubmit}
            loading={loading}
            fileList={fileList}
            setFileList={setFileList}
          />
        ),
        sectionUrl: "/profile",
      },
      {
        sectionName: "Produtos",
        sectionIcon: <FaBoxOpen size={24} />,
        sectionComponent: (
          <ProductsList data={data} isLoading={isLoading} refetch={refetch} />
        ),
        sectionUrl: "/profile",
      },
    ];
  }, [data, fileList, fields, loading]);

  return <ScreenWithOptions defaultUrl="/admin" options={options} />;
};
