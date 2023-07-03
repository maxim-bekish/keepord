import st from "./loginMethods.module.scss";

function LoginMethod() {
  return (
    <div className={st.pagesRight}>
      <h5>Войти с помощью</h5>
      <div className={st.buttons}>
        <button>
          <a href="#">Google</a>
        </button>
        <button>
          <a href="#">Вконтакте</a>
        </button>
        <button>
          <a href="#">Яндекс.Почта</a>
        </button>
      </div>
      <a href="#"> Еще не зарегестрированны?</a>
    </div>
  );
}

export default LoginMethod;
