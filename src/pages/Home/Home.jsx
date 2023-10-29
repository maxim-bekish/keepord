import search from "./../../img/svg/search.svg";
import st from "./Home.module.scss";
import BookmarksTitle from "../../components/bookmarksTitle/BookmarksTitle";
import ThingsData from "./../../components/ThingsData/ThingsData";
import ListData from "../../components/ListData/ListData";

import { usersURL } from "./../../constants/api";

import { useQuery } from "react-query";
import getUrl from "./../../fun/getData";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import { useContext } from "react";
import Context from "../../utilities/Context/Context";

export default function Home() {
  const { $isActiveBaseAndList } = useContext(Context);
  const { data, isLoading, error } = useQuery("coins", () => getUrl(usersURL));

  if (isLoading) {
    return <h2>Loadinggggg</h2>;
  }

  if (error) {
    return <ErrorComponent props={error}></ErrorComponent>;
  }

  return (
    <>
      <header className={`${st.header}`}>
        <button className={`${st.buttonAdd} ${st.button}`}>
          <a className={st.textA} href="/creatingCard">
            + Добавить вещь
          </a>
        </button>
        <h2 className={st.h2Name}>{data.email}</h2>

        {/* <button onClick={() => getCookie('access')}>куки показить</button> */}

        <div className={st.search}>
          <input placeholder="Поиск" className={st.inputSearch} type="text" />
          <button className={st.buttonSearch}>
            <img src={search} alt="searchSVG" />
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("tokenRefresh");
              window.location.replace("/login");
              // dispatch(singInAuth(false));
            }}
            className={`${st.buttonExit} ${st.button}`}
          >
            {/* <a className={st.textA}></a> */}
            Выход
          </button>
        </div>
      </header>
      <main
        style={{
          backgroundColor: ` ${`${
            $isActiveBaseAndList.isActiveBaseAndList === "base"
              ? "#f2ffe3"
              : "#A6BB8D"
          }`}    `,
        }}
        className={st.container}
      >
        <BookmarksTitle />
        {$isActiveBaseAndList.isActiveBaseAndList === "base" ? (
          <ThingsData />
        ) : (
          <ListData />
        )}
      </main>
    </>
  );
}
