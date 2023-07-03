import { TextField } from "@mui/material";
import st from "./loginForm.module.scss";
import { useForm } from "react-hook-form";
import { warning } from "framer-motion";
let color = {
  green: "success",
  red: "warning",
};
let x = true;

function LoginForm() {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onBlur",
  });
  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <form className={st.pagesLeft} onSubmit={handleSubmit(onSubmit)} action="#">
      <h2>Войти в профиль</h2>
      <div className={st.form}>
        <div >
          <TextField
            {...register("keyLogin", {
              required: "Заполните поля",
              minLength: {
                value: 5,
                message: `Нужно ввести минимум 5 символов`,
                x: "true",
              },
            })}
            id="www"
            label="Логин"
            variant="outlined"
            className={st.inputForm}
            color={x ? color.green : color.red} //сделать проверку to_do
            type="text"
          />

          {errors?.keyLogin && (
            <p className={st.p}>{errors?.keyLogin?.message}</p>
          )}
        </div>
        <div>
          <TextField
            {...register("keyPassword", {
              required: "Заполните поля",
              minLength: {
                value: 5,
                message: `Нужно ввести минимум 5 символов`,
                x: "true",
              },
            })}
            variant="outlined"
            label="Пароль"
            className={st.inputForm}
            color={x ? color.green : color.red}
            type="text"
          />
          {errors?.keyPassword && (
            <p className={st.p}>{errors?.keyPassword?.message}</p>
          )}
        </div>
        <div>
          <input type="checkbox" />
          <span>Запомнить меня</span>
        </div>
      </div>
      <button disabled={!isValid} type="submit">
        Продолжить
      </button>
    </form>
  );
}

export default LoginForm;
