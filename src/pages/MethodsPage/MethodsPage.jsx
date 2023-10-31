import st from "./MethodsPage.module.scss";
export default function methodsPage() {
  function send() {
    // to_do Отправить на регистрацию или на вход
  }
  let label = "";
  let url = "";
  switch (localStorage.getItem("methodsRegistration")) {
    case "Google":
      label = "Google";
      url = require("../../img/png/google.png");
      break;
    case "Yandex":
      label = "Yandex";
      url = require("../../img/png/yandex.png");
      break;
    case "VK":
      label = "vk";
      url = require("../../img/png/vk.png");
      break;
    default:
      label = "error";
      break;
  }
  return (
    <div className={st.container}>
      <img src={url} alt="logo" />
      <p className={st.text}>
        Для продолжения вы будете перенаправлены в аккаунт {label}
      </p>
      <button className={st.button} onClick={send}>
        Перейти сейчас
      </button>
    </div>
  );
}
