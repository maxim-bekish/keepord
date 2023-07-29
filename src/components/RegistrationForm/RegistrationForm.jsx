import arrow from "./../../img/svg/arrows_button.svg";
import st from "./registration_form.module.scss";
import { useForm } from "react-hook-form";
import Checkbox from "../Checkbox/Checkbox";
import Input from "../Input/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const SignUpSchema = yup.object().shape({
  firstName: yup.string().min(5, "min 5").required("Обязательно"),
  login: yup.string().email("Введите верный email").required("Обязательно"),
  password: yup.string().min(5, "min 5").required("Обязательно"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Не верный пароль")
    .required("Обязательно"),
});
export default function Registration_form(props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(SignUpSchema),
    mode: "all",
  });
  const navigate = useNavigate();
  const onSubmit = (data) => {
    console.log(data);
    navigate("/home");
    reset();
  };
  return (
    <form className={st.pagesLeft} onSubmit={handleSubmit(onSubmit)}>
      <a className={st.down} href="/">
        <img src={arrow} alt="arrow" />
      </a>
      <h2>{props.title} профиль</h2>
      <div className={st.form}>
        <Input
          register={register}
          errors={errors}
          fieldName="firstName"
          label="Имя пользователя"
        />
        <Input
          register={register}
          errors={errors}
          fieldName="login"
          label="Электронная почта"
        />
        <Input
          register={register}
          errors={errors}
          fieldName="password"
          label="Пароль "
        />
        <Input
          register={register}
          errors={errors}
          fieldName="confirmPassword"
          label="Подтверждение пароля "
        />

        <Checkbox />
      </div>
      <button disabled={!isValid} type="submit">
        Продолжить
      </button>
    </form>
  );
}
