import st from "./Card.module.scss";
import eee from "./../../img/png/google.png";
import { itemsURL } from "./../../constants/api";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import getUrl from "../../fun/getData";
import ErrorComponent from "../ErrorComponent/ErrorComponent";

export default function Card() {
  const navigate = useNavigate();
  const location = useLocation();

  const url = `${itemsURL}/${location.state}/delete/`;

  const { data, isLoading, error } = useQuery("card", () =>
    getUrl(`${itemsURL}/${location.state}`)
  );
console.log(error.response.status);
  if (isLoading) {

    return <h2>Loadinggggg</h2>;
  }

  if (error) {
    if (error.response.status===401) {
 

    } else {
      return <ErrorComponent props={error}></ErrorComponent>;
    }
  }

  const deletedItems = () => {
    let isDelete = window.confirm("Точно удалить?");
    if (isDelete) {
      axios.delete(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });

      navigate("/home", { replace: true });
    }
  };

  return (
    <>
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
        <button>Редактировать</button>
        <button onClick={deletedItems}>Удалить</button>
        <button>Поделиться</button>
      </div>
    </>
  );
}
