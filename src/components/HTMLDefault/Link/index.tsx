import { Link as ALink } from "react-router-dom";

import styles from "./styles.module.css";

interface LinkProps {
  to: string;
  children: string;
  style?: React.CSSProperties;
  className?: string;
}

export const Link = ({ to, children, style, className }: LinkProps) => {
  return (
    <ALink style={style} className={className || styles.link} to={to}>
      {children}
    </ALink>
  );
};
