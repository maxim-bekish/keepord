import arrow from "./../../img/svg/arrows_button.svg";
import st from "./LoginForm.module.scss";
import { useForm } from "react-hook-form";
import Checkbox from "../Checkbox/Checkbox";
import Input from "../Input/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { loginURL } from "./../../constants/api";
// import { useDispatch } from "react-redux";
import { singInAuth } from "./../../store/sliceAuth";
// import { useSelector } from "react-redux";
import { useContext } from "react";
import Context from "./../../utilities/Context/Context";
const SignUpSchema = yup.object().shape({
  email: yup
    .string()
    .trim("The contact name cannot include leading and trailing spaces")
    .email("Введите верный email")
    .required("Обязательно"),
  password: yup
    .string()
    // .matches('', "Is not in correct format")
    .min(4, "min 4")
    .required("Обязательно")
    .trim("The contact name cannot include leading and trailing spaces"),
});

export default function LoginForm(props) {
  const xxx = useContext(Context);

  // const dispatch = useDispatch();

  const navigation = useNavigate();
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
    console.log(event)
    axios
      .post(loginURL, {
        email: event.email,
        password: event.password,
      })
      .then(function (response) {
        if (response.status === 200) {
          localStorage.setItem("token", JSON.stringify(response.data.access));
          document.cookie = `refresh=${JSON.stringify(response.data.refresh)}`;

          reset();

          navigation("/home", { replace: true });
        }
      })
      .catch(function (error) {
        console.log(error);
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
