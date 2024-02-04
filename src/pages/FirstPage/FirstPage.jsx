import st from "./FirstPage.module.scss";
import iconSrc from "./../../img/svg/animation.svg";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

let width = document.body.clientWidth;
function First_page() {
  const navigate = useNavigate();
  navigate("/home");
  return (
    <>
      <div className={st.firstPage}>
        <motion.div
          initial={{ x: width / 2 }}
          animate={{ x: 0 }}
          transition={{ duration: 2 }}
          className={st.firstPage__leftWindow}
        >
          <div className={st.svg}>
            <img src={iconSrc} alt="" />
          </div>
        </motion.div>
        <div className={st.firstPage__rightWindow}>
          <section className={st.rightWindow__Form}>
            <h2>
              Добро пожаловать в Систему <br /> управления ресурсами
            </h2>
            <div className={st.form__buttons}>
              <div>
                <span>У Вас уже есть профиль?</span>
                <button
                  onClick={() => {
                    navigate("/login");
                  }}
                  className={st.button}
                >
                  Войти
                </button>
              </div>
              <div>
                <span>Еще не зарегистрированы?</span>
                <button
                  onClick={() => {
                    navigate("/registration");
                  }}
                  className={st.button}
                >
                  Зарегистрироваться
                </button>
              </div>
            </div>
            {/* <a href="#" className={st.a}>
              Продолжить без авторизации
            </a> */}
          </section>
        </div>
      </div>
    </>
  );
}

export default First_page;
