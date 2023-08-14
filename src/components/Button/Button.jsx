import st from "./Button.module.scss";

export default function Button({ label, widthButton, disabledButton }) {
    //  console.log(disabledButton);
  return (
    
    <button
  
      style={{ width: widthButton + "px" }}
      className={st.button}
    >
      {label}
    </button>
  );
}
