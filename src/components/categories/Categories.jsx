import { ConfigProvider, Select } from "antd";
import st from "./Categories.module.scss";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Categories({ width, defaultValue, categorie }) {
  const [categories11111, setСategories] = useState("");
  let categoriese = [];
  const handleChange = (event) => {
    setСategories(event);
  };
  const categirTest = useSelector(
    // categoriesReducer=index.js 5
    // categories= slice 6
    (state) => state.categoriesReducer.categories
  );

  categirTest.forEach((element) => {
    categoriese.push({ value: element.id, label: element.name });
  });


  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            colorBorder: `#3c6255`,
            colorPrimary: "#3c6255",
            controlHeight: 66,
            controlOutlineWidth: 0,
            fontSize: 22,
            fontSizeIcon: 20,
            color: "red",
            borderRadius: 10,
            lineWidth: 1,
            colorPrimaryTextActive: "none",
            algorithm: true, // Enable algorithm
          },
        },
      }}
    >
      <Select
        defaultValue={defaultValue}
        style={{ width: +width }}
        onChange={handleChange}
        options={categorie}
        className={st.sected}
      />
    </ConfigProvider>
  );
}
