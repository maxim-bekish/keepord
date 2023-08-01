import search from "./../../img/svg/search.svg";
import st from "./Home.module.scss";
export default function home() {
  return (
    <header className={st.header}>
      <button className={st.buttonAdd}>+ Добавить вещь</button>
      <h2 className={st.h2Name}>Мария Иванова</h2>
      <div className={st.search}>
        <input placeholder="Поиск" className={st.inputSearch} type="text" />
        <button className={st.buttonSearch}>
          <img src={search} />
        </button>
        <button className={st.buttonExit}>Выход</button>
      </div>
    </header>
  );
}
