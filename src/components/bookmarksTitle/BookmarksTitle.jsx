import { useContext } from "react";
import st from "./BookmarksTitle.module.scss";
import Context from "../../utilities/Context/Context";
import { Link } from "react-router-dom";

export default function BookmarksTitle() {
  const { $isActiveBaseAndList } = useContext(Context);
  return (
    <div className={st.div}>
      <Link
        onClick={() => {
          $isActiveBaseAndList.setIsActiveBaseAndList("base");
    
        }}
        className={
          $isActiveBaseAndList.isActiveBaseAndList === "base"
            ? `${st.spanTitleActive}`
            : `${st.spanTitle}`
        }
        style={{
          borderColor: `${`${
            $isActiveBaseAndList.isActiveBaseAndList === "base"
              ? "#f2ffe3"
              : "#A6BB8D"
          }`}    `,
        }}
        to="/"
      >
        Вещи в базе
      </Link>

      <Link
        onClick={() => {
          $isActiveBaseAndList.setIsActiveBaseAndList("list");
        }}
        className={
          $isActiveBaseAndList.isActiveBaseAndList === "list"
            ? `${st.spanTitleActive}`
            : `${st.spanTitle}`
        }
        style={{
          borderColor: ` ${`${
            $isActiveBaseAndList.isActiveBaseAndList === "base"
              ? "#f2ffe3"
              : "#A6BB8D"
          }`}    `,
        }}
        to="/listData"
      >
        Списки
      </Link>
    </div>
  );
}
