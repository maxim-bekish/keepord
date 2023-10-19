import { useSelector } from "react-redux";
import ListOfThings from "../ListOfThings/ListOfThings";
import MainSelect from "../mainSelect/MainSelect";
import { categoriesURL, storageURL, itemsURL } from "./../../constants/api";
import { categoriesAdd, storageAdd } from "./../../store/slice";
import st from "./../../pages/Home/Home.module.scss";
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
      <div className={st.filter}>
        <MainSelect
          width={300}
          defaultValue={"Категория"}
          url={categoriesURL}
          reducersCategoriesAdd={categoriesAdd}
        />
        <MainSelect
          width={300}
          defaultValue={"Места хранения"}
          url={storageURL}
          reducersCategoriesAdd={storageAdd}
        />

        <button
          onClick={() => console.log(result)}
          className={`${st.button} ${st.buttonSubmit}`}
        >
          Применить
        </button>
      </div>
      <ListOfThings url={itemsURL} />
    </>
  );
}
