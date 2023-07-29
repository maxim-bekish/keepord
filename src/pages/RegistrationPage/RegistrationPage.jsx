import RegistrationForm from "./../../components/RegistrationForm/RegistrationForm";
import Method from "../../components/Method/Methods";
import st from "./RegistrationPage.module.scss";
const database = {
  name: {
    key: "keyName",
    value: 2,
    message: "Нужно ввести минимум 2 символов",
    label: "Имя пользователя",
  },
  email: {
    key: "keyEmail",
    value: 5,
    message: "Нужно ввести минимум 5 символов",
    label: "Электронная почта",
  },
  password: {
    key: "keyPassword",
    value: 8,
    message: "Нужно ввести минимум 8 символов",
    label: "Пароль",
  },
  repeat_password: {
    key: "keyRepeat_password",
    value: 8,
    message: "Нужно ввести минимум 8 символов",
    label: "Повтор пароля",
  },
};
function Registration_page() {
  return (
    <div className={st.registration_form_wrapper}>
      <div className={st.registration_form}>
        <RegistrationForm database={database} title={"Создать"} />
        <div className={st.pagesMedium}>
          <hr />
          <span>или</span>
          <hr />
        </div>
        <Method
          title={"Создать профиль"}
          text={"У вас уже есть профиль на сайте?"}
        />
      </div>
    </div>
  );
}

export default Registration_page;
