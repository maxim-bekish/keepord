import arrow from "./../../../svg/arrows_button.svg";
import st from "./registration_form.module.scss";
import { useForm } from "react-hook-form";
import Checkbox from "../../_Checkbox";
import InputHelper from "../../_InputHelp";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function cod() {
  const now = new Date();
  return `${now.getFullYear()}.${now.getMonth()}.${now.getDate()}.${now.getHours()}.${now.getMinutes()}.${now.getSeconds()}`;
}
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

  const onSubmit = (data) => {
    data.cod = cod();
    console.log(data);

    reset();
  };
  // { console.log(props.database.name.key);}
  return (
    <form className={st.pagesLeft} onSubmit={handleSubmit(onSubmit)} action="#">
      <a className={st.down} href="/">
        <img src={arrow} alt="arrow" />
      </a>

      <h2>{props.title} профиль</h2>
      {/* {console.log(props.props.database)} */}
      <div className={st.form}>
        <InputHelper
          register={register}
          errors={errors}
          fieldName="firstName"
          label="Имя пользователя"
        />
        <InputHelper
          register={register}
          errors={errors}
          fieldName="login"
          label="Электронная почта"
        />
        <InputHelper
          register={register}
          errors={errors}
          fieldName="password"
          label="Пароль "
        />
        <InputHelper
          register={register}
          errors={errors}
          fieldName="confirmPassword"
          label="Подтверждение пароля "
        />
        {/* <div>
          <TextField
            {...register(props.database.name.key, {
              required: "Обязательное поле",
              minLength: {
                value: props.database.name.value,
                message: props.database.name.message,
              },
            })}
            label={props.database.name.label}
            variant="outlined"
            className={st.inputForm}
            color="success"
            aria-invalid={errors[props.database.name.key] ? "true" : "false"}
            error={Boolean(errors[props.database.name.key]?.message)}
          />
          {errors[props.database.name.key] && (
            <p className={st.p}>{errors[props.database.name.key].message}</p>
          )}
        </div>
        <div>
          <TextField
            {...register(props.database.email.key, {
              required: "Обязательное поле",
              minLength: {
                value: props.database.email.value,
                message: props.database.email.message,
              },
            })}
            label={props.database.email.label}
            variant="outlined"
            className={st.inputForm}
            color="success"
            aria-invalid={errors[props.database.email.key] ? "true" : "false"}
            error={Boolean(errors[props.database.email.key]?.message)}
          />
          {errors[props.database.email.key] && (
            <p className={st.p}>{errors[props.database.email.key].message}</p>
          )}
        </div>
        <div>
          <TextField
            {...register(props.database.password.key, {
              required: "Обязательное поле",
              minLength: {
                value: props.database.password.value,
                message: props.database.password.message,
              },
            })}
            label={props.database.password.label}
            variant="outlined"
            className={st.inputForm}
            color="success"
            aria-invalid={
              errors[props.database.password.key] ? "true" : "false"
            }
            error={Boolean(errors[props.database.password.key]?.message)}
          />
          {errors[props.database.password.key] && (
            <p className={st.p}>
              {errors[props.database.password.key].message}
            </p>
          )}
        </div>
        <div>
          <TextField
            {...register(props.database.repeat_password.key, {
              required: "Обязательное поле",
              minLength: {
                value: props.database.repeat_password.value,
                message: props.database.repeat_password.message,
              },
            })}
            label={props.database.repeat_password.label}
            variant="outlined"
            className={st.inputForm}
            color="success"
            aria-invalid={
              errors[props.database.repeat_password.key] ? "true" : "false"
            }
            error={Boolean(errors[props.database.repeat_password.key]?.message)}
          />
          {errors[props.database.repeat_password.key] && (
            <p className={st.p}>
              {errors[props.database.repeat_password.key].message}
            </p>
          )}
        </div> */}
        {<Checkbox />}
      </div>
      <button disabled={!isValid} type="submit">
        Продолжить
      </button>
    </form>
  );
}
