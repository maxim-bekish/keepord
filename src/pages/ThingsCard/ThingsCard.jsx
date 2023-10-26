import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thingsCards } from "../../store/sliceThingsItem";
import Card from "./../../components/Card/Card";
import { useLocation, useNavigate } from "react-router-dom";
import st from "./ThingsCard.module.scss";
import arrow from "./../../img/svg/arrows_button.svg";
import closed from "./../../img/svg/close.svg";


export default function ThingsCard() {
  let id = useLocation().state;
 
const navigate = useNavigate();


  const { status, error } = useSelector((s) => s.sliceThingsItem);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(thingsCards({ id: id }));
  }, []);



  return (
    <>
      <header className={st.header}>
        <div className={st.container}>
          <div className={st.flexBox}>
            <div className={st.miniWrapper}>
              <div className={st.link} onClick={() => navigate(-1)}>
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
      {status === "loading" && <h2>Loading...</h2>}
      {error && <h2>An error has occurred: {error}</h2>}
      {status === "resolve" && <Card />}
    </>
  );
}
