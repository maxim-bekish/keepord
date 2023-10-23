import search from "./../../img/svg/search.svg";
import st from "./Home.module.scss";
import BookmarksTitle from "../../components/bookmarksTitle/BookmarksTitle";
import ThingsData from "./../../components/ThingsData/ThingsData";
// import ListData from "./../../components/ListData/ListData";
// import { useDispatch, useSelector } from "react-redux";
// import { singInAuth } from "./../../store/sliceAuth";
import Context from "./../../utilities/Context/Context";
import { useContext } from "react";

export default function Home() {
  // const dispatch = useDispatch();
  //   function logout (){
  //  localStorage.removeItem("token");
  //  localStorage.removeItem("tokenRefresh");

  // dispatch(singInAuth(false));

  //  }
  // const status = useSelector((s) => s.sliceAuth.singIn);
  // console.log(status);

  const xxx = useContext(Context);
  console.log(xxx);
  return (
    <>
      <header className={`${st.header}`}>
        <button className={`${st.buttonAdd} ${st.button}`}>
          <a className={st.textA} href="/creatingCard">
            + Добавить вещь
          </a>
        </button>
        <h2 className={st.h2Name}>Name User</h2>
        <div className={st.search}>
          <input placeholder="Поиск" className={st.inputSearch} type="text" />
          <button className={st.buttonSearch}>
            <img src={search} alt="searchSVG" />
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("tokenRefresh");

              // dispatch(singInAuth(false));
            }}
            className={`${st.buttonExit} ${st.button}`}
          >
            {/* <a className={st.textA}></a> */}
            Выход
          </button>
        </div>
      </header>
      <main className={st.container}>
        <BookmarksTitle />

        <ThingsData />

        {/* <ListData /> */}
      </main>
    </>
  );
}
