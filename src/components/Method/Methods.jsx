import { useNavigate } from "react-router-dom";
import st from "./Methods.module.scss";

function LoginMethod(props) {
  const navigate = useNavigate();
  navigate("/");
  function sendGoggle() {
    localStorage.setItem("methodsRegistration", "Google");
    navigate("/methodsPage");
  }
  function sendYandex() {
    localStorage.setItem("methodsRegistration", "Yandex");
    navigate("/methodsPage");
  }
  function sendVK() {
    localStorage.setItem("methodsRegistration", "VK");
    navigate("/methodsPage");
  }

  return (
    <div className={st.pagesRight}>
      <h5>{props.title} с помощью</h5>
      <div className={st.buttons}>
        <button className={st.button} onClick={sendGoggle}>
          Google
        </button>
        <button className={st.button} onClick={sendYandex}>
          Яндекс
        </button>
        <button className={st.button} onClick={sendVK}>
          Вк
        </button>
      </div>
      <a href="#">{props.text}</a>
    </div>
  );
}

export default LoginMethod;
