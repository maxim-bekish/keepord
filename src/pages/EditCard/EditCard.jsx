import { useLocation, useNavigate, useParams } from "react-router-dom";
import HeaderCard from "../../components/HeaderCard/HeaderCard";
import st from "./EditCard.module.scss";

import Category from "../../components/mainSelect/Category";

import MainSelectAdd from "../../components/MainSelectAdd/MainSelectAdd";

import UploadInput from "../../components/UploadInput/UploadInput";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import getRequest from "../../fun/getRequest";
import { categoriesAllURL, itemsURL } from "../../constants/api";
import Context from "../../utilities/Context/Context";
import axios from "axios";
import { getCookie } from "../../fun/getCookie";
import refreshToken from "../../fun/refreshToken";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import Spiner from "../../components/Spiner/Spiner";

async function create({ url, formData, navigate }) {
  return await axios

    .put(`https://rms2022.pythonanywhere.com/items/${url}/update/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getCookie("access")}`,
      },
    })
    .then((res) => {
      navigate(`/card/${url}`);
    })
    .catch((error) => {
      if (error.response.status === 401) {
        refreshToken();
        create({ url, formData, navigate });
      }
    });
}

export default function EditCard() {
  const navigate = useNavigate();
  const { idCard } = useParams();

  const { $category, $storage } = useContext(Context);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [storage, setStorage] = useState("");
  const [description, setDescription] = useState("");
  const [addPhotoForm, setAddPhotoForm] = useState([]);
  const [deleteAllImages, setDeleteAllImages] = useState([]);
  const [disabled, setDisabled] = useState(true);

  const {
    data: itemsData,
    isSuccess: itemsIsSuccess,
    isLoading: itemsIsLoading,
    isError: itemsIsError,
    error: itemsError,
    refetch: itemsRefetch,
  } = useQuery(`items${idCard}`, () => getRequest(`${itemsURL}/${idCard}`));

  const formData = new FormData();
  const {
    data: categoryAllData,
    isLoading: categoryAllIsLoading,
    isError: categoryAllIsError,
    error: categoryAllError,
    refetch: categoryAllRefetch,
  } = useQuery("categoryAll", () => getRequest(categoriesAllURL));

  const mutation = useMutation((newProduct) => create(newProduct));
  const submit = (e) => {
    e.preventDefault();
    mutation.mutate({ formData: formData, url: idCard, navigate: navigate });
  };

  useEffect(() => {
    if (name.trim().length === 0 || description.trim().length === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [name, description]);

  useEffect(() => {
    if (itemsIsSuccess) {
      setName(itemsData.name);
      setCategory(itemsData.category ? itemsData.category : "Не добавили");
      console.log(itemsData);
      setDescription(itemsData.description);
      setStorage(itemsData.storage ? itemsData.storage : "Не добавили");
    }
  }, [itemsData]);

  let resultData = {
    name: name,
    description: description,
    category: $category.category,
    storage: $storage.storage,
  };

  formData.append("item", JSON.stringify(resultData));

  if (deleteAllImages.length > 0) {
    formData.append("image_delete_list", deleteAllImages);
  }

  if (addPhotoForm.length > 0) {
    for (let i = 0; i < addPhotoForm.length; i++) {
      formData.append("image_list", addPhotoForm[i]);
    }
  }

  if (itemsIsLoading || categoryAllIsLoading) {
    return (
      <div style={{ left: "50vw", top: "50vh", position: "absolute" }}>
        <Spiner />
      </div>
    );
  }

  if (itemsIsError || categoryAllIsError) {
    if (
      categoryAllError?.response?.status === 401 ||
      itemsError?.response?.status === 401
    ) {
      refreshToken();
      itemsRefetch();
      categoryAllRefetch();
    }
    return (
      <ErrorComponent
        props={{
          categoryAll: categoryAllError?.response?.status,
          items: itemsError?.response?.status,
        }}
      ></ErrorComponent>
    );
  }

  return (
    <>
      <HeaderCard text={"Редактировать карточку вещи"} />
      <section className={st.form}>
        <div className={st.miniWrapper}>
          <label className={st.title}>Наименование *</label>
          <input
            className={st.input}
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
          />
        </div>
        <div className={st.miniWrapper}>
          <label className={st.title}>Категория</label>
          <Category
            category={category.name}
            width={"500"}
            data={categoryAllData}
          />
        </div>
        <div className={st.miniWrapper}>
          <label className={st.title}>Место хранения</label>
          <MainSelectAdd storageDefault={storage.name} />
        </div>
        <div className={st.miniWrapper}>
          <label className={st.title}>Описание *</label>
          <textarea
            className={st.textarea}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            type="text"
          />
        </div>
        <div className={st.miniWrapper}>
          <div>
            <label className={st.title}>Фотографии *</label>
            <span className={st.miniTitle}>Не более 5</span>
          </div>

          <UploadInput
            setDeleteAllImages={setDeleteAllImages}
            dataPhoto={itemsData.images}
            setAddPhotoForm={setAddPhotoForm}
          />
        </div>
        <button disabled={disabled} onClick={submit} className={st.buttonTest}>
          Сохранить
        </button>
        {/* <button onClick={() => console.log(addPhotoForm, deleteAllImages)}>
          1231231231232131
        </button> */}
      </section>
    </>
  );
}
