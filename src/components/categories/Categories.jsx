import { ConfigProvider, Select } from "antd";
import st from "./Categories.module.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import getTokenData from "../../fun/getTokenData";
import { categoriesURL } from "../../constants/api";

export default function Categories({ width, defaultValue }) {
  // useSelector(
  //   // categoriesReducer=index.js 5
  //   // categories= slice 6
  //   (state) => state.categoriesReducer.categories
  // );

  const [categories, setCategories] = useState(null);

  const getCategories = async (url) => {
    const res = await getTokenData(url);
    const categoriesAll = res.map(({ id, name }) => {
      return {
        value: id,
        label: name,
      };
    });
    setCategories(categoriesAll);
  };
  useEffect(() => {
    getCategories(categoriesURL);
  }, []);

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
        options={categories}
        className={`${st.select}  ${st.svg}`}
      />
    </ConfigProvider>
  );
}
