import React, { useState } from "react";

import st from "./CreatingCard.module.scss";
import Button from "../../components/Button/Button";
import { PictureOutlined } from "@ant-design/icons";
import { Form, Upload, Input } from "antd";
import arrow from "./../../img/svg/arrows_button.svg";
import close from "./../../img/svg/close.svg";
import { categoriesAllURL, storageAllURL } from "../../constants/api";
import MainSelect from "../../components/mainSelect/MainSelect";
import MainSelectAdd from "../../components/MainSelectAdd/MainSelectAdd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesAdd, storageAdd } from "../../store/slice";
import iconAdd from "./../../img/svg/iconAddImg.svg";
import axios from "axios";
const { TextArea } = Input;

export default function CreatingCardCopy() {
  const [fileList, setFileList] = useState([]);
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PictureOutlined style={{ fontSize: "32px" }} />
    </div>
  );

 
  // function xxx(event) {
  //   console.log(event.target.files);
  // }
  const categoriesState = useSelector((s) => s.homePageReducer.categoriesState);
  const storageState = useSelector((s) => s.homePageReducer.storageState);

  const [form] = Form.useForm();
  const name = Form.useWatch("myName", form);
  const description = Form.useWatch("myDescription", form);
  const photo = Form.useWatch("myPhoto", form);
  // const [formName,useFormName]=useState('не выбрано');
  let dataFormCreatingCard = {
    name: name,
    category: categoriesState.categoriesId,
    storage: storageState.storageId,
    description: description,
    images: fileList,
  };
   const formData = new FormData();
 formData.append("images", dataFormCreatingCard.images);
//  formData.append("description", dataFormCreatingCard.description);
//  formData.append("storage", dataFormCreatingCard.storage);
//  formData.append("category", dataFormCreatingCard.category);
//  formData.append("name", dataFormCreatingCard.name);
    
  const [value, setValue] = useState("");

  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  //  const props = {
 
  //    headers: {
      
  //     //  "Access-Control-Allow-Origin": "*",
  //      "Content-Type": "multipart/form-data",
  //      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
  //    },
  //    action: "https://rms2022.pythonanywhere.com/items/add",
  //    body: formData,
  //  }; 
  return (
    <>
      <header className={st.header}>
        <div>
          <div onClick={() => navigate(-1)}>
            <img src={arrow} alt="arrow" />
          </div>
          <span>Создать карточку вещи </span>
        </div>
        <a className={st.down} href="#">
          <img src={close} alt="close" />
        </a>
      </header>
      <Form form={form} className={st.form} colon={false}>
        <Form.Item
          label="Наименование *"
          name={"myName"}
          className={st.wrapper}
        >
          <Input className={st.input} type="text" />
        </Form.Item>

        <Form.Item label="Категория">
          <MainSelect
            width="500"
            defaultValue="categories"
            url={categoriesAllURL}
            reducersCategoriesAdd={categoriesAdd}
          />
        </Form.Item>

        <div className={`${st.wrapper} ${st.svg}`}>
          <label className={st.text} htmlFor="storage">
            Место хранения
          </label>

          <MainSelectAdd
            width="500"
            defaultValue="storage"
            url={storageAllURL}
            reducersCategoriesAdd={storageAdd}
          />
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
        <Form.Item label="Фотографии *" className={st.wrapper}>
          <div className={`${st.wrapper} ${st.wrapperUpload} `}>
            <span className={st.miniTitle}>Не более 5</span>

            <Upload
              // {...props}
            
              register="photos"
              listType="picture-card"
              multiple
              className={st.wrapperUpload}
              fileList={fileList}
              onChange={handleChange}
            >
              {fileList.length >= 5 ? null : uploadButton}
            </Upload>
          </div>
        </Form.Item>
        <Button
          label={"Отправить"}
          widthButton={500}
          disabledButton={true}
          dataFormCreatingCard={dataFormCreatingCard}
          // onClick={() => console.log(dataFormCreatingCard)}
        />
       
      </Form>
      {/* <button className={st.button}>Отпраddddвить</button> */}
    </>
  );
}
