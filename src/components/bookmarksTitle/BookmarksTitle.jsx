import { useContext, useState } from "react";
import st from "./BookmarksTitle.module.scss";
import Context from "../../utilities/Context/Context";
// import { useDispatch } from "react-redux";
// import {add} from './../../store/slice'
// $isActiveBaseAndList:{ isActiveBaseAndList:isActiveBaseAndList,setIsActiveBaseAndList: setIsActiveBaseAndList},
export default function BookmarksTitle() {
  const { $isActiveBaseAndList } = useContext(Context);

  // const dispatch= useDispatch()
  return (
    <div className={st.div}>
      <div
        onClick={() => {
          $isActiveBaseAndList.setIsActiveBaseAndList("base");
          // dispatch(add(isActive))
        }}
        className={
          $isActiveBaseAndList.isActiveBaseAndList === "base"
            ? `${st.spanTitleActive}`
            : `${st.spanTitle}`
        }
        style={{
          "borderColor": ` ${`${
            $isActiveBaseAndList.isActiveBaseAndList === "base"
              ? "#f2ffe3"
              : "#A6BB8D"
          }`}    `,
        }}
      >
        Вещи в базе
      </div>
      <div
        onClick={() => {
          $isActiveBaseAndList.setIsActiveBaseAndList("list");
        }}
        className={
          $isActiveBaseAndList.isActiveBaseAndList === "list"
            ? `${st.spanTitleActive}`
            : `${st.spanTitle}`
        }
        style={{
          "borderColor": ` ${`${
            $isActiveBaseAndList.isActiveBaseAndList === "base"
              ? "#f2ffe3"
              : "#A6BB8D"
          }`}    `,
        }}
      >
        Списки
      </div>
    </div>
  );
}
