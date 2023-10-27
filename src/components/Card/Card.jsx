import st from "./Card.module.scss";
import eee from "./../../img/png/google.png";
import { useSelector } from "react-redux";
import { itemsURL } from "./../../constants/api";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Card() {
  const hingsItem = useSelector((s) => s.sliceThingsItem.card);
  const location = useLocation();
  const url = `${itemsURL}/${location.state}/delete/`;
  const navigate = useNavigate();

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
        <button onClick={deletedItems}>Удалить</button>
        <button>Поделиться</button>
      </div>
    </>
  );
}
