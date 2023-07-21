import LoginMethod from "../login_Methods/_loginMethods";
import LoginForm from "../login_Form/_loginForm";
import LoginMedium from "../login_Medium/_loginMedium";
import st from "./login_pages.module.scss";
const database = {
  login: {
    key: "keyLogin",
    value: 5,
    message: "Нужно ввести минимум 5 символов",
    label: "Логин",
  },
  password: {
    key: "keyPassword",
    value: 8,
    message: "Нужно ввести минимум 8 символов",
    label: "Пароль",
  },
};
function Login_pages() {
  return (
    <div className={st.login_pages}>
      <LoginForm database={database} title={"Войти в"} />
      <LoginMedium />
      <LoginMethod props={{ title: "Войти" }} />
    </div>
  );
}

export default Login_pages;
