import st from "./PopUp.module.scss";
import close from "./../../img/svg/close.svg";
export default function PopUp({ active, children}) {

  return (
    <div
      className={`${active ? `${`${st.modal} ${st.active}`}` : `${st.modal}`}`}
    >
      <div
        className={`${
          active ? `${`${st.modalContent} ${st.active}`}` : `${st.modalContent}`
        }`}
        onClick={(e) => e.stopPropagation()}
      >

        {children}
        
      </div>
    </div>
  );
}
