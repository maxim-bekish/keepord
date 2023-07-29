import st from "./Methods.module.scss";
function sendGoggle() {
  sessionStorage.setItem("test", "Google");
}
function sendYandex() {
  sessionStorage.setItem("test", "Yandex");
}
function sendVK() {
  sessionStorage.setItem("test", "VK");
}
function LoginMethod(props) {
  return (
    <div className={st.pagesRight}>
      <h5>{props.title} с помощью</h5>
      <div className={st.buttons}>
        <button onClick={sendGoggle}>
          <a href="/send">Google</a>
        </button>

        <button onClick={sendYandex}>
          <a href="/send">Яндекс</a>
        </button>

        <button onClick={sendVK}>
          <a href="/send">Вк</a>
        </button>
      </div>
      <a href="#">{props.text}</a>
    </div>
  );
}

export default LoginMethod;
