import { Form } from "@/components/HTMLDefault/Form";
import {
  CustomFile,
  Input,
  TextArea,
  Upload,
} from "@/components/HTMLDefault/Input";
import { InputWrapper } from "@/components/HTMLDefault/InputWrapper";
import { useForm } from "@/hooks/useForm";
import { IAddProductModel } from "@/interface/Product";

import { Button } from "@/components/HTMLDefault/Button";
import { addProduct } from "@/request/product/add-product";
import { useState } from "react";
import { toast } from "react-toastify";
import styles from "./styles.module.css";

export const ProductForm = () => {
  const { fields, handleChange } = useForm<IAddProductModel>();
  const [fileList, setFileList] = useState<CustomFile[]>([]);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await addProduct(fields, fileList);
      toast.success("Produto adicionado com sucesso!");
    } catch (error) {
      toast.error("Erro ao adicionar produto!");
    }
    setLoading(false);
  };

  return (
    <Form onFinish={handleSubmit} className={styles.form}>
      <InputWrapper label="Nome do produto" required>
        <Input
          type="text"
          placeholder="Ex: Relógio"
          name="name"
          value={fields.name}
          onChange={handleChange}
        />
      </InputWrapper>
      <InputWrapper label="Descrição do produto" required>
        <TextArea
          placeholder="Relógio de pulso do material..."
          name="description"
          value={fields.description}
          onChange={handleChange}
        />
      </InputWrapper>
      <InputWrapper label="Preço" required>
        <Input
          type="number"
          placeholder="Ex: 49.90"
          step="0.01"
          name="price"
          value={fields.price}
          onChange={handleChange}
        />
      </InputWrapper>
      <Upload
        fileList={fileList}
        onRemove={(file) =>
          setFileList(fileList.filter((f) => f.uid !== file.uid))
        }
        changeEvent={(file) => setFileList([...fileList, file])}
      />
      <Button type="submit" btnType="primary" loading={loading}>
        Adicionar produto
      </Button>
    </Form>
  );
};
