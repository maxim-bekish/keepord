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
  const getCategories = async (url) => {
    const res = await getTokenData(url);
    console.log(res);
  };
  useEffect(() => {
    getCategories(url.url);
  }, []);

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
              <img src="" alt="avatar" /> <span>{e.name}</span>
            </Col>
            <Col keys={2} span={5}>
              {e.storage}
            </Col>
            <Col keys={3} span={5}>
              {e.categories}
            </Col>
            <Col keys={4} span={3}>
              {e.data}
            </Col>
            <Col keys={5} span={2}>
              {e.key}
            </Col>
          </Row>
        );
      })}
    </>
  );
}
