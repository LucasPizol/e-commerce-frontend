export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onFinish?: (e: React.FormEvent<HTMLFormElement>) => Promise<void> | void;
}

export const Form = ({ children, onFinish, ...props }: FormProps) => {
  return (
    <form
      {...props}
      onSubmit={async (e) => {
        e.preventDefault();
        if (onFinish) await onFinish(e);
      }}
    >
      {children}
    </form>
  );
};
