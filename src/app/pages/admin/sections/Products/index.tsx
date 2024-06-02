import { CustomFile } from "@/components/HTMLDefault/Input";
import { Modal } from "@/components/Modal";
import { useForm } from "@/hooks/useForm";
import { IAddProductFieldsModel, IProductModel } from "@/interface/Product";
import { updateProductById } from "@/request/product/update-product-by-id";
import { useState } from "react";
import { Spinner } from "react-activity";
import { toast } from "react-toastify";
import { ProductForm } from "../Form";
import { ProductAdminSection } from "./Product";
import styles from "./styles.module.css";

interface ProductsListProps {
  data: IProductModel[] | undefined;
  isLoading: boolean;
  refetch: () => void;
}

export const ProductsList = ({
  data,
  isLoading,
  refetch,
}: ProductsListProps) => {
  const [product, setProduct] = useState<IProductModel | null>(null);
  const [loading, setLoading] = useState(false);
  const { fields, handleChange, setFields } = useForm<IAddProductFieldsModel>();
  const [fileList, setFileList] = useState<CustomFile[]>([]);

  const handleUpdate = async () => {
    if (!product) return;

    const newFields = {} as any;

    Object.keys(fields).forEach((key) => {
      const thisKey = key as keyof IAddProductFieldsModel;
      if (thisKey === "price") {
        if (fields[thisKey] !== product[thisKey].value) {
          newFields[thisKey] = fields[thisKey];
        }
        return;
      }

      if (thisKey === "brand") {
        if (fields[thisKey] !== product.metadata.brand) {
          newFields[thisKey] = fields[thisKey];
        }
        return;
      }

      if (fields[thisKey] !== product[thisKey]) {
        newFields[key] = fields[thisKey];
      }
    });

    if (Object.keys(newFields).length === 0) {
      toast.error("Nada foi alterado!");
      return;
    }

    try {
      setLoading(true);
      await updateProductById(product.id, newFields);
      await refetch();
      setLoading(false);
      setProduct(null);
      toast.success("Produto atualizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar produto!");
      setLoading(false);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <section className={styles.products_admin_list}>
      {data?.map((value) => (
        <ProductAdminSection product={value} setProduct={setProduct} />
      ))}
      <Modal
        isOpen={!!product}
        onClose={() => setProduct(null)}
        onOk={handleUpdate}
        loading={isLoading || loading}
      >
        <ProductForm
          data={data}
          product={product}
          fields={fields}
          handleChange={handleChange}
          setFields={setFields}
          loading={loading}
          fileList={fileList}
          setFileList={setFileList}
          onSubmit={handleUpdate}
        />
      </Modal>
    </section>
  );
};
