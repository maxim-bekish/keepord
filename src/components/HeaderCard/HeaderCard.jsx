import { useNavigate } from "react-router-dom";
import st from "./HeaderCard.module.scss";
import arrow from "./../../img/svg/arrows_button.svg";
import closed from "./../../img/svg/close.svg";

export default function HeaderCard({ text }) {
  const navigate = useNavigate();
  return (
    <header className={st.header}>
      <div className={st.container}>
        <div className={st.flexBox}>
          <div className={st.miniWrapper}>
            <div className={st.link} onClick={() => navigate(-1)}>
              <img src={arrow} alt="arrow" />
            </div>
            <div>
              <span>{text}</span>
            </div>
          </div>
          <div className={st.closed}>
            <img src={closed} alt="closed" />
          </div>
        </div>
      </div>
    </header>
  );
}
