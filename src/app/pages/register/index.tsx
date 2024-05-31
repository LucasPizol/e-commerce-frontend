import { Button } from "@/components/HTMLDefault/Button";
import { Form } from "@/components/HTMLDefault/Form";
import { Input, InputPassword } from "@/components/HTMLDefault/Input";
import { InputWrapper } from "@/components/HTMLDefault/InputWrapper";
import { Link } from "@/components/HTMLDefault/Link";
import { useAuthContext } from "@/context/auth-context";
import { useForm } from "@/hooks/useForm";
import { IAddUserModel } from "@/interface/User";
import { useMemo } from "react";
import { MdCheckCircle, MdError } from "react-icons/md";
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

interface ValidatePasswordFieldProps {
  validate: boolean;
  message: string;
}

const ValidatePasswordField = ({
  message,
  validate,
}: ValidatePasswordFieldProps) => {
  return (
    <div
      className={`${styles.check_information} ${
        validate ? styles.valid : styles.invalid
      }`}
    >
      {validate ? <MdCheckCircle /> : <MdError />} {message}
    </div>
  );
};

export const RegisterScreen = () => {
  const { fields, handleChange } = useForm<IAddUserModel>(initialValues);

  const { register, loading } = useAuthContext();

  const validatePassword = useMemo(() => {
    const hasEightCharacters = fields.password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(fields.password);
    const hasLowerCase = /[a-z]/.test(fields.password);
    const hasNumber = /[0-9]/.test(fields.password);
    const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
      fields.password
    );

    return {
      hasEightCharacters,
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      hasSpecialCharacter,
    };
  }, [fields.password]);

  const passwordMatch = useMemo(() => {
    if (!fields.password || !fields.password_confirmation) return false;

    return fields.password === fields.password_confirmation;
  }, [fields.password, fields.password_confirmation]);

  const handleSubmit = async () => {
    if (!fields) return;

    for (const validate in validatePassword) {
      const key = validate as keyof typeof validatePassword;

      if (!key) return;
    }

    if (!passwordMatch) return;

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
            placeholder="Ex: 999.999.999-99"
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

        <Button
          loading={loading}
          btnType="primary"
          type="submit"
          disabled={
            !validatePassword.hasEightCharacters ||
            !validatePassword.hasUpperCase ||
            !validatePassword.hasLowerCase ||
            !validatePassword.hasNumber ||
            !validatePassword.hasSpecialCharacter ||
            !passwordMatch
          }
        >
          Cadastrar
        </Button>
        <Link to="/login">Já tem cadastro? Clique aqui</Link>
      </Form>

      <div className={styles.validate_fields}>
        <ValidatePasswordField
          message="Sua senha deve conter ao menos 8 caracteres"
          validate={validatePassword.hasEightCharacters}
        />

        <ValidatePasswordField
          message="Sua senha deve conter ao menos uma letra maiúscula"
          validate={validatePassword.hasUpperCase}
        />

        <ValidatePasswordField
          message="Sua senha deve conter ao menos uma letra minúscula"
          validate={validatePassword.hasLowerCase}
        />

        <ValidatePasswordField
          message="Sua senha deve conter ao menos um número"
          validate={validatePassword.hasNumber}
        />
        <ValidatePasswordField
          message="Sua senha deve conter ao menos um caracter especial"
          validate={validatePassword.hasSpecialCharacter}
        />

        <ValidatePasswordField
          message="Suas senhas devem ser as mesmas"
          validate={passwordMatch}
        />
      </div>
    </main>
  );
};
