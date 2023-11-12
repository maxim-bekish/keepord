import ListOfThings from "../ListOfThings/ListOfThings";
import Category from "../mainSelect/Category";
import Storage from "../mainSelect/Storage";
import st from "./../../components/ThingsData/ThingsData.module.scss";
import { useContext } from "react";
import Context from "../../utilities/Context/Context";
import { categoriesURL } from "../../constants/api";

export default function ThingsData() {
  const { $category, $storage, $state } = useContext(Context);
  let result = {
    category: $category.category,
    storage: $storage.storage,
  };
  function reset() {
    $category.setCategory(null);
    $storage.setStorage(null);
  }

  return (
    <>
      {/* <div className={st.filter}>
        <Category width={"300"} data={$state.stateCategory} />
        <Storage />

        <button  className={st.buttonSubmit}>
          Применить
        </button>
        <button onClick={reset}>Сбросить</button>
      </div> */}

      <ListOfThings  />
    </>
  );
}
