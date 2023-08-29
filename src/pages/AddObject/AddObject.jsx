import React, { useState } from "react";
import { useForm } from "react-hook-form";
import st from "./AddObject.module.scss";
import { PictureOutlined } from "@ant-design/icons";
import { ConfigProvider, Select, Upload } from "antd";
import arrow from "./../../img/svg/arrows_button.svg";
import close from "./../../img/svg/close.svg";
import Button from "./../../components/Button/Button";
let access = localStorage.getItem("access");
console.log(access);
const urlCategories = "https://rms2022.pythonanywhere.com/categoris/";
const optionsCategories = [];
fetch(
  urlCategories
  //   , {
  //   method: "GET",
  //   headers: {
  //    'access': access,
  //   },
  // }
)
  .then((www) => www.json())
  .then((result) =>
    sessionStorage.setItem("categories", JSON.stringify(result))
  );

let categories = sessionStorage.getItem("categories");

JSON.parse(categories)
  // .sort((a, b) => a.id - b.id)
  .forEach((element) => {
    optionsCategories.push({ value: element.id, label: element.name });
  });

const handleChangee = (event) => {
  optionsCategories.length === event ? console.log("yes") : console.log("no");
};

// 1
// 1
// 1
// 1
// 1
// 1
export default function AddObject() {
  const { register, handleSubmit } = useForm({ mode: "all" });
  const onSubmit = (event) => {
    console.log(event);
  };
  const [fileList, setFileList] = useState([]);
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PictureOutlined style={{ fontSize: "32px" }} />
    </div>
  );

  return (
    <>
      <header className={st.header}>
        <div>
          <a className={st.down} href="#">
            <img src={arrow} alt="arrow" />
          </a>
          <span>Создать карточку вещи </span>
        </div>
        <a className={st.down} href="#">
          <img src={close} alt="close" />
        </a>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className={st.form}>
        <div className={st.wrapper}>
          <label className={st.text} htmlFor="name">
            Наименование *
          </label>
          <input
            {...register("firstName")}
            className={st.input}
            id="name"
            type="text"
          />
        </div>

        <div className={`${st.wrapper} ${st.svg}`}>
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
                  controlOutlineWidth: 0,
                  fontSize: 22,
                  fontSizeIcon: 20,
                  color: "red",
                  borderRadius: 10,
                  lineWidth: 1,
                  colorPrimaryTextActive: "none",
                  algorithm: true, // Enable algorithm
                },
              },
            }}
          >
            <Select
              {...register("categories")}
              defaultValue=""
              style={{ width: 500 }}
              onChange={handleChangee}
              options={optionsCategories}
            />
          </ConfigProvider>
        </div>

        <div className={`${st.wrapper} ${st.svg}`}>
          <label className={st.text} htmlFor="storage">
            Место хранения
          </label>
          <ConfigProvider
            theme={{
              components: {
                Select: {
                  controlOutlineWidth: 0,
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
              register="storage"
              defaultValue="lucy"
              style={{ width: 500 }}
              // onChange={handleChange}
              // options={options}
            />
          </ConfigProvider>
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

        {/* <Button label={"Сохранить"} widthButton={500} disabledButton={true} /> */}
        <button className={st.button}>Отправить</button>
      </form>
    </>
  );
}
