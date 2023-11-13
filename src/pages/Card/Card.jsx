import st from "./Card.module.scss";
import axios from "axios";
import { useQuery } from "react-query";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { itemsURL } from "../../constants/api";
import getUrl from "../../fun/getData";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import PopUp from "../../components/popUp/popUp";
import close from "./../../img/svg/close.svg";
import Spiner from "../../components/Spiner/Spiner";
import HeaderCard from "../../components/HeaderCard/HeaderCard";
export default function Card() {
  const [modalActive, setModalActive] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const url = `${itemsURL}/${location.state}/delete/`;

  const { data, isLoading, error } = useQuery(`card${location.state}`, () =>
    getUrl(`${itemsURL}/${location.state}`)
  );

  if (isLoading) {
    return (
      <div style={{ left: "50vw", top: "50vh", position: "absolute" }}>
        <Spiner />
      </div>
    );
  }

  if (error) {
    return <ErrorComponent props={error}></ErrorComponent>;
  }

  const deletedItems = async () => {
    await axios.delete(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });

    navigate("/home");
  };

  return (
    <div className={st.all}>
      <HeaderCard text={"Карточка вещи"} />
      <main className={`${st.container}  `}>
        <div className={st.wrapper}>
          <h2 className={st.name}>{data.name}</h2>
          <div className={st.img}>
            {data.images.map((e, id) => {
              return (
                <img
                  key={`key${id}`}
                  src={
                    data.images.length === 0
                      ? ""
                      : `https://rms2022.pythonanywhere.com${e.image_url}`
                  }
                  alt={`itemPhoto-${id}`}
                />
              );
            })}
          </div>
          <section>
            <div className={st.wrapperData}>
              <span>Категория</span>
              <p>
                {data.category === null ? "Не добавил" : data.category.name}
              </p>
            </div>
            <div className={st.wrapperData}>
              <span>Место хранения</span>
              <p>{data.storage === null ? "Не добавил" : data.storage.name} </p>
            </div>
            <div className={st.wrapperData}>
              <span>Описание</span>
              <p>{data.description}</p>
            </div>
          </section>
        </div>
      </main>
      <div className={`${st.buttonAll} ${st.container}`}>
        <div>
          <button className={st.button}>Редактировать</button>
        </div>
        <div>
          <button className={st.button} onClick={() => setModalActive(true)}>
            Удалить
          </button>
        </div>
        <div>
          <button className={st.button}>Поделиться</button>
        </div>
      </div>

      <PopUp active={modalActive}>
        <div className={st.wrapperModal}>
          <img onClick={() => setModalActive(false)} src={close} alt="" />
          <h2>Вы действительно хотите удалить эту вещь?</h2>
          <div className={st.buttonModal}>
            <button onClick={deletedItems}>Да</button>

            <button onClick={() => setModalActive(false)}>Нет</button>
          </div>
        </div>
      </PopUp>
    </div>
  );
}
