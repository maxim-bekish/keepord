import addImages from "./../../img/svg/addImages.svg";
import closed from "./../../img/svg/close.svg";
import { useState, useRef } from "react";
import st from "./UploadInput.module.scss";

export default function UploadInput({ dataPhoto, setAddPhotoForm }) {
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
  function closeImg() {
    const closeImg = document.querySelectorAll(".close");
    console.log(closeImg);
  }

  return (
    <section>
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
            <div
              key={e}
              className={`${st.boxOnePhoto} close closed${e.substring(
                1000,
                1010
              )} `}
            >
              <img className={st.photo} key={e} src={e} alt="111" />
              <img
                onClick={closeImg}
                className={st.closed}
                src={closed}
                alt=""
              />
            </div>
          ))}
          <div
            onClick={() => filePicker.current.click()}
            className={st.boxSubmit}
          >
            <img className={st.submit} src={addImages} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}
