import styles from "./first_page.module.scss";
import { HandySvg } from "handy-svg";
import iconSrc from "./../../svg/animation.svg";
import { motion } from "framer-motion";
let width = document.body.clientWidth;
function First_page() {
  return (
    <div className={styles.firstPage}>
      <motion.div
        initial={{ x: width / 2 }}
        animate={{ x: 0 }}
        transition={{ duration: 2 }}
        className={styles.firstPage__leftWindow}
      >
        <div className={styles.svg}>
          <HandySvg src={iconSrc} className="icon" width="350" height="350" />
        </div>
      </motion.div>
      <div className={styles.firstPage__rightWindow}>
        <form className={styles.rightWindow__Form} action="#">
          <h2>
            Добро пожаловать в Систему <br /> управления ресурсами
          </h2>
          <div className={styles.form__buttons}>
            <div>
              <span>У Вас уже есть профиль?</span>
              <button> Войти</button>
            </div>
            <div>
              <span>Еще не зарегистрированы?</span>
              <button> Зарегистрироваться</button>
            </div>
          </div>
          <a href="#" className={styles.a}>
            Продолжить без авторизации
          </a>
        </form>
      </div>
    </div>
  );
}

export default First_page;
