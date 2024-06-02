import { Button } from "../HTMLDefault/Button";
import styles from "./styles.module.css";

interface IModalProps {
  isOpen: boolean;
  onClose: () => void | Promise<void>;
  onOk: () => void | Promise<void>;
  children: JSX.Element;
  loading?: boolean;
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  loading,
  onOk,
}: IModalProps) => {
  return (
    <div
      className={
        isOpen
          ? `${styles.modal_container} ${styles.modal_open}`
          : styles.modal_container
      }
    >
      <div className={styles.modal_background} onClick={onClose}></div>
      <div className={styles.modal_body} onClick={() => {}}>
        {children}
        <footer>
          <Button btnType="secondary" onClick={onClose} loading={loading}>
            Fechar
          </Button>
          <Button btnType="primary" onClick={onOk} loading={loading}>
            Salvar
          </Button>
        </footer>
      </div>
    </div>
  );
};
