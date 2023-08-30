import axios from "axios";
import saveTokenSessionStorage from "./saveTokenSessionStorage";

// import saveToken from "./saveTokenSessionStorage";
function refreshToken(token) {
  axios
    .post("https://rms2022.pythonanywhere.com/users/token/refresh/", {
      refresh: token,
    })
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data.access);
        saveTokenSessionStorage(res.data.access);
        // сохраняем полученный обновленный токен в sessionStorage, с помощью функции, заданной ранее
      }
    })
    .catch(function (error) {
      console.log(error);
      console.log("refreshToken");
    });
}

export default refreshToken;
