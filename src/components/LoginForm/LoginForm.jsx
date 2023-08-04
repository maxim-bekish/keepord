import arrow from "./../../img/svg/arrows_button.svg";
import st from "./LoginForm.module.scss";
import { useForm } from "react-hook-form";
import Checkbox from "../Checkbox/Checkbox";
import Input from "../Input/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
let url1 = "https://rms2022.pythonanywhere.com/users/api/token/";
let url2 = "https://rms2022.pythonanywhere.com/users/sign_in/";
const SignUpSchema = yup.object().shape({
  email: yup.string().email("Введите верный email").required("Обязательно"),
  password: yup.string().min(4, "min 4").required("Обязательно"),
});

export default function LoginForm(props) {
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
  const navigate = useNavigate();
  const onSubmit = (event) => {
    fetch(url1, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(event),
    })
      .then((response) => {
        try {
          return response.json();
        } catch (err) {
          console.log(err + "err");
        }
      })
      .then((result) => {
        if (result.access === undefined) {
          setErr("не верные логин или пароль данные");
          document.cookie = "access= ; expires=-1";
          document.cookie = "refresh= ; expires=-1";
        } else {
          navigate("/home");
          setErr("");
          document.cookie = `access = ${result.access}`;
          document.cookie = `refresh = ${result.refresh}`;
        }
      });

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
          fieldName="email"
          label="Логин"
          err={err}
        />
        <Input
          register={register}
          errors={errors}
          type="password"
          fieldName="password"
          label="Пароль"
        />
        <p>{err}</p>
        <Checkbox />
      </div>
      <button disabled={!isValid} type="submit">
        Продолжить
      </button>
    </form>
  );
}
