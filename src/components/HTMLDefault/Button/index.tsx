import { Spinner } from "react-activity";
import styles from "./styles.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btnType?: "primary" | "secondary" | "dashed";
  loading?: boolean;
}

const styleMap = {
  primary: styles.primary,
  secondary: styles.secondary,
  dashed: styles.dashed,
};

export const Button = ({
  btnType = "secondary",
  loading = false,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={loading}
      {...props}
      style={loading ? { ...props.style, opacity: 0.8 } : { ...props.style }}
      className={styleMap[btnType] || styles.secondary}
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
              }
        }
      >
        <Spinner size={loading ? 10 : 0} style={{ transition: "0.5s" }} />
        {children}
      </div>
    </button>
  );
};
