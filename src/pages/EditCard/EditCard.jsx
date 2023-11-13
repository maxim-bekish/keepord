import { useLocation } from "react-router-dom";
import HeaderCard from "../../components/HeaderCard/HeaderCard";
import st from "./EditCard.module.scss";

import Category from "../../components/mainSelect/Category";

import MainSelectAdd from "../../components/MainSelectAdd/MainSelectAdd";

import UploadInput from "../../components/UploadInput/UploadInput";
import { useState } from "react";
import { useQuery } from "react-query";
import getUrl from "../../fun/getData";
import { categoriesAllURL } from "../../constants/api";

export default function EditCard() {
  const [addPhotoForm, setAddPhotoForm] = useState([]);
  if (addPhotoForm.length > 0) {
    for (var i = 0; i < addPhotoForm.length; i++) {
      //  formData.append("image_list", addPhotoForm[i]);
    }
  }
  const categoryAll = useQuery("categoryAll", () => getUrl(categoriesAllURL));
  const location = useLocation();

  console.log(location.state);
  return (
    <>
      <HeaderCard text={"Редактировать карточку вещи"} />
      <div>
        <label>Наименование *</label>
        <input className={st.input} type="text" />
      </div>
      <div className={`${st.wrapper} ${st.svg}`}>
        <label className={st.text} htmlFor="categories">
          Категория
        </label>
        <div>
          <Category width={"500"} data={categoryAll} />
        </div>
      </div>
      <div className={`${st.wrapper} ${st.svg}`}>
        <label className={st.text} htmlFor="storage">
          Место хранения
        </label>
        <MainSelectAdd />
      </div>
      <div>
        <label className={st.wrapper}>Описание *</label>
        <textarea type="text" className={`${st.input} ${st.description}`} />
      </div>
      <div className={`${st.wrapper} ${st.wrapperUpload} `}>
        <UploadInput setAddPhotoForm={setAddPhotoForm} />
      </div>
      <button className={st.buttonTest}>Отправить</button>
    </>
  );
}
