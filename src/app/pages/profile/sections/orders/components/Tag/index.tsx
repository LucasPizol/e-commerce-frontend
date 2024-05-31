import styles from "./styles.module.css";

export type TagStatus = "green" | "yellow" | "red" | "purple";

interface TagProps {
  color: TagStatus;
  children: string;
}

const statusColorMap: { [key in TagStatus]: string } = {
  green: styles.green,
  yellow: styles.yellow,
  red: styles.red,
  purple: styles.purple,
};

export const Tag = ({ color, children }: TagProps) => {
  return (
    <div className={`${styles.tag} ${statusColorMap[color]}`}>
      <span>{children}</span>
    </div>
  );
};
