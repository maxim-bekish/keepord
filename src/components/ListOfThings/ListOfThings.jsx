import { Col, Row } from "antd";
import st from "./ListOfThings.module.scss";
// import { useSelector } from "react-redux";
import share from "./../../img/svg/share.svg";
import close from "./../../img/svg/close.svg";
import trash from "./../../img/svg/trash.svg";
import edit from "./../../img/svg/edit.svg";
import iconPhoto from "./../../img/png/iconPhoto.png";
import { useNavigate } from "react-router-dom";
import { itemsURL } from "./../../constants/api.js";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useContext, useEffect, useRef, useState } from "react";
import PopUp from "../popUp/popUp";
import Context from "../../utilities/Context/Context";
import Category from "../mainSelect/Category.jsx";
import Storage from "../mainSelect/Storage.jsx";
import deleteRequest from "../../fun/deleteRequest.js";

export default function ListOfThings({ applyFilter }) {
  const { $state, $category, $storage } = useContext(Context);

  const [newState, setNewState] = useState($state.stateItems.data);
  const [modalActive, setModalActive] = useState(false);
  const [idItem, setIdItem] = useState();
  const divUtility = useRef(null);
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const deletePost = useMutation(
    (e) => {
      return deleteRequest(`${itemsURL}/${e}/delete`);
    },
    {
      onSuccess: () => queryClient.invalidateQueries("items"),
    }
  );
  useEffect(() => {
    setNewState($state.stateItems.data);
  }, [$state.stateItems.data]);
  if ($state.stateItems.isLoading) {
    return <div>Loading...</div>;
  }
  if ($state.stateItems.error) {
    return <div>Error! {$state.stateItems.error.message}</div>;
  }
  if (newState === undefined) {
    return <div>Error! Undefined!</div>;
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

  function applyFilter() {
    let x = [];
    $state.stateItems.data.map((e) => {
      if (e.storage !== null && e.category !== null) {
        if (
          e.storage.id === $storage.storage &&
          e.category.id === $category.category
        ) {
          return x.push(e);
        }
      }
      if (e.category !== null && $storage.storage === null) {
        if (e.category.id === $category.category) {
          x.push(e);
        }
      }
      if (e.storage !== null && $category.category === null) {
        if (e.storage.id === $storage.storage) {
          return x.push(e);
        }
      }
    });
    setNewState(x);
  }

  function reset() {
    $category.setCategory(null);
    $storage.setStorage(null);
    setNewState($state.stateItems.data);

    const filter = document.querySelectorAll(".ant-select-selection-item");

    filter[0].innerHTML = "Категория";
    filter[1].innerHTML = "Места хранения";
  }

  return (
    <>
      <div className={st.filter}>
        <Category
          category={"Категории"}
          width={300}
          data={$state.stateCategory.data}
        />
        <Storage />

        <button onClick={applyFilter} className={st.buttonSubmit}>
          Применить
        </button>
        <button className={st.buttonSubmit} onClick={reset}>
          Сбросить
        </button>
      </div>

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
                  onClick={() => navigate("/card", { state: e.id })}
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
                      onClick={() => navigate("/editCard", { state: e.id })}
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
