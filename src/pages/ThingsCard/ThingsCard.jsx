
import arrow from "./../../img/svg/arrows_button.svg";
import closed from "./../../img/svg/close.svg";
import eee from "./../../img/png/google.png";
import st from "./ThingsCard.module.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thingsCard } from "../../store/sliceDataItem";

export default function ThingsCard() {

const dataItemArray = useSelector((s) => s.sliceDataItem.dataItem);
  const { status, error } = useSelector((s) => s.sliceDataItem);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thingsCard());
  }, []);





console.log(dataItemArray);

  return (
    <>
      {status === "loading" && <h2>Loading...</h2>}
      {error && <h2>An error has occurred: {error}</h2>}
      <header className={st.header}>
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
          <h2 className={st.name}>{dataItemArray.name}</h2>
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
              <p>{dataItemArray.category.name}</p>
            </div>
            <div className={st.wrapperData}>
              <span>Место хранения</span>
              <p>{dataItemArray.storage.name} </p>
            </div>
            <div className={st.wrapperData}>
              <span>Описание</span>
              <p>{dataItemArray.description}</p>
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
