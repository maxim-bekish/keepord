import search from "./../../img/svg/search.svg";
import st from "./Home.module.scss";
export default function home() {
// document.addEventListener("DOMContentLoaded", ()=>{
//   lo
// })


  return (
    <header className={st.header}>
      <button className={st.buttonAdd}>
        <a href="/home/add_object">+ Добавить вещь</a>
      </button>
      <h2 className={st.h2Name}>Мария Иванова</h2>
      <div className={st.search}>
        <input placeholder="Поиск" className={st.inputSearch} type="text" />
        <button className={st.buttonSearch}>
          <img src={search} />
        </button>
        <button className={st.buttonExit}>
          <a href="/login">Выход</a>
        </button>
      </div>
    </header>
  );
}
