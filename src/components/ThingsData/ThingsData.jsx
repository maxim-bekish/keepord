
import ListOfThings from "../ListOfThings/ListOfThings";
import Category from "../mainSelect/Category";
import Storage from "../mainSelect/Storage";

import st from "./../../components/ThingsData/ThingsData.module.scss";

import { useContext } from "react";
import Context from "../../utilities/Context/Context";
import { categoriesURL } from "../../constants/api";
// import { useEffect } from "react";
// import { fetchDataItem } from "./../../store/sliceDataItem";

export default function ThingsData() {
  // const { categoriesState, storageState } = useSelector(
  //   (s) => s.homePageReducer
  // );

  const { $category } = useContext(Context);

  // console.log(data);

  // const { status, error } = useSelector((s) => s.sliceDataItem);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchDataItem());
  // }, []);

  // result id категории и мест хранинеия на главной странце
  // let result = {
  //   categories: categoriesState.categoriesId,
  //   storage: storageState.storageId,
  // };

  return (
    <>
      <div className={st.filter}>
        <Category width={'300'} url={categoriesURL} />
        <Storage />
 

        <button
          onClick={() => console.log($category)}
          className={`${st.button} ${st.buttonSubmit}`}
        >
          Применить
        </button>
      </div>

      {/* {status === "loading" && <h2>Loading...</h2>}
      {error && <h2>An error has occurred: {error}</h2>}
      {status === "resolve" && <ListOfThings />} */}
      <ListOfThings />
    </>
  );
}
