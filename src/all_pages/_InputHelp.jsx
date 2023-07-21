import { TextField } from "@mui/material";
import st from "./../all_pages/inputHelper.module.scss";

export default function InputHelper({
  register,
  fieldName,
  label,
  errors,
  minValue,
  errorMessage,
}) {
  // const { field } = useController(props);

  return (
    <div>
      <TextField
        {...register(fieldName, {
          minLength: {
            value: minValue,
            message: errorMessage,
          },
        })}
        label={label}
        variant="outlined"
        className={st.inputForm}
        color="success"
        error={Boolean(errors[fieldName]?.message)}
      />
      {errors[fieldName] && <p className={st.p}>{errors[fieldName].message}</p>}
    </div>
  );
}
