import { useNavigate } from "react-router-dom";
import st from './ErrorComponent.module.scss'
export default function ErrorComponent(error) {
  const navigate = useNavigate();
  

  return (
    <>
      <div className={st.all} >
        <h2 className={st.h2}>Произошла ошибка: {error.props.message} </h2>
        <div className={st.wrapperButton}>
          <button
            className={st.button}
            onClick={() => navigate("/login", { replace: true })}
          >
            Bернуься на страницу входа
          </button>
          <button className={st.button} onClick={() => alert("Пока не готово")}>
            Обновить
          </button>
        </div>
      </div>
    </>
  );
}
