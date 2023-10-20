import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "antd";
import ListOfThings from "../ListOfThings/ListOfThings";
import MainSelect from "../mainSelect/MainSelect";
import { categoriesURL, storageURL, itemsURL } from "./../../constants/api";
import { categoriesAdd, storageAdd } from "./../../store/slice";
import st from "./../../components/ThingsData/ThingsData.module.scss";
import { useEffect } from "react";
import { fetchTodos } from "./../../store/sliseTest";



export default function ThingsData() {
  const categoriesState = useSelector((s) => s.homePageReducer.categoriesState);
  const storageState = useSelector((s) => s.homePageReducer.storageState);
  const status = useSelector((s) => s.sliceTest.status);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
    // erer(url)
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
