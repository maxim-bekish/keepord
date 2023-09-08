import { ConfigProvider, Select } from "antd";
import st from "./Categories.module.scss";
import { useEffect, useState } from "react";
import getTokenData from "../../fun/getTokenData";

export default function Storage({ width, defaultValue }) {


  const [storage, setStorage] = useState(null);
  const getStorage = async (url) => {
    const res = await getTokenData(url);
    
    const storageAll = res.map(({ id, name }) => {
      return {
        value: id,
        label: name,
      };
    });
    setStorage(storageAll);
    console.log(storage);
  };
  useEffect(() => {
    getStorage("https://rms2022.pythonanywhere.com/storage/?item=1");
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
        options={storage}
        className={`${st.select}  ${st.svg}`}
      />
    </ConfigProvider>
  );
}
