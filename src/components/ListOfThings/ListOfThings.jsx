import { Col, Row } from "antd";
import st from "./ListOfThings.module.scss";
// import { useSelector } from "react-redux";
import share from "./../../img/svg/share.svg";
import trash from "./../../img/svg/trash.svg";
import edit from "./../../img/svg/edit.svg";
import iconPhoto from "./../../img/png/iconPhoto.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { itemsURL } from "./../../constants/api.js";
import { itemsAllURL } from "./../../constants/api.js";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRef } from "react";

async function getItems() {
  const { data } = await axios.get(itemsAllURL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  });
  return data;
}

export default function ListOfThings() {
  const divUtility = useRef(null);
  // const dataItemArray = useSelector((s) => s.sliceDataItem.dataItem);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const deletePost = useMutation(
    (e) => {
      return axios.delete(`${itemsURL}/${e}/delete`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
    },
    {
      onSuccess: () => queryClient.invalidateQueries(["items"]),
    }
  );
  const { isLoading, isError, error, data } = useQuery(["items"], getItems);

  console.log(data);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error! {error.message}</div>;
  }
  const xxx = (e) => {
    // divUtility.current.style.display='block';
    // console.log(divUtility);
  };

  const eee = (e) => {
    //  divUtility.current.style.display = "none";
  };
  return (
    <>
      <Row className={st.gridTitle}>
        <Col>Наименование</Col>
        <Col>Место хранения</Col>
        <Col>Категория</Col>
        <Col>Дата добавления</Col>
      </Row>
      {data.map((e, id) => {
        return (
          <div
            key={`key${id}`}
            onMouseEnter={xxx}
            onMouseLeave={eee}
            className={st.wrapper}
          >
            {/* нужно key */}
            <Row className={st.grid}>
              <div
                onClick={() => navigate("/thingsCard", { state: e.id })}
                className={st.allData}
              >
                <Col>
                  {e.images.length === 0 ? (
                    <img src={iconPhoto} />
                  ) : (
                    <img
                      src={`https://rms2022.pythonanywhere.com${e.images[0].image_url}`}
                      alt=""
                    />
                  )}

                  <div>{e.name}</div>
                </Col>
                <Col>{e.storage === null ? "Не добавили" : e.storage.name}</Col>
                <Col>
                  {e.category === null ? "Не добавили" : e.category.name}
                </Col>
                <Col>{e.created_at}</Col>
              </div>
              <Col className={st.endData}>
                <div id={e.id} ref={divUtility} className={st.allUtility}>
                  <img
                    onClick={() => console.log(`edit ${e.id}`)}
                    src={edit}
                    alt=""
                  />
                  <img
                    onClick={() => console.log(`share ${e.id}`)}
                    src={share}
                    alt=""
                  />
                  <img
                    onClick={() => deletePost.mutate(e.id)}
                    src={trash}
                    alt=""
                  />
                </div>
              </Col>
            </Row>
          </div>
        );
      })}
    </>
  );
}
