import st from "./Card.module.scss";
import eee from "./../../img/png/google.png";
import { useSelector } from "react-redux";

export default function Card() {
  const hingsItem = useSelector((s) => s.sliceThingsItem.card);

  return (
    <>
      <main className={`${st.container}  `}>
        <div className={st.wrapper}>
          <h2 className={st.name}>{hingsItem.name}</h2>
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
              <p>{hingsItem.category.name}</p>
            </div>
            <div className={st.wrapperData}>
              <span>Место хранения</span>
              <p>{hingsItem.storage.name} </p>
            </div>
            <div className={st.wrapperData}>
              <span>Описание</span>
              <p>{hingsItem.description}</p>
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
