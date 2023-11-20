import addImages from "./../../img/svg/addImages.svg";
import closed from "./../../img/svg/close.svg";

import { useState, useRef, useEffect, useContext } from "react";
import st from "./UploadInput.module.scss";
import Context from "../../utilities/Context/Context";

export default function UploadInput({
  dataPhoto,
  setAddPhotoForm,
  setDeleteAllImages,
}) {
  const filePicker = useRef(null);
  const [allImages, setAllImages] = useState([]);
  const { $state } = useContext(Context);
  const [timeOffArray, setTimeOffArray] = useState([]);
  const fileArray = [];
  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      fileArray.push(e.target.files[i]);
      var reader = new FileReader();
      reader.onload = (e) => {
        setAllImages((allImg) => {
          return [...allImg, { id: e.total, image_url: e.target.result }];
        });
      };

      reader.readAsDataURL(e.target.files[i]);

      let newArray = [...fileArray, ...timeOffArray];
      setTimeOffArray(newArray);
      setAddPhotoForm(newArray);
      console.log(newArray);
    }
  };

  const close = (url, id) => () => {
    for (let i = 0; i < timeOffArray.length; i++) {
      if (timeOffArray[i].size === id) {
        timeOffArray.splice(i, 1);
        setTimeOffArray(timeOffArray);
      }
    }
    let arrays = [...fileArray, ...timeOffArray];

    setAddPhotoForm(arrays);

    const newArray = allImages.filter((e) => {
      if (url !== e.image_url) {
        return e;
      }
      if (e.image_url.includes("https://rms2022")) {
        setDeleteAllImages((q) => [...q, e.id]);
      }
    });

    setAllImages(newArray);
  };

  useEffect(() => {
    if (dataPhoto) {
      const mapDataPhoto = dataPhoto.reduce((result, { image_url, id }) => {
        return [
          ...result,
          {
            id: id,
            image_url: `https://rms2022.pythonanywhere.com${image_url}`,
          },
        ];
      }, []);
      setAllImages((allImages) => [...allImages, ...mapDataPhoto]);
      
     
    }
  }, [dataPhoto]);
   $state.photo = allImages;

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
            <div key={e.image_url} className={`${st.boxOnePhoto} close `}>
              <img
                className={st.photo}
                key={Math.random()}
                src={e.image_url}
                alt=""
              />
              <img
                onClick={close(e.image_url, e.id)}
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
