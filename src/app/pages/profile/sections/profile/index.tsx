import { Button } from "@/components/HTMLDefault/Button";
import { Form } from "@/components/HTMLDefault/Form";
import { Input, InputPassword } from "@/components/HTMLDefault/Input";
import { InputWrapper } from "@/components/HTMLDefault/InputWrapper";
import { useForm } from "@/hooks/useForm";
import { IUserModel } from "@/interface/User";
import { updateUser } from "@/request/user/update-user";
import { useState } from "react";
import { toast } from "react-toastify";
import styles from "./styles.module.css";

interface IProfileSectionProps {
  user: IUserModel;
}

export const ProfileSection = ({ user }: IProfileSectionProps) => {
  const [newFields, setNewFields] = useState<Partial<IUserModel>>({});

  const { fields, handleChange } = useForm<
    Partial<IUserModel & { confirm_password: string }>
  >({
    name: user.name,
    email: user.email,
    password: "",
    phone: user.phone,
    document: user.document,
    username: user.username,
    confirm_password: "",
  });

  const handleSubmit = async () => {
    try {
      await updateUser(newFields);
      toast.success("Informações atualizadas com sucesso");
    } catch (error) {
      toast.error("Erro ao atualizar informações");
    }
  };

  const handleChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFields((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    handleChange(e);
  };

  return (
    <div className={styles.content}>
      <h1>Seu perfil</h1>
      <span>Atualize suas informações</span>
      <Form onFinish={handleSubmit} className={styles.form}>
        <InputWrapper label="Nome Completo">
          <Input
            type="text"
            name="name"
            placeholder="John Doe"
            value={fields.name}
            onChange={handleChangeEvent}
          />
        </InputWrapper>
        <InputWrapper label="Email">
          <Input
            type="email"
            name="email"
            placeholder="exemplo@exemplo.com"
            value={fields.email}
            onChange={handleChangeEvent}
          />
        </InputWrapper>

        <InputWrapper label="Senha">
          <InputPassword
            name="password"
            placeholder="********"
            value={fields.password}
            onChange={handleChangeEvent}
          />
        </InputWrapper>

        <InputWrapper label="Confirmar senha">
          <InputPassword
            name="confirm_password"
            placeholder="********"
            value={fields.confirm_password}
            onChange={handleChangeEvent}
          />
        </InputWrapper>
        <Button btnType="primary" type="submit">
          Salvar
        </Button>
      </Form>
    </div>
  );
};
