import axios from "axios";
import saveTokenSessionStorage from "./saveTokenSessionStorage";

function refreshToken(token) {
  axios({
    method: "POST",

    url: "https://rms2022.pythonanywhere.com/users/token/refresh/",
    headers: {
      refresh: JSON.stringify(token),
    },
  })
    .then((res) => {
      // console.log("получилось");
      saveTokenSessionStorage(res.data.access);
    })
    .catch(function (error) {
      // console.log(error);
    });
}

export default refreshToken;
