import st from "./Button.module.scss";

export default function Button({ label, widthButton, disabledButton, dataFormAddCard }) {
  return (
    <button
      onClick={() => console.log(dataFormAddCard)}
      style={{ width: widthButton + "px" }}
      className={st.button}
    >
      {label}
    </button>
  );
}
