import InputMask from "react-input-mask";
import styles from "./styles.module.css";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> {
  mask?: string;
}

export const Input = ({ mask, ...props }: InputProps) => {
  if (!mask) return <input {...props} className={styles.input} />;

  return <InputMask mask={mask} {...props} className={styles.input} />;
};

export const InputPassword = (props: Omit<InputProps, "type">) => {
  return <input {...props} type="password" className={styles.input} />;
};
