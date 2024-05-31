import { cloneElement } from "react";
import styles from "./styles.module.css";

interface InputWrapperProps {
  label: string;
  required?: boolean;
  children: JSX.Element;
}

export const InputWrapper = ({
  label,
  required = false,
  children,
}: InputWrapperProps) => {
  return (
    <div className={styles.div}>
      <label className={styles.label}>
        {label}
        {required && <span>*</span>}
      </label>
      {cloneElement(children, { required: required })}
    </div>
  );
};
