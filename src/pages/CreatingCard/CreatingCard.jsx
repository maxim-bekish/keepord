import React, { useState } from "react";

import st from "./CreatingCard.module.scss";
import Button from "../../components/Button/Button";
import { PictureOutlined } from "@ant-design/icons";
import { Form, Upload, Input } from "antd";
import arrow from "./../../img/svg/arrows_button.svg";
import close from "./../../img/svg/close.svg";
import { categoriesAllURL, storageAllURL } from "../../constants/api";
import Category from "../../components/mainSelect/Category";

import MainSelectAdd from "../../components/MainSelectAdd/MainSelectAdd";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesAdd, storageAdd } from "../../store/slice";
import iconAdd from "./../../img/svg/iconAddImg.svg";
const { TextArea } = Input;

export default function CreatingCard() {
  const [fileList, setFileList] = useState([]);
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PictureOutlined style={{ fontSize: "32px" }} />
    </div>
  );

  function addItems() {
    console.log(dataFormCreatingCard);
  }
  function xxx(event) {
    console.log(event.target.files);
  }
  // const categoriesState = useSelector((s) => s.homePageReducer.categoriesState);
  // const storageState = useSelector((s) => s.homePageReducer.storageState);

  const [form] = Form.useForm();
  const name = Form.useWatch("myName", form);
  const description = Form.useWatch("myDescription", form);
  const photo = Form.useWatch("myPhoto", form);
  // const [formName,useFormName]=useState('не выбрано');
  let dataFormCreatingCard = {
    name: name,
    // category: categoriesState.categoriesId,
    // storage: storageState.storageId,
    description: description,
    images: fileList,
  };

  const [value, setValue] = useState("");

  const navigate = useNavigate();
  const goBack = () => navigate(-1);
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
          // rules={[
          //   {
          //     required: true,
          //   },
          // ]}
        >
          <Input className={st.input} type="text" />
        </Form.Item>
        <Form.Item lebel="Категория">
          <div className={`${st.wrapper} ${st.svg}`}>
            <label className={st.text} htmlFor="categories">
              Категория
            </label>
            <div>
              <Category width={"500"} url={categoriesAllURL} />
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
        <Form.Item label="Фотографии *" className={st.wrapper}>
          <div className={`${st.wrapper} ${st.wrapperUpload} `}>
            <span className={st.miniTitle}>Не более 5</span>

            {/* <input
              multiple
              type="file"
              id="fileLoaderButton"
              className={st.fileLoaderButton}
            /> */}
            {/* <img src={iconAdd} alt="ppp" className={st.fileUploaderPreview} /> */}
            {/* <div className={st.fileUploaderFileName}></div> */}
            <Upload
              //  onChange={xxx}
              register="photos"
              // action="https://rms2022.pythonanywhere.com/items/add/"
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
          onClick={addItems}
        />
      </Form>
      {/* <button className={st.button}>Отпраddddвить</button> */}
    </>
  );
}
