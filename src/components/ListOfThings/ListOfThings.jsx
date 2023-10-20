import { Col, Row } from "antd";
import st from "./ListOfThings.module.scss";
// import refreshToken from "../../fun/refreshToken";
// import axios from "axios";
// import getTokenData from "../../fun/getTokenData";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, testAdd } from "./../../store/sliseTest";
import share from "./../../img/svg/share.svg";
import trash from "./../../img/svg/trash.svg";
import edit from "./../../img/svg/edit.svg";
export default function ListOfThings(url) {
  const test = useSelector((s) => s.sliceTest.testState);
  console.log(test);
  return (
    <>
      <Row keys={0} className={st.gridTitle}>
        <Col keys={1}>Наименование</Col>
        <Col keys={2}>Место хранения</Col>
        <Col keys={3}>Категория</Col>
        <Col keys={4}>Дата добавления</Col>
        <Col keys={5}></Col>
      </Row>
      {test.map((e) => {
        return (
          <div className={st.wrapper}>
            <Row
              key={e.key}
              className={st.grid}
              onClick={() => console.log("выбрал " + e.id)}
            >
              <div className={st.allData}>
                <Col keys={1}>{e.name}</Col>
                <Col keys={2}>{e.storage.name}</Col>
                <Col keys={3}>{e.category.name}</Col>
                <Col keys={4}>{e.created_at}</Col>
              </div>
              <Col className={st.endData} keys={5}>
                <div>
                  <img src={edit} alt="" />
                  <img src={share} alt="" />
                  <img src={trash} alt="" />
                </div>
              </Col>
            </Row>
          </div>
        );
      })}
    </>
  );
}
