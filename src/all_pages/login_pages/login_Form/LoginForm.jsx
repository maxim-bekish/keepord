import arrow from "./../../../svg/arrows_button.svg";
import st from "./loginForm.module.scss";
import { useForm } from "react-hook-form";
import Checkbox from "../../Checkbox";
import InputHelper from "../../InputHelp";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const SignUpSchema = yup.object().shape({
  login: yup.string().email("Введите верный email").required("Обязательно"),
  password: yup.string().min(5, "min 5").required("Обязательно"),
});
export default function LoginForm(props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(SignUpSchema),
    mode: "all",
  });

  const onSubmit = (data) => {
    console.log(data);

    reset();
  };

  return (
    <form className={st.pagesLeft} onSubmit={handleSubmit(onSubmit)}>
      <a className={st.down} href="/">
        <img src={arrow} alt="arrow" />
      </a>

      <h2>{props.title} профиль</h2>

      <div className={st.form}>
        <InputHelper
          register={register}
          errors={errors}
          fieldName="login"
          label="Логин"
        />
        <InputHelper
          register={register}
          errors={errors}
          type="password"
          fieldName="password"
          label="Пароль"
        />

        <Checkbox />
      </div>
      <button disabled={!isValid} type="submit">
        Продолжить
      </button>
    </form>
  );
}
