import st from "./loginMethods.module.scss";

function LoginMethod() {
  return (
    <div className={st.buttons}>
      <button>Google</button>
      <button>Вконтакте</button>
      <button>Яндекс.Почта</button>
    </div>
  );
}

export default LoginMethod;
