import st from "./Button.module.scss";

export default function button({ label }) {
  console.log(label);
  return (
    <button  className={st.button}>
      {label}
    </button>
  );
}
