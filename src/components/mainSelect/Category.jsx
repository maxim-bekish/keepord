import { ConfigProvider, Select } from "antd";
import st from "./MainSelect.module.scss";
import Context from "../../utilities/Context/Context";
import { useContext } from "react";
import { useQuery } from "react-query";
import getUrl from "../../fun/getData";
import ErrorComponent from "../ErrorComponent/ErrorComponent";

export default function Category(  props) {

  const { $category } = useContext(Context);
  const { data, isLoading, error } = useQuery("qweer", () => getUrl(props.url));

  if (isLoading) {
    return <h2>Loadinggggg</h2>;
  }

  if (error) {
    return <ErrorComponent props={error}></ErrorComponent>;
  }

  const setMainSelectAll = data.map(({ id, name }) => {
    return {
      value: id,
      label: name,
    };
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
        onChange={(id) => {
          $category.setCategory(id); // dispatch(reducersCategoriesAdd({ id }));
        }}
        defaultValue={"Категория"}
        style={{ width: +props.width }}
        options={setMainSelectAll}
        className={`${st.select}  ${st.svg}`}
      />
    </ConfigProvider>
  );
}
