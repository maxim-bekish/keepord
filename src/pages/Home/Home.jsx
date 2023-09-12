import MainSelect from "./../../components/mainSelect/MainSelect";
import search from "./../../img/svg/search.svg";
import st from "./Home.module.scss";
import ListOfThings from "../../components/ListOfThings/ListOfThings";
import BookmarksTitle from "../../components/bookmarksTitle/BookmarksTitle";
import { useSelector } from "react-redux";
import { categoriesURL, storageURL, itemsURL } from "./../../constants/api";
import { categoriesAdd, storageAdd } from "./../../store/slice";

export default function Home() {
  const categoriesState = useSelector((s) => s.homePageReducer.categoriesState);
  const storageState = useSelector((s) => s.homePageReducer.storageState);

  // result id категории и мест хранинеия на главной странце
  let result = {
    categories: categoriesState.categoriesId,
    storage: storageState.storageId,
  };



  return (
    <>
      <header className={st.header}>
        <button className={`${st.buttonAdd} ${st.button}`}>
          <a className={st.textA} href="/home/add_object">
            + Добавить вещь
          </a>
        </button>
        <h2 className={st.h2Name}>Name User8</h2>
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
        {}
        <div className={st.filter}>
          <MainSelect
            width={300}
            defaultValue={"Категория"}
            url={categoriesURL}
            x={categoriesAdd}
          />
          <MainSelect
            width={300}
            defaultValue={"Места хранения"}
            url={storageURL}
            x={storageAdd}
          />

          <button
            onClick={() => console.log(result)}
            className={`${st.button} ${st.buttonSubmit}`}
          >
            Применить
          </button>
        </div>
        <ListOfThings url={itemsURL} />
      </main>
    </>
  );
}
