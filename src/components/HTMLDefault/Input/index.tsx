import { sliceString } from "@/utils/slice-string";
import { useRef } from "react";
import { MdClose } from "react-icons/md";
import InputMask from "react-input-mask";
import { Button } from "../Button";
import styles from "./styles.module.css";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> {
  mask?: string;
}

interface TextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> {
  mask?: string;
}

export interface CustomFile extends File {
  preview: string;
  uid: string;
}

interface UploadProps extends Omit<InputProps, "type"> {
  changeEvent?: (files: CustomFile) => void;
  onRemove?: (file: CustomFile) => void;
  fileList?: CustomFile[];
}

export const Input = ({ mask, ...props }: InputProps) => {
  if (!mask) return <input {...props} className={styles.input} />;

  return <InputMask mask={mask} {...props} className={styles.input} />;
};

export const InputPassword = (props: Omit<InputProps, "type">) => {
  return <input {...props} type="password" className={styles.input} />;
};

export const TextArea = (props: TextAreaProps) => {
  return (
    <textarea
      {...props}
      style={{
        resize: "none",
        transition: "0.5s, height 0s",
        minHeight: "200px",
        ...props.style,
      }}
      className={styles.input}
    />
  );
};

export const Upload = (props: UploadProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.changeEvent) {
      const file = Array.from(e.target.files!)[0] as CustomFile;

      file.preview = URL.createObjectURL(file);
      file.uid = Math.random().toString(36).substring(7);

      props.changeEvent(file);
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div {...props}>
      <input
        type="file"
        onChange={handleChange}
        className={styles.input}
        style={{ display: "none" }}
        ref={fileInputRef}
      />
      <Button
        btnType="dashed"
        type="button"
        className={styles.uploadButton}
        onClick={() => fileInputRef.current?.click()}
      >
        Upload
      </Button>
      <div className={styles.upload_file_list}>
        {props.fileList &&
          props.fileList.map((file) => (
            <div key={file.name} className={styles.upload_file}>
              <MdClose
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (props.onRemove) props.onRemove(file);
                }}
              />
              <img src={file.preview} alt={file.name} />
              {sliceString(file.name, 40)}
            </div>
          ))}
      </div>
    </div>
  );
};
