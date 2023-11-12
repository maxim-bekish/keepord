import search from "./../../img/svg/search.svg";
import st from "./Home.module.scss";
import BookmarksTitle from "../../components/bookmarksTitle/BookmarksTitle";
import ThingsData from "./../../components/ThingsData/ThingsData";
import ListData from "../../components/ListData/ListData";

import {
  usersURL,
  categoriesURL,
  storageURL,
  itemsAllURL,
} from "./../../constants/api";
import { Spin } from "antd";
import { useQuery } from "react-query";
import getUrl from "./../../fun/getData";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import { useContext } from "react";
import Context from "../../utilities/Context/Context";

import Spiner from "../../components/Spiner/Spiner";
import { useNavigate } from "react-router-dom";

export default function Home() { 
  const { $isActiveBaseAndList, $state } = useContext(Context);
  // const user = useQuery("user", () => getUrl(usersURL));
  const category = useQuery("category", () => getUrl(categoriesURL));
  const storage = useQuery("storage", () => getUrl(storageURL));
  const items = useQuery("items", () => getUrl(itemsAllURL));
  $state.stateCategory = category;
  $state.stateStorage = storage;
  $state.stateItems = items;
  const navigate = useNavigate();
  if (category.isLoading || storage.isLoading) {
    return (
      <div style={{ left: "50vw", top: "50vh", position: "absolute" }}>
        <Spiner />
      </div>
    );
  }

  // if (user.error) {
  //   return <ErrorComponent props={user.error}></ErrorComponent>;
  // }
  function nextPage() {
    $isActiveBaseAndList.isActiveBaseAndList === "base"
      ? navigate("/creatingCard")
      : navigate("/dvcsdv");
  }

  return (
    <>
      {/* <Spiner /> */}
      <header className={`${st.header}`}>
        <button className={st.buttonAdd} onClick={nextPage}>
          {/* <a className={st.textA} href="/creatingCard">
  
          </a> */}
          {$isActiveBaseAndList.isActiveBaseAndList === "base"
            ? "+ Добавить вещь"
            : "+ Добавить список"}
        </button>
        {/* <h2 className={st.h2Name}>{user.data.email}</h2> */}

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
            className={st.buttonExit}
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
