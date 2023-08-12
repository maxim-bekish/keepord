import React, { useState } from "react";
import st from "./AddObject.module.scss";
import { useForm } from "react-hook-form";
import {PictureTwoTone   } from "@ant-design/icons";
import { ConfigProvider, Select,Upload } from "antd";


const options = [
  { value: "jack", label: "Jack" },
  { value: "lucy", label: "Lucy" },
  { value: "Yiminghe", label: "yiminghe" },
  { value: "disabled", label: "Disabled" },
  { value: "jack1", label: "Jack" },
  { value: "lucy1", label: "Lucy" },
  { value: "Yiminghe1", label: "yiminghe" },
  { value: "disabled1", label: "Disabled" },
];







  const  onSubmit = (event) => {
    console.log(event)
  }
export default function AddObject() {



  const [fileList, setFileList] = useState([]);
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PictureTwoTone  style={{ fontSize: "32px" }} />
      <div>Загрузить</div>
    </div>
  );


  return (
    <>
      <form className={st.form}>
        <div className={st.wrapper}>
          <label className={st.text} htmlFor="name">
            Наименование *
          </label>
          <input className={st.input} id="name" type="text" />
        </div>

        <div className={st.wrapper}>
          <label className={st.text} htmlFor="categories">
            Категория
          </label>

          <ConfigProvider
            theme={{
              components: {
                Select: {
                  colorBorder: `#3c6255`,
                  colorPrimary: "#3c6255",
                  controlHeight: 66,
                  fontSize: 22,
                  colorIcon: "rgba(30, 167, 30)",
                  fontSizeIcon: 20,
                  borderRadius: 10,
                  lineWidth: 1,
                  colorPrimaryTextActive: "none",
                  algorithm: true, // Enable algorithm
                },
              },
            }}
          >
            <Select
              defaultValue="места"
              style={{ width: 500 }}
              // onChange={handleChange}
              options={[
                { value: "jack", label: "Гараж" },
                { value: "lucy", label: "Дом" },
                { value: "Yiminghe", label: "Погреб" },
                { value: "disabled", label: "Балкон" },
                { value: "jack1", label: "дача" },
                { value: "lucy1", label: "вон" },
                { value: "Yiminghe1", label: "тд" },
                { value: "disabled1", label: "тп" },
              ]}
            />
          </ConfigProvider>
        </div>

        <div className={st.wrapper}>
          <label className={st.text} htmlFor="storage">
            Место хранения
          </label>
          <ConfigProvider
            theme={{
              components: {
                Select: {
                  colorBorder: `#3c6255`,
                  colorPrimary: "#3c6255",
                  controlHeight: 66,
                  fontSizeIcon: 20,
                  fontSize: 22,
                  borderRadius: 10,
                  lineWidth: 1,
                  colorPrimaryTextActive: "none",
                  algorithm: true, // Enable algorithm
                },
              },
            }}
          >
            <Select
              defaultValue="lucy"
              style={{ width: 500 }}
              // onChange={handleChange}
              options={options}
            />
          </ConfigProvider>
        </div>

        <div className={st.wrapper}>
          <label className={st.text} htmlFor="description">
            Описание
          </label>
          <input className={st.input} id="description" type="text" />
        </div>

        <div className={st.wrapper}>
          <label className={st.text} htmlFor="photos">
            Фотографии *
          </label>

          <Upload
            action="https://run.mocky.io/v3/0662a897-e2af-4141-ad0d-a85c21309918"
            listType="picture-card"
            multiple
            fileList={fileList}
            onChange={handleChange}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
        </div>

        <button>Отправить</button>
      </form>
    </>
  );
}
