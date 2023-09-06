import { Col, Row } from "antd";
import st from "./ListOfThings.module.scss";
export default function ListOfThings() {
  return (
    <>
      <Row className={st.gridTitle} onClick={() => console.log("выбрал")}>
        <Col span={9}>Наименование </Col>
        <Col span={5}>Место хранения </Col>
        <Col span={5}>Категория </Col>
        <Col span={3}>Дата добавления</Col>
        <Col span={2}>utilit</Col>
      </Row>
      <Row className={st.grid} onClick={() => console.log("выбрал")}>
        <Col span={9}>
          <img src="" alt="avatar" /> <span>name</span>
        </Col>
        <Col span={5}>storage</Col>
        <Col span={5}>categories</Col>
        <Col span={3}>data</Col>
        <Col span={2}>utilit</Col>
      </Row>
    </>
  );
}
