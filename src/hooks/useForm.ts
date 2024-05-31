import { useState } from "react";

export const useForm = <T>(initialValues?: T) => {
  const [fields, setFields] = useState<T>(initialValues || ({} as T));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return { fields, handleChange, setFields };
};
