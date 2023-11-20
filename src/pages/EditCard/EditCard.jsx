import { useLocation } from "react-router-dom";
import HeaderCard from "../../components/HeaderCard/HeaderCard";
import st from "./EditCard.module.scss";

import Category from "../../components/mainSelect/Category";

import MainSelectAdd from "../../components/MainSelectAdd/MainSelectAdd";

import UploadInput from "../../components/UploadInput/UploadInput";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import getUrl from "../../fun/getData";
import { categoriesAllURL, itemsURL } from "../../constants/api";
import Context from "../../utilities/Context/Context";
import axios from "axios";

async function create({ url, formData }) {
  return await axios.put(
    `https://rms2022.pythonanywhere.com/items/${url}/update/`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
}

export default function EditCard() {
  const { $category, $storage, $state } = useContext(Context);
  const location = useLocation();
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
  } = useQuery(`items${location.state}`, () =>
    getUrl(`${itemsURL}/${location.state}`)
  );
  const formData = new FormData();

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

  const {
    data: categoryAllData,
    isLoading: categoryAllIsLoading,
    isError: categoryAllIsError,
  } = useQuery("categoryAll", () => getUrl(categoriesAllURL));

  useEffect(() => {
    if (itemsIsSuccess) {
      setName(itemsData.name);
      setCategory(itemsData.category ? itemsData.category.name : "Не добавили");
      setDescription(itemsData.description);
      setStorage(itemsData.storage ? itemsData.storage.name : "Не добавили");
    }
  }, [itemsIsSuccess]);
  const mutation = useMutation((newProduct) => create(newProduct));
  const submit = (e) => {
    e.preventDefault();

    mutation.mutate({ formData: formData, url: location.state });
  };

  useEffect(() => {
   console.log( $state.photo?.length)
 
  }, [$state.photo]);

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
          <Category category={category} width={"500"} data={categoryAllData} />
        </div>
        <div className={st.miniWrapper}>
          <label className={st.title}>Место хранения</label>
          <MainSelectAdd storageDefault={storage} />
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
