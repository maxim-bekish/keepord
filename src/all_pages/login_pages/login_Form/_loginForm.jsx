import { TextField } from "@mui/material";
import arrow from "./../../../svg/arrows_button.svg";
import st from "./loginForm.module.scss";
import { useForm } from "react-hook-form";
import Checkbox from "./../../_Checkbox";
import { useState } from "react";

function LoginForm(props) {
  let [colors, setColors] = useState("success");
  console.log(colors);
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: "all",
  });
  const onSubmit = (data) => {
    console.log(data);
    reset();
  };
  return (
    <form className={st.pagesLeft} onSubmit={handleSubmit(onSubmit)} action="#">
      <a className={st.down} href="/">
        <img src={arrow} alt="arrow" />
      </a>

      <h2>{props.props.title} профиль</h2>
      <div className={st.inputForm}>
        <div>
          <TextField
            {...register(props.props.database.login.key, {
              required: true,
              minLength: {
                value: props.props.database.login.value,
                message: props.props.database.login.message,
              },
            })}
            label={props.props.database.login.label}
            variant="outlined"
            className={st.inputForm}
            color={colors} //сделать проверку to_do
            type="text"
          />

          {errors[props.props.database.login.key] && (
            <>
              {() => setColors("warning")}
              <p className={st.p}>
                {errors[props.props.database.login.key].message}
              </p>
            </>
          )}
        </div>

        <div>
          <TextField
            {...register(props.props.database.password.key, {
              required: true,
              minLength: {
                value: props.props.database.password.value,
                message: props.props.database.password.message,
              },
            })}
            label={props.props.database.password.label}
            variant="outlined"
            className={st.inputForm}
            color={colors} //сделать проверку to_do
            type="text"
          />

          {errors[props.props.database.password.key] && (
            <p className={st.p}>
              {errors[props.props.database.password.key].message}
            </p>
          )}
        </div>
        <Checkbox />
      </div>
      <button disabled={!isValid} type="submit">
        Продолжить
      </button>
    </form>
  );
}

export default LoginForm;
