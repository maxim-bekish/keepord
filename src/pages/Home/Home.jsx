import search from "./../../img/svg/search.svg";
import st from "./Home.module.scss";
import BookmarksTitle from "../../components/bookmarksTitle/BookmarksTitle";
import ListData from "../../components/ListData/ListData";

import {
  usersURL,
  categoriesURL,
  storageURL,
  itemsAllURL,
  logoutURL,
} from "./../../constants/api";
import { getCookie } from "../../fun/getCookie";

import { useQuery } from "react-query";
import getRequest from "./../../fun/getRequest";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import { useContext } from "react";
import Context from "../../utilities/Context/Context";

import Spiner from "../../components/Spiner/Spiner";
import { useNavigate } from "react-router-dom";
import ListOfThings from "../../components/ListOfThings/ListOfThings";
import refreshToken from "../../fun/refreshToken";

export default function Home() {
  const { $isActiveBaseAndList, $state } = useContext(Context);

  const user = useQuery(["user"], () => getRequest(usersURL));
// console.log(user);
  const category = useQuery("category", () => getRequest(categoriesURL));
  const storage = useQuery("storage", () => getRequest(storageURL));
  const items = useQuery("items", () => getRequest(itemsAllURL));

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

  if (category.isError || storage.isError || user.isError) {
   if (
     user.error.request.status === 401 ||
     category.error.request.status === 410 ||
     storage.error.request.status===401
   ){
    refreshToken()
    
   }else{
     return (
       <ErrorComponent
         props={{
           user: user?.error?.request?.status,
           category: category?.error?.request?.status,
           storage: storage?.error?.request?.status,
         }}
       ></ErrorComponent>
     );
   }
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

        <div className={st.search}>
          <input placeholder="Поиск" className={st.inputSearch} type="text" />
          <button className={st.buttonSearch}>
            <img src={search} alt="searchSVG" />
          </button>
          <button
            onClick={() => {
              document.cookie = `access=${getCookie("access")}; max-age=-1`;
              document.cookie = `refresh=${getCookie("refresh")}; max-age=-1`;
              window.location.replace("/login");
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
