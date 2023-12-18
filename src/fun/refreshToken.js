import axios from "axios";

import { refreshURL } from "./../constants/api";
import { getCookie } from "./getCookie";

function refreshToken() {
  // let x = getCookie("refresh");
  let x = JSON.parse(localStorage.getItem("tokenR"));
  // console.log(x);

  axios
    .post(refreshURL, {
      refresh: x,
    })
    .then((res) => {
      // console.log(res.data.access);
      localStorage.setItem("token", JSON.stringify(res.data.access));
      localStorage.setItem("worked", "worked refresh");
      
    })
    .catch(function (error) {
      // console.error("ошибка в refreshToken: " + error);

      if (error.response.status === 400) {
        window.location.replace("/login");

      }
    });
}

export default refreshToken;
