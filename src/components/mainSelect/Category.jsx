import { ConfigProvider, Select } from "antd";
import st from "./MainSelect.module.scss";
import Context from "../../utilities/Context/Context";
import { useContext } from "react";


export default function Category({ data, width }) {
  const { $category } = useContext(Context);

  if (data.isLoading) {
    return <>123</>;
  }

  if (data.error) {
    return <h2 props={data.error}></h2>;
  }

  const setMainSelectAll = data.data.map(({ id, name }) => {
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
        style={{ width: +width }}
        options={setMainSelectAll}
        className={`${st.select}  ${st.svg}`}
      />
    </ConfigProvider>
  );
}
