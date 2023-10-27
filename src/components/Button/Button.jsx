import { useMutation, useQuery } from "react-query";
import st from "./Button.module.scss";
import getUrl from "../../fun/getData";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import axios from "axios";

export default function Button({ label, widthButton, dataFormCreatingCard }) {
  function postUrl() {
 
    console.log(dataFormCreatingCard);
  }

  return (
    <button
      onClick={postUrl}
      style={{ width: widthButton + "px" }}
      className={st.button}
    >
      {label}
    </button>
  );
}
