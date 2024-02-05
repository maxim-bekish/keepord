import { Col, Row } from "antd";
import st from "./ListOfThings.module.scss";
import { Link } from "react-router-dom";
import share from "./../../img/svg/share.svg";
import close from "./../../img/svg/close.svg";
import trash from "./../../img/svg/trash.svg";
import edit from "./../../img/svg/edit.svg";
import iconPhoto from "./../../img/png/iconPhoto.png";
import { itemsURL, itemsAllURL } from "./../../constants/api.js";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useContext, useRef, useState } from "react";
import PopUp from "../popUp/popUp";
import Context from "../../utilities/Context/Context";
import Category from "../mainSelect/Category.jsx";
import Storage from "../mainSelect/Storage.jsx";
import deleteRequest from "../../fun/deleteRequest.js";
import getRequest from "../../fun/getRequest.js";
import Spiner from "../Spiner/Spiner.jsx";
import ErrorComponent from "../ErrorComponent/ErrorComponent.jsx";
import refreshToken from "../../fun/refreshToken.js";

export default function ListOfThings() {
  const [newState, setNewState] = useState(null);
  const {
    isLoading: itemsLoading,
    isError: itemsIsError,
    error: itemsError,
    data: itemsData,
    refetch: itemsRefetch,
  } = useQuery("items", () => getRequest(itemsAllURL), {
    onSuccess: (data) => {
      setNewState(data);
    },
  });

  const { $state, $category, $storage } = useContext(Context);

  const [modalActive, setModalActive] = useState(false);
  const [idItem, setIdItem] = useState();
  const divUtility = useRef(null);

  const queryClient = useQueryClient();

  const mutation = useMutation(deleteRequest);
  const handleDelete = async (id) => {
    try {
      setModalActive(false);
      await mutation.mutateAsync(id);
      // Инвалидация кэша запроса 'myQueryKey' через 1000 миллисекунд (1 секунда)
      setTimeout(() => {
        queryClient.invalidateQueries("items");
      }, 1000);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

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
    const x = [];

    newState.map((e) => {
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
          return x.push(e);
        }
      }
      if (e.storage !== null && $category.category === null) {
        if (e.storage.id === $storage.storage) {
          return x.push(e);
        }
      }
    });
    if (x.length !== 0) {
      setNewState(x);
    }
  }

  function reset() {
    $category.setCategory(null);
    $storage.setStorage(null);
    setNewState(itemsData);

    const filter = document.querySelectorAll(".ant-select-selection-item");
    console.log(filter);
    filter[0].innerHTML = "Категория";
    filter[1].innerHTML = "Места хранения";
    // console.log(newState);
  }

  if (itemsLoading) {
    return (
      <div style={{ left: "50vw", top: "50vh", position: "absolute" }}>
        <Spiner />
      </div>
    );
  }
  if (itemsIsError) {
    if (itemsError?.response?.status === 401) {
      console.log("popal");
      refreshToken();
      itemsRefetch();
    }

    return (
      <ErrorComponent
        props={{
          items: itemsError?.response?.status,
        }}
      ></ErrorComponent>
    );
  }

  return (
    <>
      <div className={st.filter}>
        <Category
          category={"Категории"}
          width={300}
          data={$state.stateCategory}
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
        {newState?.map((e, id) => {
          return (
            <div
              key={`key${id}`}
              onMouseEnter={() => xxx(e)}
              onMouseLeave={() => eee(e)}
              className={st.wrapper}
            >
              {/* нужно key */}
              <Row className={st.grid}>
                <Link
                  // onClick={() => navigate("/card/", { state: e.id })}
                  to={`/card/${e.id}`}
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
                </Link>
                <Col className={st.endData}>
                  <div id={e.id} ref={divUtility} className={st.allUtility}>
                    <Link to={`card/${e.id}/editCard`}>
                      <img className={`utility${e.id}`} src={edit} alt="" />
                    </Link>
                    <Link to={`/utility/${e.id}`}>
                      <img className={`utility${e.id}`} src={share} alt="" />
                    </Link>

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
              <button onClick={() => handleDelete(idItem)}>Да</button>

              <button onClick={() => setModalActive(false)}>Нет</button>
            </div>
          </div>
        </div>
      </PopUp>
    </>
  );
}
