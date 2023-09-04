import axios from "axios";
import saveTokenSessionStorage from "./saveTokenSessionStorage";

// import saveToken from "./saveTokenSessionStorage";
function refreshToken(token) {
  console.log("refreshToken--- "+token);

  axios({
    method: "POST",
    url: "https://rms2022.pythonanywhere.com/users/token/refresh/",

    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      'refresh': token
    }
    // body: token,
  })
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data.access);
        saveTokenSessionStorage(res.data.access);
        // сохраняем полученный обновленный токен в sessionStorage, с помощью функции, заданной ранее
      }
    })
    .catch(function (error) {
      // console.log(error);
  
    });
}

export default refreshToken;

// axios({
//   method: "POST",
//   url: "https://rms2022.pythonanywhere.com/users/token/refresh/",

//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   },
//   body: token,
// });
