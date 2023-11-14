import { useLocation } from "react-router-dom";
import HeaderCard from "../../components/HeaderCard/HeaderCard";
import st from "./EditCard.module.scss";

import Category from "../../components/mainSelect/Category";

import MainSelectAdd from "../../components/MainSelectAdd/MainSelectAdd";

import UploadInput from "../../components/UploadInput/UploadInput";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import getUrl from "../../fun/getData";
import { categoriesAllURL, itemsURL } from "../../constants/api";
import axios from "axios";

export default function EditCard() {
  const location = useLocation();
  const {
    data: categoryAllData,
    isLoading: categoryAllIsLoading,
    isError: categoryAllIsError,
  } = useQuery("categoryAll", () => getUrl(categoriesAllURL));

  const {
    data: itemsData,
    isSuccess: itemsIsSuccess,
    isLoading: itemsIsLoading,
    isError: itemsIsError,
  } = useQuery(`items${location.state}`, () =>
    getUrl(`${itemsURL}/${location.state}`)
  );

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [storage, setStorage] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (itemsIsSuccess) {
      setName(itemsData.name);
      setCategory(itemsData.category.name);
      setDescription(itemsData.description);
      setStorage(itemsData.storage.name);
    }
  }, [itemsIsSuccess]);

  if (itemsIsLoading) {
    return <div>loadingloadingloadingloading itemsitemsitemsitems</div>;
  }
  if (categoryAllIsLoading) {
    return <div>loadingloadingloading categoryAllcategoryAllcategory</div>;
  }
  if (itemsIsError) {
    return <div>isError items </div>;
  }
  if (categoryAllIsError) {
    return <div>isError category </div>;
  }

  return (
    <>
      <HeaderCard text={"Редактировать карточку вещи"} />
      <div>
        <label>Наименование *</label>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className={st.input}
          type="text"
        />
      </div>
      <div className={`${st.wrapper} ${st.svg}`}>
        <label className={st.text}>Категория</label>
        <div>
          <Category category={category} width={"500"} data={categoryAllData} />
        </div>
      </div>
      <div className={`${st.wrapper} ${st.svg}`}>
        <label className={st.text}>Место хранения</label>
        <MainSelectAdd storageDefault={storage} />
      </div>
      <div>
        <label className={st.wrapper}>Описание *</label>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          type="text"
          className={`${st.input} ${st.description}`}
        />
      </div>
      {/* <div className={`${st.wrapper} ${st.wrapperUpload} `}>
        <UploadInput setAddPhotoForm={setAddPhotoForm} />
      </div> */}
      <button className={st.buttonTest}>Отправить</button>
    </>
  );
}
