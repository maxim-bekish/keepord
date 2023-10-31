import { Col, Row } from "antd";
import { useContext } from "react";
import st from "./ListData.module.scss";
import Context from "../../utilities/Context/Context";
import ListOfThings from "../ListOfThings/ListOfThings";

export default function ListData() {
  const { $category, $storage } = useContext(Context);

  return (
    <>
      <div className={st.filter}>
        <button className={st.button} onClick={() => console.log("Автор")}>
          Автор
        </button>
        <button
          className={st.button}
          onClick={() => console.log("Исполнитель")}
        >
          Исполнитель
        </button>
        <button className={st.button} onClick={() => console.log("Все")}>
          Все
        </button>
      </div>
      <section>
        <>
          <Row className={st.gridTitle}>
            <Col>Наименование</Col>
            <Col>Дата добавления</Col>
            <Col> Участники</Col>
          </Row>

          {/* <div key={`key$`} className={st.wrapper}> */}
          {/* нужно key */}
          <Row className={st.grid}>
            <Col>
              <img src="#" alt="ph" /> <span>{"name"}</span>
            </Col>
            <Col>{"created_at"}</Col>
            <Col>
              <ul>
                <li>r</li>
                <li>g</li>
                <li>b</li>
              </ul>
            </Col>
          </Row>
          {/* </div> */}
        </>
      </section>

      {/* <ListOfThings /> */}
    </>
  );
}
