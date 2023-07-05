import { useState } from "react";
import st from "./_Chekebox.module.scss";
import ok from "./../svg/ok.svg";



function Chekebox() {
  const [www, setWww] = useState(true);
let x;
  if (www) {
    x = <img src={ok} className={st.img} />;
  } else {
    x = "";
  }
  console.log(x);
  return (
    <div className={st.wrapper}>
      <label className={st.label}>
        <input
          type="checkbox"
          onChange={() => setWww(!www)}
          checked={www}
          className={st.input}
        />
        Запомнить меня
        <div className={st.bordiv}></div>
        {x}
      </label>
    </div>
  );
}

export default Chekebox;
