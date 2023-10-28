import ListOfThings from "../ListOfThings/ListOfThings";
import Category from "../mainSelect/Category";
import Storage from "../mainSelect/Storage";
import st from "./../../components/ThingsData/ThingsData.module.scss";
import { useContext } from "react";
import Context from "../../utilities/Context/Context";
import { categoriesURL } from "../../constants/api";



export default function ThingsData() {
  const { $category,$storage } = useContext(Context);
let result = {
  category: $category.category,
  storage: $storage.storage,
};
  return (
    <>
      <div className={st.filter}>
        <Category width={"300"} url={categoriesURL} />
        <Storage />

        <button
          onClick={() => console.log(result)}
          className={`${st.button} ${st.buttonSubmit}`}
        >
          Применить
        </button>
      </div>

      <ListOfThings />
    </>
  );
}
