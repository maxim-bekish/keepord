import { useState } from "react";
import st from "./Checkbox.module.scss";
import ok from "./../../img/svg/ok.svg";




function Checkbox() {
  const [check, setCheck] = useState(true);
  let x;
  if (check) {
    x = <img src={ok} alt="" className={st.img} />;
  } else {
    x = "";
  }

  return (
    <div className={st.wrapper}>
      <label className={st.label}>
        <input
          type="checkbox"
          onChange={() => setCheck(!check)}
          checked={check}
          className={st.input}
        />
        Запомнить меня
        <div className={st.checkedBox}></div>
        {x}
      </label>
    </div>
  );
  
}

export default Checkbox;
