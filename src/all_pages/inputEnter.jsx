import { TextField } from "@mui/material";

// import { useForm } from "react-hook-form";

// let color = {
//   green: "success",
//   red: "warning",
// };

function InputEnter(props) {
  // let x=props.props.key
  // console.log(x)
  // const {
  //   register,
  //   formState: { errors },
  // } = useForm({
  //   mode: "all",
  // });

  return (
    // <div>
    //   <TextField
    //     {...register(x, {
    //       required: true,
    //       minLength: {
    //         value: 5,
    //         message: "Нужно ввести минимум 5 символов",
    //       },
    //     })}
    //     label="Логин"
    //     variant="outlined"
    //     className={st.inputForm}
    //     color="success" //сделать проверку to_do
    //   />
    //   {errors?.x && <p>{errors?.x.message}</p>}
    // </div>
    <div>
      <input type="login" className="input" placeholder="Login" id="input" />
    </div>
  );
}

export default InputEnter;
