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
const { TextArea } = Input;





export default function CreatingCard() {
  const [fileList, setFileList] = useState([]);
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PictureOutlined style={{ fontSize: "32px" }} />
    </div>
  );


function addItems(){
  console.log(dataFormCreatingCard);
}

  const categoriesState = useSelector((s) => s.homePageReducer.categoriesState);
  const storageState = useSelector((s) => s.homePageReducer.storageState);

  const [form] = Form.useForm();
  const name = Form.useWatch("myName", form);
  const description = Form.useWatch("myDescription", form);
// const [formName,useFormName]=useState('не выбрано');
  let dataFormCreatingCard = {
    name: name,
    categories: categoriesState.categoriesId,
    storage: storageState.storageId,
    descriptionText: description,
  };

  const [value, setValue] = useState("");

const navigate = useNavigate();
const goBack = () => navigate(-1);
  return (
    <>
      <header className={st.header}>
        <div>
          <div onClick={goBack}  >
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

        <div className={`${st.wrapper} ${st.svg}`}>
          <label className={st.text} htmlFor="categories">
            Категория
          </label>
          <div >
            <MainSelect
              width="500"
              defaultValue="categories"
              url={categoriesAllURL}
              reducersCategoriesAdd={categoriesAdd}
            />
          </div>
        </div>
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
          dataFormCreatingCard={dataFormCreatingCard}
          onClick={addItems}
        />
      </Form>
      {/* <button className={st.button}>Отпраddddвить</button> */}
    </>
  );
}
