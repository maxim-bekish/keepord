import { TextField } from "@mui/material";
import st from "./loginForm.module.scss";
import { useForm } from "react-hook-form";
import InputEnter from "../../inputEnter";

let color = {
  green: "success",
  red: "warning",
};

function LoginForm(props) {
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
      <h2>{props.props.title}</h2>
      <div className={st.form}>
        <div>
          <TextField
            {...register("keyLogin", {
              required: true,
              minLength: {
                value: 5,
                message: "Нужно ввести минимум 5 символов",
              },
            })}
            label="Логин"
            variant="outlined"
            className={st.inputForm}
            color={color.green} //сделать проверку to_do
            type="text"
          />

          {errors?.keyLogin && (
            <p className={st.p}>{errors?.keyLogin.message}</p>
          )}
        </div>

        <div>
          <TextField
            {...register("keyPassword", {
              minLength: {
                value: 5,
                message: `Нужно ввести минимум 5 символов`,
              },
            })}
            variant="outlined"
            label="Пароль"
            className={st.inputForm}
            color={color.green}
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
