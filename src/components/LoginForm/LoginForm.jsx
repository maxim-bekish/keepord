import arrow from "./../../img/svg/arrows_button.svg";
import st from "./LoginForm.module.scss";
import { useForm } from "react-hook-form";
import Checkbox from "../Checkbox/Checkbox";
import Input from "../Input/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { axios } from "axios";
let url1 = "https://rms2022.pythonanywhere.com/users/api/token/";
// let url2 = "https://rms2022.pythonanywhere.com/users/sign_in/"; убрать
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
      .then((response) => response.json())
    
      .then((result) => console.log(result))

    // try {
    //   setErr("");
    // } catch (error) {
    //   setErr(``);
    // }

    // reset();
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
        <p>
          {err} <br />
          login: user1@example.com <br />
          Password:1234
        </p>
        <Checkbox />
      </div>
      <button disabled={!isValid} type="submit">
        Продолжить
      </button>
    </form>
  );
}
