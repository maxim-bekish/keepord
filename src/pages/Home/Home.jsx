import Categories from "../../components/categories/Categories";
import getTokenData from "../../fun/getTokenData";
import search from "./../../img/svg/search.svg";
import st from "./Home.module.scss";

export default function home() {
  getTokenData("https://rms2022.pythonanywhere.com/categoris/", "category");

  return (
    <>
      <header className={st.header}>
        <button className={`${st.buttonAdd} ${st.button}`}>
          <a className={st.textA} href="/home/add_object">
            + Добавить вещь
          </a>
        </button>
        <h2 className={st.h2Name}>Мария Иванова</h2>
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
        <div>
          <span>Вещи в базе</span>
          <span>Списки</span>
        </div>
        {/* <Categories width={300} defaultValue={"Категория"} />
        <Categories width={300} defaultValue={"Категория"} /> */}

        <button>Применить</button>
      </main>
    </>
  );
}
