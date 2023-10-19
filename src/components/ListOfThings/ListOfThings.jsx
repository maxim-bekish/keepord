import { Col, Row } from "antd";
import st from "./ListOfThings.module.scss";
import refreshToken from "../../fun/refreshToken";
import axios from "axios";
import getTokenData from "../../fun/getTokenData";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

let state = [
  {
    name: "одеяло",
    storage: "диван",
    categories: "постельно",
    data: "22.08.2022",
    key: 1,
  },
  {
    name: "шуба",
    storage: "шкаф",
    categories: "одежа",
    data: "18.03.2023",
    key: 2,
  },
  {
    name: "стол",
    storage: "чулан",
    categories: "мебель",
    data: "02.01.2008",
    key: 3,
  },
  {
    name: "носки",
    storage: "шкафчик",
    categories: "белье",
    data: "12.08.2023",
    key: 4,
  },
];

export default function ListOfThings(url) {
  // console.log( typeof reducersItemAdd);

  const [item, setItem] = useState("");

  const erer = async (url) => {
    const dataTable = await getTokenData(url.url);
    setItem(dataTable);
  };

  useEffect(() => {
  
    erer(url)
    
  }, []);

      console.log(item);
  return (
    <>
      <Row keys={0} className={st.gridTitle}>
        <Col keys={1} span={9}>
          Наименование
        </Col>
        <Col keys={2} span={5}>
          Место хранения
        </Col>
        <Col keys={3} span={5}>
          Категория
        </Col>
        <Col keys={4} span={3}>
          Дата добавления
        </Col>
        <Col keys={5} span={2}>
          utilit
        </Col>
      </Row>
      {state.map((e) => {
        return (
          <Row
            key={e.key}
            className={st.grid}
            onClick={() => console.log("выбрал " + e.key)}
          >
            <Col keys={1} span={9}>
              <img src="" alt="avatar" /> <span>{'item[0].name'}</span>
            </Col>
            <Col keys={2} span={5}>
              {"item[0].storage.name"}
            </Col>
            <Col keys={3} span={5}>
              {"item[0].category.name"}
            </Col>
            <Col keys={4} span={3}>
              {"item[0].created_at"}
            </Col>
            <Col keys={5} span={2}>
              {"item[0].id"}
            </Col>
          </Row>
        );
      })}
    </>
  );
}
