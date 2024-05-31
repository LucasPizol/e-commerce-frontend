import { Spinner } from "react-activity";
import styles from "./styles.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btnType?: "primary" | "secondary" | "dashed" | "danger";
  loading?: boolean;
  divStyle?: React.CSSProperties;
}

const styleMap = {
  primary: styles.primary,
  secondary: styles.secondary,
  dashed: styles.dashed,
  danger: styles.danger,
};

export const Button = ({
  btnType = "secondary",
  loading = false,
  children,
  divStyle,
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={loading || props.disabled}
      {...props}
      className={`${styles.button} ${styleMap[btnType] || styles.secondary}`}
      style={loading ? { ...props.style, opacity: 0.8 } : { ...props.style }}
    >
      <div
        className={loading ? styles.loading : ""}
        style={
          loading
            ? {}
            : {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                ...divStyle,
              }
        }
      >
        <Spinner size={loading ? 10 : 0} style={{ transition: "0.5s" }} />
        {children}
      </div>
    </button>
  );
};
