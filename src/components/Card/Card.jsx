import st from "./Card.module.scss";
import eee from "./../../img/png/google.png";
import { itemsURL } from "./../../constants/api";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import getUrl from "../../fun/getData";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import PopUp from "../popUp/popUp";
import { useState } from "react";
import close from "./../../img/svg/close.svg";

export default function Card() {
  const [modalActive, setModalActive] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const url = `${itemsURL}/${location.state}/delete/`;

  const { data, isLoading, error } = useQuery("card", () =>
    getUrl(`${itemsURL}/${location.state}`)
  );

  if (isLoading) {
    return <h2>Loadinggggg</h2>;
  }

  if (error) {
    if (error.response.status === 401) {
    } else {
      return <ErrorComponent props={error}></ErrorComponent>;
    }
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
