import { IProductModel } from "@/interface/Product";
import { removeDuplicated } from "@/utils/remove-duplicated";
import { useMemo } from "react";
import styles from "./styles.module.css";

interface HomeFiltersProps {
  data: IProductModel[] | undefined;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

export const HomeFilters = ({ data, filter, setFilter }: HomeFiltersProps) => {
  const categories = useMemo(() => {
    const categories = data
      ?.map((product) => product.metadata.categories)
      .flat();

    if (!categories) return [];

    const uniqueCategories = removeDuplicated(categories);

    return uniqueCategories;
  }, [data]);

  return (
    <div className={styles.filters}>
      {categories?.map((category) => (
        <span
          style={
            filter.toLowerCase() === category.toLowerCase()
              ? { fontWeight: "bold" }
              : {}
          }
          onClick={() => {
            if (filter.toLowerCase() === category.toLowerCase())
              setFilter("all");
            else setFilter(category);
          }}
        >
          {category}
        </span>
      ))}
    </div>
  );
};
