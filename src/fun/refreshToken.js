import axios from "axios";

import { refreshURL } from "./../constants/api";
import { getCookie } from "./getCookie";

function refreshToken() {
  axios
    .post(refreshURL, {
      refresh: getCookie("refresh"),
    })
    .then((res) => {
      document.cookie = `access=${res.data.access}`;
      alert("access update");
    })
    .catch(function (error) {
      console.error("ошибка в refreshToken: " + error);
      alert("access NOOO update");
      if (error.response.status === 400) {
        window.location.replace("/login");
      }
    });
}

export default refreshToken;
