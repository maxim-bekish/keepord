import { ConfigProvider, Select } from "antd";
import st from "./Categories.module.scss";

export default function Categories({ width, defaultValue, register }) {
  let categories = [];
  const handleChange = () => {};
  JSON.parse(sessionStorage.getItem("category")).forEach((element) => {
    categories.push({ value: element.id, label: element.name });
  });
  return (
    <div className={`${st.wrapper} ${st.svg}`}>
      <label className={st.text} htmlFor="categories">
        Категория
      </label>

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
          {...register("categories")}
          defaultValue={defaultValue}
          style={{ width: +width }}
          onChange={handleChange}
          options={categories}
          className={st.sected}
        />
      </ConfigProvider>
    </div>
  );
}
