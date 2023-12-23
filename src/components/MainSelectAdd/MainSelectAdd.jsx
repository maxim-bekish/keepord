import React, { useState, useContext } from "react";
import st from "./MainSelectAdd.module.scss";
import { storageAddURL } from "./../../constants/api";
import { Input, Select, Space, Button, ConfigProvider } from "antd";

import postRequest from "../../fun/postRequest";

import { useMutation, useQuery, useQueryClient } from "react-query";

import Context from "../../utilities/Context/Context";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import { storageAllURL } from "./../../constants/api";
import getRequest from "../../fun/getRequest";
import refreshToken from "../../fun/refreshToken";
import Spiner from "../Spiner/Spiner";

export default function MainSelectAdd({ storageDefault }) {
  const {
    data: storageData,
    isLoading: storageIsLoading,
    isError: storageIsError,
    error: storageError,
    refetch: storageRefetch,
  } = useQuery("storageAll", () => getRequest(storageAllURL));
  const { $storage } = useContext(Context);
  const queryClient = useQueryClient();
  const [name, setName] = useState("");

  const mutation = useMutation(
    (newProduct) => postRequest(storageAddURL, newProduct),
    {
      onSuccess: () => queryClient.invalidateQueries(["storageAll"]),
    }
  );

  if (storageIsLoading) {
       return (
         <div style={{ left: "50vw", top: "50vh", position: "absolute" }}>
           <Spiner />
         </div>
       );
  }

  if (storageIsError) {
    if (storageError?.response?.status === 401) {
      refreshToken();
      storageRefetch();
    }
    return (
      <ErrorComponent
        props={{
          storage: storageError?.response?.status,
        }}
      ></ErrorComponent>
    );
  }

  const mainSelectAll = storageData.map(({ id, name }) => {
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
        // defaultValue={"defaultValue"}
        placeholder={storageDefault}
        dropdownRender={(menu) => (
          <>
            {menu}
            <Space className={st.wrapperStorageAdd}>
              <Input
                className={st.inputStorageAdd}
                placeholder="Введите наименование места хранения"
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
