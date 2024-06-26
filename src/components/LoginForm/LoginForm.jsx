import arrow from "./../../img/svg/arrows_button.svg";
import st from "./LoginForm.module.scss";
import { useForm } from "react-hook-form";
import Checkbox from "../Checkbox/Checkbox";
import Input from "../Input/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import axios from "axios";
import { loginURL } from "./../../constants/api";
//import { useAuth } from "../../utilities/router/useAuth";

const SignUpSchema = yup.object().shape({
  email: yup
    .string()
    .trim("The contact name cannot include leading and trailing spaces")
    .email("Введите верный email")
    .required("Обязательно"),
  password: yup
    .string()
    .min(4, "min 4")
    .required("Обязательно")
    .trim("The contact name cannot include leading and trailing spaces"),
});

export default function LoginForm(props) {
  const navigate = useNavigate();

  const location = useLocation();
  //const { signIn } = useAuth();

  const fromPage = location.state?.from?.pathname || "/";
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(SignUpSchema),
    mode: "all",
  });
  const [err, setErr] = useState("");

  const onSubmit = (event) => {
    axios
      .post(loginURL, {
        email: event.email,
        password: event.password,
      })
      .then(function (response) {
        if (response.status === 200) {
          // +1 день от текущей даты

          let date = new Date(Date.now() + 86400e3);
          date = date.toUTCString();
          document.cookie = `access=${response.data.access};max-age=3600`;
          document.cookie = `refresh=${response.data.refresh};max-age=${date}`;
          console.log("signIn");
          navigate(fromPage, { replace: true })
          //signIn(true, () => navigate(fromPage, { replace: true }));
          reset();
        }
      })
      .catch(function (error) {
        // signIn(error.response?.status);
        if (error.response?.status === 401) {
          reset();
          setErr("не вырный логин или пароль");
        }
      });
  };
  //
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
          fieldName="email"
          label="Логин"
          type="email"
        />
        <Input
          register={register}
          errors={errors}
          type="password"
          fieldName="password"
          label="Пароль"
        />
        <p>
          {err}
          <br />
          login: user1@example.com <br />
          Password: qwerty1234
        </p>
        <Checkbox />
      </div>
      <button disabled={!isValid} type="submit">
        Продолжить
      </button>
    </form>
  );
}
