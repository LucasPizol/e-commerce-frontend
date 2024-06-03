import { Form } from "@/components/HTMLDefault/Form";
import {
  CustomFile,
  Input,
  TextArea,
  Upload,
} from "@/components/HTMLDefault/Input";
import { InputWrapper } from "@/components/HTMLDefault/InputWrapper";
import { IAddProductFieldsModel, IProductModel } from "@/interface/Product";

import { Button } from "@/components/HTMLDefault/Button";
import { removeDuplicated } from "@/utils/remove-duplicated";
import { useEffect, useMemo } from "react";
import Select from "react-select";
import Creatable from "react-select/creatable";
import styles from "./styles.module.css";

interface IProductFormProps {
  product?: IProductModel | null;
  fields: IAddProductFieldsModel;
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  setFields: (fields: IAddProductFieldsModel) => void;

  onSubmit: () => Promise<void>;

  fileList: CustomFile[];
  setFileList: (fileList: CustomFile[]) => void;

  loading: boolean;

  data: IProductModel[] | undefined;
}

export const ProductForm = ({
  product,
  fields,
  setFields,
  handleChange,
  onSubmit,
  fileList,
  setFileList,
  loading,
  data,
}: IProductFormProps) => {
  useEffect(() => {
    if (product)
      setFields({
        name: product.name,
        description: product.description,
        price: product.price.value,
        brand: product.metadata.brand,
        categories: product.metadata.categories,
      });
  }, [product]);

  const metadataOptions = useMemo(() => {
    const formatArray = (array: string[]) => {
      return array.map((item) => ({ value: item, label: item }));
    };

    const brands = data?.map((product) => product.metadata.brand);
    const categories = data?.map((product) =>
      product.metadata.categories?.join(",")
    );

    if (!brands || !categories)
      return {
        brands: [],
        categories: [],
      };

    return {
      brands: formatArray(removeDuplicated(brands)),
      categories: formatArray(removeDuplicated(categories)),
    };
  }, [data]);

  return (
    <Form onFinish={onSubmit} className={styles.form}>
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
          style={{ height: "100%" }}
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
      <InputWrapper label="Marca" required>
        <Creatable
          styles={{ container: (provided) => ({ ...provided, width: "100%" }) }}
          options={metadataOptions.brands}
          value={{ value: fields.brand, label: fields.brand }}
          formatCreateLabel={(value) => `Criar ${value}`}
          placeholder="Selecione ou crie uma marca"
          onChange={(value) =>
            setFields({ ...fields, brand: String(value?.value) })
          }
        />
      </InputWrapper>
      <InputWrapper label="Categoria" required>
        <Select
          isMulti
          styles={{ container: (provided) => ({ ...provided, width: "100%" }) }}
          options={metadataOptions.categories}
          value={
            fields.categories?.map((category) => ({
              value: category,
              label: category,
            })) as any
          }
          placeholder="Selecione ou crie uma categoria"
          onChange={(value) =>
            setFields({
              ...fields,
              categories: value?.map((v) => String(v.value)) || [],
            })
          }
        />
      </InputWrapper>
      {!product && (
        <Button type="submit" btnType="primary" loading={loading}>
          Adicionar produto
        </Button>
      )}
    </Form>
  );
};
