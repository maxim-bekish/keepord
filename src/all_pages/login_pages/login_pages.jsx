import LoginMethod from "./_loginMethods";
import st from "./login_pages.module.scss";

function Login_pages() {
  return (
    <div className={st.login_pages}>
      <div className={st.pagesLeft}>
        <h2>Войти в профиль</h2>
        <form action="#">
          <input className={st.inputForm} placeholder="Логин" type="text" />
          <input className={st.inputForm} placeholder="Пароль" type="text" />
          <div>
            <input type="checkbox" name="Запомнить меня" />
            <span>Запомнить меня</span>
          </div>
        </form>
        <button>Продолжить</button>
      </div>
      <div className={st.pagesMedium}>
        <hr />
        <span>или</span>
        <hr />
      </div>
      <div className={st.pagesRight}>
        <h5>Войти с помощью</h5>
        <LoginMethod />
        <a href="#"> Еще не зарегестрированны?</a>
      </div>
    </div>
  );
}

export default Login_pages;
