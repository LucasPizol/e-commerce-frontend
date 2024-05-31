import { Link as ALink } from "react-router-dom";

import styles from "./styles.module.css";

interface LinkProps {
  to: string;
  children: string;
  style?: React.CSSProperties;
}

export const Link = ({ to, children, style }: LinkProps) => {
  return (
    <ALink style={style} className={styles.link} to={to}>
      {children}
    </ALink>
  );
};
