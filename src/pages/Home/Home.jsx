import Categories from "../../components/categories/Categories";
import getTokenData from "../../fun/getTokenData";
import search from "./../../img/svg/search.svg";
import st from "./Home.module.scss";
import { categoriesURL } from "../../constants/api";
import ListOfThings from "../../components/ListOfThings/ListOfThings";
import BookmarksTitle from "../../components/bookmarksTitlea/BookmarksTitle";

export default function home() {
  getTokenData(categoriesURL);

  return (
    <>
      <header className={st.header}>
        <button className={`${st.buttonAdd} ${st.button}`}>
          <a className={st.textA} href="/home/add_object">
            + Добавить вещь
          </a>
        </button>
        <h2 className={st.h2Name}>Name User</h2>
        <div className={st.search}>
          <input placeholder="Поиск" className={st.inputSearch} type="text" />
          <button className={st.buttonSearch}>
            <img src={search} />
          </button>
          <button className={`${st.buttonExit} ${st.button}`}>
            <a className={st.textA} href="/login">
              Выход
            </a>
          </button>
        </div>
      </header>
      <main className={st.container}>
        <BookmarksTitle />
        <div className={st.filter}>
          <Categories width={300} defaultValue={"Категория"} />
          <Categories width={300} defaultValue={"Места хранения"} />
          <button className={`${st.button} ${st.buttonSubmit}`}>
            Применить
          </button>
        </div>
        <ListOfThings />
      </main>
    </>
  );
}
