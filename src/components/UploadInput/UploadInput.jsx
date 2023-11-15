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
    console.log(e.target.files);
    for (let i = 0; i < e.target.files.length; i++) {
      var reader = new FileReader();
      reader.onload = (e) => {
        imagesData.push(e.target);

        setFileList(imagesData);
      };
      reader.readAsDataURL(e.target.files[i]);
    }
  };
  function closeImg() {
    const closeImg = document.querySelectorAll(".close");

  }
  const allImages = [];
  if (dataPhoto) {
    for (let i = 0; i < dataPhoto.length; i++) {
      allImages.push({
        image_url: `https://rms2022.pythonanywhere.com${dataPhoto[i].image_url}`,
        id: dataPhoto[i].id,
      });
    }
  }
  for (let i = 0; i < fileList.length; i++) {
    allImages.push({ image_url: fileList[i].result });
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
          {allImages.map((e) => (
            <div
              key={e.image_url}
              className={`${st.boxOnePhoto} close closed${e.image_url.substring(
                10,
                20
              )} `}
            >
              <img
                className={st.photo}
                key={e.image_url}
                src={e.image_url}
                alt="111"
              />
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
