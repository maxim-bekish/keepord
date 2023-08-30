import { TextField } from "@mui/material";
import st from "./Input.module.scss";

export default function Input({ register, fieldName, label, errors }) {
  return (
    <div>
      <TextField
        {...register(fieldName)}
        label={label}
  
        variant="outlined"
        className={st.inputForm}
        color="success"
        error={Boolean(errors[fieldName]?.message)}
      />
      {errors[fieldName] && (
        <p className={st.p}> {errors[fieldName].message}</p>
      )}
    </div>
  );
}
