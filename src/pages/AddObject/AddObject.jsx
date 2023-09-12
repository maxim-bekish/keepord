import React, { useState } from "react";

import st from "./AddObject.module.scss";
import Button from "./../../components/Button/Button";
import { PictureOutlined } from "@ant-design/icons";
import { Form, Upload, Input } from "antd";
import arrow from "./../../img/svg/arrows_button.svg";
import close from "./../../img/svg/close.svg";
import { categoriesURL, storageAllURL } from "./../../constants/api";
import MainSelect from "../../components/mainSelect/MainSelect";
import { useSelector } from "react-redux";
import { categoriesAdd, storageAdd } from "./../../store/slice";

export default function AddObject() {
  const [fileList, setFileList] = useState([]);
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PictureOutlined style={{ fontSize: "32px" }} />
    </div>
  );

  const categoriesState = useSelector((s) => s.homePageReducer.categoriesState);
  const storageState = useSelector((s) => s.homePageReducer.storageState);

  const [form] = Form.useForm();
  const name = Form.useWatch("myName", form);

  let e = {
    nameId: name,
    categories: categoriesState.categoriesId,
    storage: storageState.storageId,
    description: "none",
  };
  console.log(categoriesState);
  return (
    <>
      <header className={st.header}>
        <div>
          <a className={st.down} href="/home">
            <img src={arrow} alt="arrow" />
          </a>
          <span>Создать карточку вещи </span>
        </div>
        <a className={st.down} href="#">
          <img src={close} alt="close" />
        </a>
      </header>
      <Form form={form} className={st.form}>
        <Form.Item
          label="Наименование *"
          name={"myName"}
          className={st.wrapper}
        >
          <Input className={st.input} id="name" type="text" />
        </Form.Item>

        <div className={`${st.wrapper} ${st.svg}`}>
          <label className={st.text} htmlFor="categories">
            Категория
          </label>

          <MainSelect
            width="500"
            defaultValue=""
            url={categoriesURL}
            x={categoriesAdd}
          />
        </div>
        <div className={`${st.wrapper} ${st.svg}`}>
          <label className={st.text} htmlFor="storage">
            Место хранения
          </label>
          <MainSelect
            width="500"
            defaultValue=""
            url={storageAllURL}
            x={storageAdd}
          />
        </div>
        <div className={st.wrapper}>
          <label className={st.text} htmlFor="description">
            Описание
          </label>
          <textarea
            register="description"
            className={`${st.input} ${st.description}`}
            type="text"
          />
        </div>
        <div className={`${st.wrapper} ${st.wrapperUpload} `}>
          <label className={st.text} htmlFor="photos">
            Фотографии * <br />
            <span className={st.miniTitle}>Не более 5</span>
          </label>
          {/* <input
            multiple
            type="file"
            id="fileLoaderButton"
            className={st.fileLoaderButton}
          />
          <img src={iconAdd} alt="ppp" className={st.fileUploaderPreview} />
          <div className={st.fileUploaderFileName}></div> */}
          <Upload
            register="photos"
            action="https://run.mocky.io/v3/0662a897-e2af-4141-ad0d-a85c21309918"
            listType="picture-card"
            multiple
            className={st.wrapperUpload}
            fileList={fileList}
            onChange={handleChange}
          >
            {fileList.length >= 5 ? null : uploadButton}
          </Upload>
        </div>
        <Button
          label={"Отправить"}
          widthButton={500}
          disabledButton={true}
          e={e}
        />
      </Form>
      {/* <button className={st.button}>Отпраddddвить</button> */}
    </>
  );
}
