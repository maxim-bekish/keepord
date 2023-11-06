import { ConfigProvider, Select } from "antd";
import st from "./MainSelect.module.scss";
import Context from "./../../utilities/Context/Context";
import { useContext } from "react";

// import ErrorComponent from "../ErrorComponent/ErrorComponent";

export default function Storage() {
  const { $state, $storage } = useContext(Context);

  if ($state.stateStorage.isLoading) {
    return <></>;
  }

  // if ($state.stateStorage.error) {
  //   return <ErrorComponent props={$state.stateStorage.error}></ErrorComponent>;
  // }

  const setMainSelectAll = $state.stateStorage.data.map(({ id, name }) => {
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
          $storage.setStorage(id); // dispatch(reducersCategoriesAdd({ id }));
        }}
        defaultValue={"Места хранения"}
        style={{ width: 300 }}
        options={setMainSelectAll}
        className={`${st.select}  ${st.svg}`}
      />
    </ConfigProvider>
  );
}
