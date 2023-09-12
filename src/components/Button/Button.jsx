import st from "./Button.module.scss";

export default function Button({ label, widthButton, disabledButton,e }) {
    //  console.log(disabledButton);
  return (
    <button
      onClick={() => {
        console.log(e);
      }}
      style={{ width: widthButton + "px" }}
      className={st.button}
    >
      {label}
    </button>
  );
}
