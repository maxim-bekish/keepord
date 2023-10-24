import React, { useState, useRef, useEffect } from "react";
import st from "./MainSelectAdd.module.scss";
import { storageAddURL } from "./../../constants/api";
import { Input, Select, Space, Button, ConfigProvider } from "antd";
import getTokenData from "../../fun/getTokenData";
import { useDispatch } from "react-redux";
import axios from "axios";

export default function MainSelectAdd({
  width,
  defaultValue,
  url,
  reducersCategoriesAdd,
}) {
  const [toggle, setToggle] = useState(true);
  const dispatch = useDispatch();
  const [mainSelect, setMainSelect] = useState(null);
  const selectApi = async (url) => {
    const res = await getTokenData(url);
    const setMainSelectAll = res.map(({ id, name }) => {
      return {
        value: id ,
        label: name,
      };
    });

    setMainSelect(setMainSelectAll);
  };

  const [name, setName] = useState("");
  const inputRef = useRef(null);
  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const addItem = (e) => {
    e.preventDefault();
    setToggle(!toggle);
    const access = JSON.parse(localStorage.getItem("token"));

    axios({
      method: "post",
      url: storageAddURL,
      data: {
        name: name,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    });

    setName("");
  };
  // console.log(toggle);

  useEffect(() => {
    selectApi(url);
    console.log("useEffect запустился");
  }, [toggle]);

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
        className={`${st.select}  ${st.svg}`}
        style={{
          width: +width,
        }}
        defaultValue={defaultValue}
        dropdownRender={(menu) => (
          <>
            {menu}
            <Space className={st.wrapperStorageAdd}>
              <Input
                className={st.inputStorageAdd}
                placeholder="Введите наемонавние места хранения"
                ref={inputRef}
                value={name}
                onChange={onNameChange}
                onKeyDown={(e) => e.stopPropagation()}
              />
              <Button
                className={st.buttonStorageAdd}
                type="text"
                onClick={addItem}
              >
                +
              </Button>
            </Space>
          </>
        )}
        onChange={(id) => {
          dispatch(reducersCategoriesAdd({ id }));
        }}
        options={mainSelect}
      />
    </ConfigProvider>
  );
}
