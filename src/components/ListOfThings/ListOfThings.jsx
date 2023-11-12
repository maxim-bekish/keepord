import { Col, Row } from "antd";
import st from "./ListOfThings.module.scss";
// import { useSelector } from "react-redux";
import share from "./../../img/svg/share.svg";
import close from "./../../img/svg/close.svg";
import trash from "./../../img/svg/trash.svg";
import edit from "./../../img/svg/edit.svg";
import iconPhoto from "./../../img/png/iconPhoto.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { itemsURL } from "./../../constants/api.js";
import { itemsAllURL } from "./../../constants/api.js";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useContext, useRef, useState } from "react";
import PopUp from "../popUp/popUp";
import getUrl from "./../../fun/getData";
import Context from "../../utilities/Context/Context";

export default function ListOfThings({ applyFilter }) {
  const { $state, $category } = useContext(Context);
  const [newState, setNewState] = useState($state.stateItems.data);
  const [modalActive, setModalActive] = useState(false);
  const [idItem, setIdItem] = useState();
  const divUtility = useRef(null);
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
  if ($state.stateItems.isLoading) {
    return <div>Loading...</div>;
  }
  if ($state.stateItems.error) {
    return <div>Error! {$state.stateItems.error.message}</div>;
  }
  const xxx = (e) => {
    const classUtility = document.querySelectorAll(`.utility${e.id}`);
    classUtility.forEach((e) => (e.style.display = "block"));
  };
  const eee = (e) => {
    const classUtility = document.querySelectorAll(`.utility${e.id}`);
    classUtility.forEach((e) => (e.style.display = "none"));
  };
  function deleteFinish(e) {
    setModalActive(true);
    setIdItem(e);
  }
  //  setNewState(x);

  function applyFilter() {
    let x = [];
    $state.stateItems.data.map((e) => {
      if (e.category !== null) {
        if (e.category.id === $category.category) {
          x.push(e);
        }
      }
    });
    setNewState(x);
  }

  return (
    <>
      <button onClick={applyFilter}>click</button>
      <Row className={st.gridTitle}>
        <Col>Наименование</Col>
        <Col>Место хранения</Col>
        <Col>Категория</Col>
        <Col>Дата добавления</Col>
      </Row>
      <section className={st.section}>
        {newState.map((e, id) => {
          return (
            <div
              key={`key${id}`}
              onMouseEnter={() => xxx(e)}
              onMouseLeave={() => eee(e)}
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
                  <Col>
                    {e.storage === null ? "Не добавили" : e.storage.name}
                  </Col>
                  <Col>
                    {e.category === null ? "Не добавили" : e.category.name}
                  </Col>
                  <Col>{e.created_at}</Col>
                </div>
                <Col className={st.endData}>
                  <div id={e.id} ref={divUtility} className={st.allUtility}>
                    <img
                      className={`utility${e.id}`}
                      onClick={() => console.log(`edit ${e.id}`)}
                      src={edit}
                      alt=""
                    />
                    <img
                      className={`utility${e.id}`}
                      onClick={() => console.log(`share ${e.id}`)}
                      src={share}
                      alt=""
                    />
                    <img
                      className={`utility${e.id}`}
                      onClick={() => deleteFinish(e.id)}
                      src={trash}
                      alt=""
                    />
                  </div>
                </Col>
              </Row>
            </div>
          );
        })}
      </section>
      <PopUp active={modalActive}>
        <div className={st.firstWrapper}>
          <div className={st.wrapperModal}>
            <img onClick={() => setModalActive(false)} src={close} alt="" />
            <h2>Вы действительно хотите удалить эту вещь?</h2>
            <div className={st.buttonModal}>
              <button
                onClick={() => {
                  deletePost.mutate(idItem);
                  setModalActive(false);
                }}
              >
                Да
              </button>

              <button onClick={() => setModalActive(false)}>Нет</button>
            </div>
          </div>
        </div>
      </PopUp>
    </>
  );
}
