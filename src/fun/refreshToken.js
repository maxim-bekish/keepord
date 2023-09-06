import axios from "axios";
import saveTokenSessionStorage from "./saveTokenSessionStorage";

function refreshToken(token) {
  axios
    .post("https://rms2022.pythonanywhere.com/users/token/refresh/", {
      refresh: token,
    })
    .then((res) => {
      saveTokenSessionStorage(res.data.access, token);
    })
    .catch(function (error) {
      console.error("ошибка в refreshToken: " + error);
    });
}

export default refreshToken;
