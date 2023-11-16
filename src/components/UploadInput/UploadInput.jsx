import addImages from "./../../img/svg/addImages.svg";
import closed from "./../../img/svg/close.svg";
import { useState, useRef, useEffect } from "react";
import st from "./UploadInput.module.scss";

export default function UploadInput({ dataPhoto, setAddPhotoForm }) {
  const filePicker = useRef(null);
  const [allImages, setAllImages] = useState([]);
  // const [deleteImages, setDeleteAllImages] = useState([]);

  const handleChange = (e) => {
    setAddPhotoForm(e.target.files);
    console.log(e.target.files);
    for (let i = 0; i < e.target.files.length; i++) {
      var reader = new FileReader();
      reader.onload = (e) => {
        setAllImages((allImg) => {
          return [...allImg, { image_url: e.target.result }];
        });
      };

      reader.readAsDataURL(e.target.files[i]);
    }
  };
  console.log(allImages);
  const close = (url, id) => () => {
    const newArray = allImages.filter((e) => {
      if (url !== e.image_url) {
        return e;
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
            image_url: `https://rms2022.pythonanywhere.com${image_url}`,
            id: id,
          },
        ];
      }, []);
      setAllImages((allImages) => [...allImages, ...mapDataPhoto]);
    }
  }, [dataPhoto]);

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
                key={e.image_url}
                src={e.image_url}
                alt=""
              />
              <img
                onClick={close(e.image_url)}
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
