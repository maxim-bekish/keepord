import { TextField } from "@mui/material";
// import st from "./loginForm.module.scss";
import { useForm } from "react-hook-form";

let color = {
  green: "success",
  red: "warning",
};

function InputEnter({ formKey }) {
  const {
    register,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  return (
    <div>
      <TextField
        {...register(formKey, {
          required: true,
          minLength: {
            value: 5,
            message: "Нужно ввести минимум 5 символов",
          },
        })}
        label="Логин"
        variant="outlined"
        // className={st.inputForm}
        color={color.green} //сделать проверку to_do
        type="text"
      />

      {errors[formKey] && <p> {errors[formKey].message} </p>}
    </div>
  );
}

export default InputEnter;
