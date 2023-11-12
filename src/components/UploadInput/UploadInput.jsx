import addImages from "./../../img/svg/addImages.svg";
import closed from "./../../img/svg/close.svg";
import { useState, useRef } from "react";
import st from "./UploadInput.module.scss";

export default function UploadInput({ setAddPhotoForm }) {
  const filePicker = useRef(null);
  const [fileList, setFileList] = useState([]);
  const handleChange = (e) => {
    setAddPhotoForm(e.target.files);
    let imagesData = [];
    for (let i = 0; i < e.target.files.length; i++) {
      var reader = new FileReader();
      reader.onload = (e) => {
        imagesData.push(e.target.result);
        setFileList(imagesData);
      };
      reader.readAsDataURL(e.target.files[i]);
    }
  };

  return (
    <section>
      <div className={st.title}>
        <h4>Фотографии *</h4>
        <span>Не более 5</span>
      </div>
      <div className={st.data}>
        <input
          ref={filePicker}
          className={st.hidden}
          type="file"
          multiple
          onChange={handleChange}
        />
        <div className={st.allImg}>
          {fileList.map((e) => (
            <div  className={st.boxOnePhoto}>
              <img className={st.photo} key={e} src={e} alt="111" />
              <img className={st.closed} src={closed} alt="" />
            </div>
          ))}
          <div
            onClick={() => filePicker.current.click()}
            className={st.boxSubmit}
          >
            <img className={st.submit} src={addImages} alt="" />
          </div>
        </div>
      </div>{" "}
    </section>
  );
}
