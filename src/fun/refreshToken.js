import axios from "axios";

import { refreshURL } from "./../constants/api";
import { getCookie } from "./getCookie";

function refreshToken() {
 
  axios
    .post(refreshURL, {
      refresh: getCookie("refresh"),
    })
    .then((res) => {
      document.cookie = `access=${res.data.access};max-age:300`;
    })
    .catch(function (error) {
      console.error("ошибка в refreshToken: " + error);

      if (error.response.status === 400) {
        window.location.replace("/login");
      }
    });
}

export default refreshToken;
