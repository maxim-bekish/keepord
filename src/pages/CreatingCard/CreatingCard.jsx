import React, { useContext, useState } from "react";
import st from "./CreatingCard.module.scss";
import { Form, Input } from "antd";
import close from "./../../img/svg/close.svg";
import {
  categoriesAllURL,
  storageAllURL,
  itemsAddURL,
} from "../../constants/api";
import Category from "../../components/mainSelect/Category";

import MainSelectAdd from "../../components/MainSelectAdd/MainSelectAdd";
import { useNavigate } from "react-router-dom";
import Context from "../../utilities/Context/Context";
import { useMutation, useQuery } from "react-query";
import PopUp from "../../components/popUp/popUp";
import getRequest from "../../fun/getRequest";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import Spiner from "../../components/Spiner/Spiner";
import UploadInput from "../../components/UploadInput/UploadInput";
import HeaderCard from "../../components/HeaderCard/HeaderCard";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import postURL from "../../fun/postRequest";

const { TextArea } = Input;

const schema = yup.object().shape({
  productName: yup
    .string()
    .required("Обязательно поле")
    .min(5, "Минимум 5 символов")
    .max(50, "Не больше 50 символов"),
  description: yup
    .string()
    .required("Обязательно поле")
    .min(20, "Минимум 20 символов")
    .max(250, "Не больше 250 символов"),
});

export function CreatingCard() {
  const categoryAll = useQuery("categoryAll", () =>
    getRequest(categoriesAllURL)
  );
  const storageAll = useQuery("storageAll", () => getRequest(storageAllURL));

  const { $category, $storage, $state } = useContext(Context);
  const [modalActive, setModalActive] = useState(false);
  // const [disabled, setDisabled] = useState(true);
  $state.stateStorageAll = storageAll;
  const [addPhotoForm, setAddPhotoForm] = useState([]);
  const [nameForm, setNameForm] = useState();
  const [descriptionForm, setDescriptionForm] = useState();

  let creatingCard = {
    name: nameForm,
    category: $category.category,
    storage: $storage.storage,
    description: descriptionForm,
  };

  const formData = new FormData();
  formData.append("item", JSON.stringify(creatingCard));

  if (addPhotoForm.length > 0) {
    for (var i = 0; i < addPhotoForm.length; i++) {
      formData.append("image_list", addPhotoForm[i]);
    }
  }
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });
  const onSubmit = (data) => console.log(data);

  const mutation = useMutation((newProduct) =>
    postURL(itemsAddURL, newProduct)
  );
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
    navigate("/home");
  };

  if (categoryAll.isLoading || storageAll.isLoading) {
    return (
      <div style={{ left: "50vw", top: "50vh", position: "absolute" }}>
        <Spiner />
      </div>
    );
  }

  if (categoryAll.isError || storageAll.isError) {
    return (
      <ErrorComponent
        props={{
          category: categoryAll?.error?.request?.status,
          storage: storageAll?.error?.request?.status,
        }}
      ></ErrorComponent>
    );
  }
  return (
    <>
      <HeaderCard text={"Создать карточку вещи"} />
      <form onSubmit={handleSubmit(onSubmit)} className={st.form}>
        <div className={st.miniWrapper}>
          <label className={st.title}>Наименование *</label>
          <input
            {...register("productName")}
            onChange={(e) => {
              // e.target.value ? setDisabled(false) : setDisabled(true);
              setNameForm(e.target.value);
            }}
            className={st.input}
            type="text"
          />
          <p className={st.error}>{errors.productName?.message}</p>
        </div>
        <div className={st.miniWrapper}>
          <label className={st.title}>Категория</label>
          <Category category={""} width={"500"} data={categoryAll.data} />
        </div>
        <div className={st.miniWrapper}>
          <label className={st.title}>Место хранения</label>
          <MainSelectAdd storageDefault={""} />
        </div>
        <div className={st.miniWrapper}>
          <label className={st.title}>Описание *</label>
          <textarea
            {...register("description")}
            onChange={(e) => setDescriptionForm(e.target.value)}
            className={st.textarea}
            type="text"
          />
          <p className={st.error}>{errors.description?.message}</p>
        </div>
        <div className={st.miniWrapper}>
          <div>
            <label className={st.title}>Фотографии *</label>
            <span className={st.miniTitle}>Не более 5</span>
          </div>

          <UploadInput
            // dataPhoto={itemsData.images}
            setAddPhotoForm={setAddPhotoForm}
          />
        </div>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            setModalActive(true);
          }}
          className={st.buttonTest}
          disabled={!isValid}
        >
          Отправить
        </button>
        {/* <input className={st.buttonTest} type="submit" /> */}
      </form>

      <PopUp active={modalActive} setActive={setModalActive}>
        <div className={st.wrapperModal}>
          <img onClick={() => setModalActive(false)} src={close} alt="" />
          <h2>Сохранить новую вещь?</h2>
          <div className={st.buttonModal}>
            <button onClick={submit}>Да</button>

            <button onClick={() => navigate("/home")}>Нет</button>
          </div>
        </div>
      </PopUp>
    </>
  );
}
