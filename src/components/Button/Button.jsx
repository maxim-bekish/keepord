import st from "./Button.module.scss";

export default function Button({ label, widthButton, disabledButton, dataFormCreatingCard }) {
  return (
    <button
      onClick={() => console.log(dataFormCreatingCard)}
      style={{ width: widthButton + "px" }}
      className={st.button}
    >
      {label}
    </button>
  );
}
