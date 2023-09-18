import st from "./Button.module.scss";

export default function Button({ label, widthButton, disabledButton,e }) {
 
  return (
    <button
      onClick={() => {
 
      }}
      style={{ width: widthButton + "px" }}
      className={st.button}
    >
      {label}
    </button>
  );
}
