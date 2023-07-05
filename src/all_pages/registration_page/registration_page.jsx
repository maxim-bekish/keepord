import RegistrationForm from "./registration_form/_Registration_Form";
import LoginMedium from "../login_pages/login_Medium/_loginMedium";
import LoginMethod from "../login_pages/login_Methods/_loginMethods";
import st from "./registration_page.module.scss";
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
        <RegistrationForm
          props={{
            database,
            title: "Создать",
          }}
        />
        <LoginMedium />
        <LoginMethod props={{ title: "Создать профиль" }} />
      </div>
    </div>
  );
}

export default Registration_page;
