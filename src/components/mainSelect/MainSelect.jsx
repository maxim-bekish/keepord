import { ConfigProvider, Select } from "antd";
import st from "./MainSelect.module.scss";
import { useEffect, useState } from "react";
import getTokenData from "../../fun/getTokenData";
import { useDispatch } from "react-redux";

export default function MainSelect({
  width,
  defaultValue,
  url,
  reducersCategoriesAdd,
}) {
  const [mainSelect, setMainSelect] = useState(null);

  const dispatch = useDispatch();

  const selectApi = async (url) => {
    const res = await getTokenData(url);
    const setMainSelectAll = res.map(({ id, name }) => {
      return {
        value: id + Math.random(),
        label: name,
      };
    });

    setMainSelect(setMainSelectAll);
  };
  useEffect(() => {
    selectApi(url);
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
        onChange={(id) => {
          dispatch(reducersCategoriesAdd({ id }));
        }}
        defaultValue={defaultValue}
        style={{ width: +width }}
        options={mainSelect}
        className={`${st.select}  ${st.svg}`}
      />
    </ConfigProvider>
  );
}
