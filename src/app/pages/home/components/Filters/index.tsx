import { IProductModel } from "@/interface/Product";
import { useMemo } from "react";
import styles from "./styles.module.css";

interface HomeFiltersProps {
  data: IProductModel[] | undefined;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

export const HomeFilters = ({ data, filter, setFilter }: HomeFiltersProps) => {
  const brands = useMemo(() => {
    const brands = data?.map((product) => product.metadata.brand);

    return Array.from(new Set(brands));
  }, [data]);

  return (
    <div className={styles.filters}>
      {brands?.map((brand) => (
        <span
          style={
            filter.toLowerCase() === brand.toLowerCase()
              ? { fontWeight: "bold" }
              : {}
          }
          onClick={() => {
            if (filter.toLowerCase() === brand.toLowerCase()) setFilter("all");
            else setFilter(brand);
          }}
        >
          {brand}
        </span>
      ))}
    </div>
  );
};
