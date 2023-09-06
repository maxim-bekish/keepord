import { useState } from "react";
import st from "./BookmarksTitle.module.scss";

export default function BookmarksTitle() {
  const [isActive, setIsActive] = useState("base");

  return (
    <div className={st.div}>
      <div
        onClick={() => {
          setIsActive("base");
          
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
