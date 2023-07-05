import { TextField } from "@mui/material";
import arrow from "./../../../svg/arrows_button.svg";
import st from "./registration_form.module.scss";
import { useForm } from "react-hook-form";

import Checkbox from "../../_Checkbox";

let color = {
  green: "success",
  red: "warning",
};

export default function Registration_form(props) {
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

      <div className={st.form}>
        <div>
          <TextField
            {...register(props.props.database.name.key, {
              required: true,
              minLength: {
                value: props.props.database.name.value,
                message: props.props.database.name.message,
              },
            })}
            label={props.props.database.name.label}
            variant="outlined"
            className={st.inputForm}
            color={color.green} //сделать проверку to_do
            type="text"
          />

          {errors[props.props.database.name.key] && (
            <p className={st.p}>
              {errors[props.props.database.name.key].message}
            </p>
          )}
        </div>
        <div>
          <TextField
            {...register(props.props.database.email.key, {
              required: true,
              minLength: {
                value: props.props.database.email.value,
                message: props.props.database.email.message,
              },
            })}
            label={props.props.database.email.label}
            variant="outlined"
            className={st.inputForm}
            color={color.green} //сделать проверку to_do
            type="text"
          />

          {errors[props.props.database.email.key] && (
            <p className={st.p}>
              {errors[props.props.database.email.key].message}
            </p>
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
            color={color.green} //сделать проверку to_do
            type="text"
          />

          {errors[props.props.database.password.key] && (
            <p className={st.p}>
              {errors[props.props.database.password.key].message}
            </p>
          )}
        </div>
        <div>
          <TextField
            {...register(props.props.database.repeat_password.key, {
              required: true,
              minLength: {
                value: props.props.database.repeat_password.value,
                message: props.props.database.repeat_password.message,
              },
            })}
            label={props.props.database.repeat_password.label}
            variant="outlined"
            className={st.inputForm}
            color={color.green} //сделать проверку to_do
            type="text"
          />

          {errors[props.props.database.repeat_password.key] && (
            <p className={st.p}>
              {errors[props.props.database.repeat_password.key].message}
            </p>
          )}
        </div>
   
        {<Checkbox />}
      </div>
      <button disabled={!isValid} type="submit">
        Продолжить
      </button>
    </form>
  );
}

//  Registration_form;
