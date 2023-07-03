import LoginMethod from "./_loginMethods";
import st from "./login_pages.module.scss";

import LoginForm from "./_loginForm";

function Login_pages() {
  return (
    <div className={st.login_pages}>
      <LoginForm />
      <div className={st.pagesMedium}>
        <hr />
        <span>или</span>
        <hr />
      </div>
      <LoginMethod />
    </div>
  );
}

export default Login_pages;
