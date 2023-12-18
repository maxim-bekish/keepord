import search from "./../../img/svg/search.svg";
import st from "./Home.module.scss";
import BookmarksTitle from "../../components/bookmarksTitle/BookmarksTitle";

import ListData from "../../components/ListData/ListData";

import {
  usersURL,
  categoriesURL,
  storageURL,
  itemsAllURL,
} from "./../../constants/api";
import { Spin } from "antd";
import refreshToken from "./../../fun/refreshToken";

import { useQuery } from "react-query";
import getUrl from "./../../fun/getData";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import { useContext, useState } from "react";
import Context from "../../utilities/Context/Context";

import Spiner from "../../components/Spiner/Spiner";
import { useNavigate } from "react-router-dom";
import ListOfThings from "../../components/ListOfThings/ListOfThings";

export default function Home() {
  const { $isActiveBaseAndList, $state } = useContext(Context);

  const user = useQuery(["user"], () => getUrl(usersURL), {
    retry: (failureCount, error) => {
      if (error?.response?.status === 401) {
        refreshToken();
        return (failureCount = 1);
      } else {
        return <ErrorComponent props={error}></ErrorComponent>;
      }
    },
  });

  const category = useQuery("category", () => getUrl(categoriesURL), {
    retry: 2,
  });
  const storage = useQuery("storage", () => getUrl(storageURL), { retry: 1 });
  const items = useQuery("items", () => getUrl(itemsAllURL), { retry: 1 });
  //  console.log(user)
  $state.stateCategory = category;
  $state.stateStorage = storage;
  $state.stateItems = items;
  const navigate = useNavigate();

  if (category.isLoading || storage.isLoading || user.isLoading) {
    return (
      <div style={{ left: "50vw", top: "50vh", position: "absolute" }}>
        <Spiner />
      </div>
    );
  }
  // if(user.isError){
  //  ;}
  // if (user.status === "error") {

  //   // if (user.error.response.status === 401) {
  //   //   refreshToken();
  //   // } else {
  //   return (<ErrorComponent props={user.error}></ErrorComponent>)
  //   // }
  // }
  if (category.isError) {
    return <ErrorComponent props={user.error}></ErrorComponent>;
  }
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
        <h2 className={st.h2Name}>{user.data.email}</h2>

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
          borderColor: ` ${`${
            $isActiveBaseAndList.isActiveBaseAndList === "base"
              ? "#f2ffe3"
              : "#A6BB8D"
          }`}    `,
        }}
        className={st.container}
      >
        <BookmarksTitle />
        {$isActiveBaseAndList.isActiveBaseAndList === "base" ? (
          <ListOfThings />
        ) : (
          <ListData />
        )}
      </main>
    </>
  );
}
