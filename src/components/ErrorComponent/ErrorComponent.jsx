import { useNavigate } from "react-router-dom";
import st from "./ErrorComponent.module.scss";

export default function ErrorComponent({ props }) {
  const errors = new Array();
  for (let key in props) {
    if (props[key] !== undefined) {
      errors.push({ whereError: key, codeError: props[key] });
    }
  }

  const navigate = useNavigate();
  return (
    <>
      <div className={st.all}>
        <h2 className={st.h2}>Произошла ошибка! </h2>
        <ul className={st.errors}>
          {errors.map((e) => {
            return (
              <li>
                Ошибка произошла в {e.whereError}. Код ошибки {e.codeError}
              </li>
            );
          })}
        </ul>
        <div className={st.wrapperButton}>
          <button
            className={st.button}
            onClick={() => navigate("/first_page", { replace: true })}
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
