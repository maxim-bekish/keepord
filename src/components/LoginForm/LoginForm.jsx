import arrow from "./../../img/svg/arrows_button.svg";
import st from "./LoginForm.module.scss";
import { useForm } from "react-hook-form";
import Checkbox from "../Checkbox/Checkbox";
import Input from "../Input/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import saveTokenSessionStorage from "./../../fun/saveTokenSessionStorage";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


let url = "https://rms2022.pythonanywhere.com/users/sign_in/";
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

    axios
      .post(url, {
        email: event.email,
        password: event.password,
      })
      .then(function (response) {
        if (response.status === 200) {
          reset();
          console.log(response);
          saveTokenSessionStorage(response.data);
          navigate("/home");
        }
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          reset();
          setErr("не вырный логин или пароль");
        }
      });
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
