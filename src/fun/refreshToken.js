import axios from "axios";

import { refreshURL } from "./../constants/api";
import { getCookie } from "./getCookie";

function refreshToken() {

 axios
  .post(refreshURL, {
    refresh: getCookie("refresh"),
  })
  .then((res) => {
    document.cookie = `access=${res.data.access}; max-age=3600`;
    // console.log(getCookie('access'));
    // console.log(document.cookie);
  })
  .catch(function (error) {
    if (error.response.status === 400) {
      window.location.replace("/login");
    }
    if (error.response.status === 401) {
      window.location.replace("/login");
    }
    if (error.response) {
      console.log(error.response);
    }
  });

}

export default refreshToken;
