import { useDispatch, useSelector } from "react-redux";
import ListOfThings from "../ListOfThings/ListOfThings";
import MainSelect from "../mainSelect/MainSelect";
import { categoriesURL, storageURL } from "./../../constants/api";
import { categoriesAdd, storageAdd } from "./../../store/slice";
import st from "./../../components/ThingsData/ThingsData.module.scss";
import { useEffect } from "react";
import { fetchDataItem } from "./../../store/sliceDataItem";
import { itemsAllURL } from "./../../constants/api";

export default function ThingsData() {
  const { categoriesState, storageState } = useSelector(
    (s) => s.homePageReducer
  );
  const { status, error } = useSelector((s) => s.sliceDataItem);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataItem());
  }, []);

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
      <ListOfThings />
      {status === "loading" && <h2>Loading...</h2>}
      {error && <h2>An error has occurred: {error}</h2>}
    </>
  );
}
