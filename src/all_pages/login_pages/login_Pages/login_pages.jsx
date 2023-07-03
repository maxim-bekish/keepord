import LoginMethod from "../login_Methods/_loginMethods";
import LoginForm from "../login_Form/_loginForm";
import LoginMedium from "../login_Medium/_loginMedium";
import st from "./login_pages.module.scss";

function Login_pages() {
  return (
    <div className={st.login_pages}>
      <LoginForm />
      <LoginMedium />
      <LoginMethod props={{ titel: "Войти" }} />
    </div>
  );
}

export default Login_pages;
