import st from "./Card.module.scss";
import { useQuery } from "react-query";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import deleteRequest from "../../fun/deleteRequest";
import { itemsURL } from "../../constants/api";
import getRequest from "../../fun/getRequest";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import PopUp from "../../components/popUp/popUp";
import close from "./../../img/svg/close.svg";
import Spiner from "../../components/Spiner/Spiner";
import HeaderCard from "../../components/HeaderCard/HeaderCard";
import refreshToken from "../../fun/refreshToken";
export default function Card() {
  const [modalActive, setModalActive] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { data, isLoading, error, refetch } = useQuery(
    `card${location.state}`,
    () => getRequest(`${itemsURL}/${location.state}`)
  );

  if (isLoading) {
    return (
      <div style={{ left: "50vw", top: "50vh", position: "absolute" }}>
        <Spiner />
      </div>
    );
  }

  if (error) {
    if (error?.response?.status === 401) {
      refreshToken();
      refetch();
    }

    return (
      <ErrorComponent props={{ card: error.request.status }}></ErrorComponent>
    );
  }

  const deletedItems = () => {
    deleteRequest(`${itemsURL}/${location.state}/delete/`);
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
          <button
            onClick={() => navigate("/editCard", { state: location.state })}
            className={st.button}
          >
            Редактировать
          </button>
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
