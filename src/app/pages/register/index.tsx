import { Button } from "@/components/HTMLDefault/Button";
import { Form } from "@/components/HTMLDefault/Form";
import { Input, InputPassword } from "@/components/HTMLDefault/Input";
import { InputWrapper } from "@/components/HTMLDefault/InputWrapper";
import { Link } from "@/components/HTMLDefault/Link";
import { useAuthContext } from "@/context/auth-context";
import { useForm } from "@/hooks/useForm";
import { IAddUserModel } from "@/interface/User";
import styles from "./styles.module.css";

const initialValues = {
  email: "",
  name: "",
  document: "",
  phone: "",
  password: "",
  password_confirmation: "",
  username: "",
};

export const RegisterScreen = () => {
  const { fields, handleChange } = useForm<IAddUserModel>(initialValues);

  const { register, loading } = useAuthContext();

  const handleSubmit = async () => {
    if (!fields) return;
    try {
      await register(fields);
    } catch (error) {}
  };

  return (
    <main className={styles.main}>
      <Form onFinish={handleSubmit} className={styles.form}>
        <InputWrapper label="E-mail" required>
          <Input
            type="email"
            name="email"
            value={fields.email}
            onChange={handleChange}
            placeholder="exemplo@exemplo.com"
          />
        </InputWrapper>

        <InputWrapper label="Nome completo" required>
          <Input
            type="name"
            name="name"
            value={fields.name}
            onChange={handleChange}
            placeholder="John Doe"
          />
        </InputWrapper>

        <InputWrapper label="Nome de usuário" required>
          <Input
            type="username"
            name="username"
            value={fields.username}
            onChange={handleChange}
            placeholder="john.doe"
          />
        </InputWrapper>

        <InputWrapper label="CPF" required>
          <Input
            type="text"
            mask="999.999.999-99"
            name="document"
            value={fields.document}
            onChange={handleChange}
            placeholder="John Doe"
          />
        </InputWrapper>

        <InputWrapper label="Telefone" required>
          <Input
            type="phone"
            name="phone"
            mask="(99) 99999-9999"
            value={fields.phone}
            onChange={handleChange}
            placeholder="(99) 99999-9999"
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

        <InputWrapper label="Confirme sua senha" required>
          <InputPassword
            name="password_confirmation"
            value={fields.password_confirmation}
            onChange={handleChange}
            placeholder="********"
          />
        </InputWrapper>

        <Button loading={loading} btnType="primary" type="submit">
          Cadastrar
        </Button>
        <Link to="/login">Já tem cadastro? Clique aqui</Link>
      </Form>
    </main>
  );
};
