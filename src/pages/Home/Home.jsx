import search from "./../../img/svg/search.svg";
import st from "./Home.module.scss";
import BookmarksTitle from "../../components/bookmarksTitle/BookmarksTitle";
import ThingsData from "./../../components/ThingsData/ThingsData";

export default function Home() {
  return (
    <>
      <header className={`${st.header}`}>
        <button className={`${st.buttonAdd} ${st.button}`}>
          <a className={st.textA} href="/home/add_object">
            + Добавить вещь
          </a>
        </button>
        <h2 className={st.h2Name}>Name User</h2>
        <div className={st.search}>
          <input placeholder="Поиск" className={st.inputSearch} type="text" />
          <button className={st.buttonSearch}>
            <img src={search} alt="searchSVG" />
          </button>
          <button className={`${st.buttonExit} ${st.button}`}>
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
