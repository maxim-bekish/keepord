import { Col, Row } from "antd";
import st from "./ListOfThings.module.scss";
// import { useSelector } from "react-redux";
import share from "./../../img/svg/share.svg";
import trash from "./../../img/svg/trash.svg";
import edit from "./../../img/svg/edit.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { itemsURL } from "./../../constants/api.js";
import { itemsAllURL } from "./../../constants/api.js";
import { useMutation, useQuery, useQueryClient } from "react-query";

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
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <>
      <Row className={st.gridTitle}>
        <Col>Наименование</Col>
        <Col>Место хранения</Col>
        <Col>Категория</Col>
        <Col>Дата добавления</Col>
        <Col></Col>
      </Row>
      {data.map((e) => {
        return (
          <div className={st.wrapper}>
            {/* нужно key */}
            <Row className={st.grid}>
              <div
                onClick={() => navigate("/thingsCard", { state: e.id })}
                className={st.allData}
              >
                <Col>{e.name}</Col>
                <Col>{e.storage.name}</Col>
                <Col>{e.category.name}</Col>
                <Col>{e.created_at}</Col>
              </div>
              <Col className={st.endData}>
                <div>
                  <img src={edit} alt="" />
                  <img src={share} alt="" />
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
