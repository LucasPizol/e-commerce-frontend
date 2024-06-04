import { IProductModel } from "@/interface/Product";

interface DescriptionProps {
  product: IProductModel;
}

export const Description = ({ product }: DescriptionProps) => {
  return (
    <section>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </section>
  );
};
