import styles from "./FirstPage.module.scss";
import iconSrc from "./../../img/svg/animation.svg";
import { motion } from "framer-motion";

let width = document.body.clientWidth;
function First_page() {
  return (
    <>
      <div className={styles.firstPage}>
        <motion.div
          initial={{ x: width / 2 }}
          animate={{ x: 0 }}
          transition={{ duration: 2 }}
          className={styles.firstPage__leftWindow}
        >
          <div className={styles.svg}>
            <img src={iconSrc} alt="" />
          </div>
        </motion.div>
        <div className={styles.firstPage__rightWindow}>
          <section className={styles.rightWindow__Form}>
            <h2>
              Добро пожаловать в Систему <br /> управления ресурсами
            </h2>
            <div className={styles.form__buttons}>
              <div>
                <span>У Вас уже есть профиль?</span>
                <a className={styles.aa} href="/login">
                  Войти
                </a>
              </div>
              <div>
                <span>Еще не зарегистрированы?</span>
                <a className={styles.aa} href="/registration">
                  Зарегистрироваться
                </a>
              </div>
            </div>
            <a href="#" className={styles.a}>
              Продолжить без авторизации
            </a>
          </section>
        </div>
      </div>
    </>
  );
}

export default First_page;
