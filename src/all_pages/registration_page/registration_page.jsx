import LoginForm from "../login_pages/login_Form/_loginForm";
import LoginMedium from "../login_pages/login_Medium/_loginMedium";
import LoginMethod from "../login_pages/login_Methods/_loginMethods";
import st from "./registration_page.module.scss";

function Registration_page() {
  return (
    <div>
      <div className={st.login_pages}>
      
        <LoginMedium />
        <LoginMethod props={{ title: "Создать профиль", color: "success" }} />
      </div>
    </div>
  );
}

export default Registration_page;
