import React, { useContext, useState } from "react";

import st from "./CreatingCard.module.scss";
import Button from "../../components/Button/Button";
import { PictureOutlined } from "@ant-design/icons";
import { Form, Upload, Input } from "antd";
import arrow from "./../../img/svg/arrows_button.svg";
import close from "./../../img/svg/close.svg";
import { categoriesAllURL } from "../../constants/api";
import Category from "../../components/mainSelect/Category";

import MainSelectAdd from "../../components/MainSelectAdd/MainSelectAdd";
import { useNavigate } from "react-router-dom";
import Context from "../../utilities/Context/Context";
import { useMutation } from "react-query";
import axios from "axios";

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
export default function CreatingCard() {
  const { $category, $storage } = useContext(Context);
  // const [fileList, setFileList] = useState([]);
  const [xxx, setXxx] = useState([]);
  // const handleChange = ({ fileList: newFileList }) => {
  //   setFileList(newFileList);
  //   console.log(fileList);
  // };

  const handleChange = (e) => {
    setXxx(e.target.files);
  };
  const uploadButton = (
    <div>
      <PictureOutlined style={{ fontSize: "32px" }} />
    </div>
  );
  const [form] = Form.useForm();
  const name = Form.useWatch("myName", form);
  const description = Form.useWatch("myDescription", form);
  const photo = Form.useWatch("myPhoto", form);

  let creatingCard = {
    name: name,
    category: $category.category,
    storage: $storage.storage,
    description: description,
  };

  const formData = new FormData();
  formData.append("item", JSON.stringify(creatingCard));

  for (let i = 0; i < xxx.length; i++) {
    formData.append("image_list", xxx[i]);
  }

  const [value, setValue] = useState("");
  const mutation = useMutation((newProduct) => create(newProduct));
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
    navigate('/home');
  };
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

            <input type="file" multiple onChange={handleChange} />
            {/* <Upload
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
            </Upload> */}
          </div>
        </Form.Item>
     
        <button style={{ width: "500px" }} onClick={submit}>
          Отправить
        </button>
      </Form>
      {/* <button className={st.button}>Отпраddddвить</button> */}
    </>
  );
}
