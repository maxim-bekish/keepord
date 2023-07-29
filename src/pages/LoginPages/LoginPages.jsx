import Method from "../../components/Method/Methods";
import LoginForm from "./../../components/LoginForm/LoginForm";

import st from "./LoginPages.module.scss";

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
      <div className={st.pagesMedium}>
        <hr />
        <span>или</span>
        <hr />
      </div>
      <Method title={"Войти"} text={" Еще не зарегестрированны?"} />
    </div>
  );
}

export default Login_pages;
