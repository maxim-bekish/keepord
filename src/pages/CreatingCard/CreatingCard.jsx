import React, { useContext, useState } from "react";
import st from "./CreatingCard.module.scss";
import { Form, Input } from "antd";
import close from "./../../img/svg/close.svg";
import { categoriesAllURL, storageAllURL } from "../../constants/api";
import Category from "../../components/mainSelect/Category";

import MainSelectAdd from "../../components/MainSelectAdd/MainSelectAdd";
import { useNavigate } from "react-router-dom";
import Context from "../../utilities/Context/Context";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import PopUp from "../../components/popUp/popUp";
import getUrl from "../../fun/getData";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import Spiner from "../../components/Spiner/Spiner";
import UploadInput from "../../components/UploadInput/UploadInput";
import HeaderCard from "../../components/HeaderCard/HeaderCard";
const { TextArea } = Input;

async function create(data) {
  return await axios.post(
    `https://rms2022.pythonanywhere.com/items/add/`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
}
export function CreatingCard() {
  const categoryAll = useQuery("categoryAll", () => getUrl(categoriesAllURL));
  const storageAll = useQuery("storageAll", () => getUrl(storageAllURL));

  const { $category, $storage, $state } = useContext(Context);
  const [modalActive, setModalActive] = useState(false);

  $state.stateStorageAll = storageAll;
  const [addPhotoForm, setAddPhotoForm] = useState([]);

  const [form] = Form.useForm();
  const name = Form.useWatch("myName", form);
  const description = Form.useWatch("myDescription", form);
  // const photo = Form.useWatch("myPhoto", form);

  let creatingCard = {
    name: name,
    category: $category.category,
    storage: $storage.storage,
    description: description,
  };

  const formData = new FormData();
  formData.append("item", JSON.stringify(creatingCard));

  if (addPhotoForm.length > 0) {
    for (var i = 0; i < addPhotoForm.length; i++) {
      formData.append("image_list", addPhotoForm[i]);
    }
  }

  const [value, setValue] = useState("");
  const mutation = useMutation((newProduct) => create(newProduct));
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
    navigate("/home");
  };
  // const {
  //   data: categoryAllData,
  //   isLoading: categoryAllIsLoading,
  //   isError: categoryAllIsError,
  // } = useQuery("categoryAll", () => getUrl(categoriesAllURL));
  if (categoryAll.isLoading || storageAll.isLoading) {
    return (
      <div style={{ left: "50vw", top: "50vh", position: "absolute" }}>
        <Spiner />
      </div>
    );
  }

  if (categoryAll.isError && storageAll.isError) {
    switch (true) {
      case categoryAll.isError:
        // setActiveError(true);
        return <ErrorComponent props={categoryAll.error}></ErrorComponent>;

      case storageAll.isError:
        // setActiveError(true);
        return <ErrorComponent props={storageAll.error}></ErrorComponent>;

      default:
        break;
    }
    // return (
    //   <ErrorComponent props={$state.stateStorageAll.error}></ErrorComponent>
    // );
  }
  return (
    <>
      {/* <div>
        <HeaderCard text={"Создать карточку вещи"} />

        <Form form={form} className={st.form} colon={false}>
          <Form.Item
            label="Наименование *"
            name={"myName"}
            className={st.wrapper}
          >
            <Input className={st.input} type="text" />
          </Form.Item>
          <Form.Item lebel="Категория">
            <div className={`${st.wrapper} ${st.svg}`}>
              <label className={st.text} htmlFor="categories">
                Категория
              </label>
              <div>
                <Category width={"500"} data={categoryAll.data} />
              </div>
            </div>
          </Form.Item>
          <div className={`${st.wrapper} ${st.svg}`}>
            <label className={st.text} htmlFor="storage">
              Место хранения
            </label>
            <MainSelectAdd />
          </div>
          <Form.Item
            label="Описание *"
            name={"myDescription"}
            className={st.wrapper}
          >
            <TextArea
              type="text"
              className={`${st.input} ${st.description}`}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </Form.Item>
          <div className={`${st.wrapper} ${st.wrapperUpload} `}>
            <div>
              <label className={st.title}>Фотографии *</label>
              <span className={st.miniTitle}>Не более 5</span>
            </div>
            <UploadInput setAddPhotoForm={setAddPhotoForm} />
          </div>
          <button
            className={st.buttonTest}
            onClick={() => setModalActive(true)}
          >
            Отправить
          </button>
        </Form>
      </div> */}

      <HeaderCard text={"Создать карточку вещи"} />
      <form className={st.form}>
        <div className={st.miniWrapper}>
          <label className={st.title}>Наименование *</label>
          <input className={st.input} type="text" />
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
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={st.textarea}
            type="text"
          />
        </div>
        <div className={st.miniWrapper}>
          <div>
            <label className={st.title}>Фотографии *</label>
            <span className={st.miniTitle}>Не более 5</span>
          </div>
          {/* <div>
             <img
              onClick={(e) => console.log(e.target)}
              id={itemsData.images[0].id}
              style={{ width: "150px", height: "150px" }}
              src={`https://rms2022.pythonanywhere.com${itemsData.images[0].image_url}`}
              alt=""
            /> 
        
          </div>*/}
          <UploadInput
            // dataPhoto={itemsData.images}
            setAddPhotoForm={setAddPhotoForm}
          />
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            setModalActive(true);
          }}
          className={st.buttonTest}
        >
          Отправить
        </button>
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
