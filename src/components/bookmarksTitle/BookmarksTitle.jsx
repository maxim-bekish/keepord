import { useState } from "react";
import st from "./BookmarksTitle.module.scss";
// import { useDispatch } from "react-redux";
// import {add} from './../../store/slice'

export default function BookmarksTitle() {
  const [isActive, setIsActive] = useState("base");
// const dispatch= useDispatch()
  return (
    <div className={st.div}>
      <div
        onClick={() => {
          setIsActive("base");
          // dispatch(add(isActive))
        }}
        className={
          isActive === "base" ? `${st.spanTitleActive}` : `${st.spanTitle}`
        }
      >
        Вещи в базе
      </div>
      <div
        onClick={() => {
          setIsActive("list");
            // dispatch(add(isActive));
        }}
        className={
          isActive === "list" ? `${st.spanTitleActive}` : `${st.spanTitle}`
        }
      >
        Списки
      </div>
    </div>
  );
}
