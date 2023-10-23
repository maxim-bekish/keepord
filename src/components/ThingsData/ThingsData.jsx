import { useDispatch, useSelector } from "react-redux";
import ListOfThings from "../ListOfThings/ListOfThings";
import MainSelect from "../mainSelect/MainSelect";
import { categoriesURL, storageURL } from "./../../constants/api";
import { categoriesAdd, storageAdd } from "./../../store/slice";
import st from "./../../components/ThingsData/ThingsData.module.scss";
import { useEffect } from "react";
import { fetchDataItem } from "./../../store/sliceDataItem";

export default function ThingsData() {
  const categoriesState = useSelector((s) => s.homePageReducer.categoriesState);
  const storageState = useSelector((s) => s.homePageReducer.storageState);
  const status = useSelector((s) => s.sliceDataItem.status);
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

      {status === "loading" && <h2>Loading...</h2>}
      {status === "resolve" && <ListOfThings />}
      {/* {error && <h2>An error occured: {error}</h2>} */}
      {/* <ListOfThings /> */}
    </>
  );
}
