import { Button } from "@/components/HTMLDefault/Button";
import { Form } from "@/components/HTMLDefault/Form";
import { Input, InputPassword } from "@/components/HTMLDefault/Input";
import { InputWrapper } from "@/components/HTMLDefault/InputWrapper";
import { Link } from "@/components/HTMLDefault/Link";
import { useAuthContext } from "@/context/auth-context";
import { useForm } from "@/hooks/useForm";
import { IAuthenticateUserModel } from "@/interface/User";
import styles from "./styles.module.css";

export const LoginScreen = () => {
  const { fields, handleChange } = useForm<IAuthenticateUserModel>({
    user_credential: "",
    password: "",
  });
  const { login, loading } = useAuthContext();

  const handleSubmit = async () => {
    if (!fields) return;
    try {
      await login(fields);
    } catch (error) {}
  };

  return (
    <main className={styles.main}>
      <Form onFinish={handleSubmit} className={styles.form}>
        <InputWrapper label="Nome de usuário ou e-mail" required>
          <Input
            type="text"
            name="user_credential"
            value={fields.user_credential}
            onChange={handleChange}
            placeholder="exemplo@exemplo.com"
          />
        </InputWrapper>

        <InputWrapper label="Senha" required>
          <InputPassword
            name="password"
            value={fields.password}
            onChange={handleChange}
            placeholder="********"
          />
        </InputWrapper>

        <Button loading={loading} btnType="primary" type="submit">
          Entrar
        </Button>
        <Link to="/register">Não tem cadastro? Clique aqui</Link>
      </Form>
    </main>
  );
};
