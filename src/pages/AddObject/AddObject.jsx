import React, { useState, useRef } from "react";
import st from "./AddObject.module.scss";
import iconImg from "./../../img/svg/iconAddImg.svg";
import Select from "react-select";

const options = [
  {
    value: "cloth",
    label: "cloth",
  },
  {
    value: "trash",
    label: "trash",
  },
  {
    value: "technique",
    label: "technique",
  },
];
export default function AddObject() {
  const filePicker = useRef(null);
  const [img, setImg] = useState(null);

  const photo = (e) => {
    setImg(e.target.files);
    console.log(img);
  };

  const handlePick = () => {
    filePicker.current.click();
  };
  return (
    <>
      <header></header>
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
          {/* <div className={st.select}>
            <select className={st.input} name="categories" id="">
              <option className={st.option} value="">
                одежда
              </option>
              <option className={st.option} value="">
                хлам
              </option>
              <option className={st.option} value="">
                чулан
              </option>
            </select>
          </div> */}
          <div className={`${st.select} ${st.isActive}`}>
            <div className={st.selectHeader}>
              <span className={st.selectCurrent}>value 1</span>
              <div className={st.selectIcon}>&times;</div>
            </div>
            <div className={st.selectBody}>
              <div className={st.selectItem}>value 1</div>
              <div className={st.selectItem}>value 2</div>
              <div className={st.selectItem}>value 3</div>
              <div className={st.selectItem}>value 4</div>
              <div className={st.selectItem}>value 5</div>
            </div>
          </div>
          {/* <Select className={st.selectttt} options={options} /> */}
        </div>

        <div className={st.wrapper}>
          <label className={st.text} htmlFor="storage">
            Место хранения
          </label>
          {/* <div className={st.select}>
            <select
              className={`${st.select}  ${st.input}`}
              name="storage"
              id=""
            >
              <option value="">гараж</option>
              <option value="">дом</option>
              <option value="">чулан</option>
            </select>
          </div> */}
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
          <img onClick={handlePick} src={iconImg} alt="img" />
          <input
            className={st.hidden}
            type="file"
            ref={filePicker}
            onChange={photo}
            accept="image/*"
            id="photos"
            multiple
          />
        </div>

        <button>Отправить</button>
      </form>
    </>
  );
}
