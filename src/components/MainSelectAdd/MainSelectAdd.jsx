import React, { useState, useContext } from "react";
import st from "./MainSelectAdd.module.scss";
import { storageAddURL } from "./../../constants/api";
import { Input, Select, Space, Button, ConfigProvider } from "antd";

import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import getUrl from "../../fun/getData";
import Context from "../../utilities/Context/Context";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import { storageAllURL } from "./../../constants/api";

async function create(data) {
  return await axios.post(storageAddURL, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  });
}

export default function MainSelectAdd() {

   const {  $storage,$state } = useContext(Context);
  const queryClient = useQueryClient();
  const [name, setName] = useState("");

  const mutation = useMutation((newProduct) => create(newProduct), {
    onSuccess: () => queryClient.invalidateQueries(["storageAll"]),
  });

  

  if ($state.stateStorageAll.isLoading) {
    return <h2>Loadinggggg</h2>;
  }

  if ($state.stateStorageAll.error) {
    return (
      <ErrorComponent props={$state.stateStorageAll.error}></ErrorComponent>
    );
  }

  const mainSelectAll = $state.stateStorageAll.data.map(({ id, name }) => {
    return {
      value: id,
      label: name,
    };
  });

  const submit = (e) => {
    e.preventDefault();
    mutation.mutate({ name: name });
    setName("");
  };

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
          width: 500,
        }}
        onChange={(id) => $storage.setStorage(id)}
        defaultValue={"defaultValue"}
        dropdownRender={(menu) => (
          <>
            {menu}
            <Space className={st.wrapperStorageAdd}>
              <Input
                className={st.inputStorageAdd}
                placeholder="Введите наемонавние места хранения"
                // ref={inputRef}
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.stopPropagation()}
              />
              <Button
                className={st.buttonStorageAdd}
                type="text"
                onClick={submit}
              >
                +
              </Button>
            </Space>
          </>
        )}
        options={mainSelectAll}
      />
    </ConfigProvider>
  );
}
