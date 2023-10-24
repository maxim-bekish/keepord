import { itemsURL } from "./../../constants/api";

import arrow from "./../../img/svg/arrows_button.svg";
import closed from "./../../img/svg/close.svg";
import eee from "./../../img/png/google.png";
import st from "./ThingsCard.module.scss";

export default function ThingsCard() {
  return (
    <>
      <header>
        <div className={st.container}>
          <div className={st.flexBox}>
            <div className={st.miniWrapper}>
              <div>
                <img src={arrow} alt="arrow" />
              </div>
              <div>
                <span>Карточка вещи</span>
              </div>
            </div>
            <div className={st.closed}>
              <img src={closed} alt="closed" />
            </div>
          </div>
        </div>
      </header>

      <main className={`${st.container}  `}>
        <div className={st.wrapper}>
          <h2 className={st.name}>Платье белое летнее с коротким рукавом</h2>
          <div className={st.img}>
            <img src={eee} alt="photo" />
            <img src={eee} alt="photo" />
            <img src={eee} alt="photo" />
            <img src={eee} alt="photo" />
            <img src={eee} alt="photo" />
          </div>
          <section>
            <div className={st.wrapperData}>
              <span>Категория</span>
              <p>Летние платья</p>
            </div>
            <div className={st.wrapperData}>
              <span>Место хранения</span>
              <p>Балкон </p>
            </div>
            <div className={st.wrapperData}>
              <span>Описание</span>
              <p>
                Белое короткое платье в кружевными рукавами с последнего
                семейного ужина
              </p>
            </div>
          </section>
        </div>
      </main>
      <div className={`${st.buttonAll} ${st.container}`}>
        <button>Редактировать</button>
        <button>Удалить</button>
        <button>Поделиться</button>
      </div>
    </>
  );
}
