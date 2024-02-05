import search from "./../../img/svg/search.svg";
import st from "./Home.module.scss";
import BookmarksTitle from "../../components/bookmarksTitle/BookmarksTitle";
import { usersURL, categoriesURL, storageURL } from "./../../constants/api";
import { useQuery } from "react-query";
import getRequest from "./../../fun/getRequest";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import { useContext } from "react";
import Context from "../../utilities/Context/Context";
import Spiner from "../../components/Spiner/Spiner";
import { useNavigate } from "react-router-dom";

import refreshToken from "../../fun/refreshToken";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../utilities/router/useAuth";

export default function Home() {
  const { $isActiveBaseAndList, $state } = useContext(Context);
const { signOut } = useAuth()
  const {
    isLoading: userLoading,
    isError: userIsError,
    error: userError,
    data: userData,
    refetch: userRefetch,
  } = useQuery(["user"], () => getRequest(usersURL));
  const {
    isLoading: categoryLoading,
    isError: categoryIsError,
    error: categoryError,
    data: categoryData,
    refetch: categoryRefetch,
  } = useQuery("category", () => getRequest(categoriesURL));
  const {
    isLoading: storageLoading,
    isError: storageIsError,
    error: storageError,
    data: storageData,
    refetch: storageRefetch,
  } = useQuery("storage", () => getRequest(storageURL));

  $state.stateCategory = categoryData;
  $state.stateStorage = storageData;

  const navigate = useNavigate();

  if (categoryLoading || storageLoading || userLoading) {
    return (
      <div style={{ left: "50vw", top: "50vh", position: "absolute" }}>
        <Spiner />
      </div>
    );
  }

  if (categoryIsError || storageIsError || userIsError) {
    if (
      userError?.response.status === 401 ||
      categoryError?.response.status === 401 ||
      storageError?.response.status === 401
    ) {
      categoryRefetch();
      storageRefetch();
      refreshToken();
      userRefetch();
      return (
        <div style={{ left: "50vw", top: "50vh", position: "absolute" }}>
          <Spiner />
        </div>
      );
    } else {
      return (
        <ErrorComponent
          props={{
            user: userError?.response?.status,
            category: categoryError?.response?.status,
            storage: storageError?.response?.status,
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
      <header className={`${st.header}`}>
        <button className={st.buttonAdd} onClick={nextPage}>
          {$isActiveBaseAndList.isActiveBaseAndList === "base"
            ? "+ Добавить вещь"
            : "+ Добавить список"}
        </button>
        <h2 className={st.h2Name}>{userData?.email}</h2>

        <div className={st.search}>
          <input placeholder="Поиск" className={st.inputSearch} type="text" />
          <button className={st.buttonSearch}>
            <img src={search} alt="searchSVG" />
          </button>
          <button
            onClick={() => {
              signOut(() => navigate("/first_page", { replace: true }));
            }}
            className={st.buttonExit}
          >
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
        {/* {$isActiveBaseAndList.isActiveBaseAndList === "base" ? (
          <ListOfThings />
        ) : (
          <ListData />
        )} */}

        <Outlet />
      </main>
    </>
  );
}
