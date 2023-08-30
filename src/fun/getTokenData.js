import axios from "axios";
import refreshToken from "./refreshToken";

function getTokenData() {
  axios
    .get("https://rms2022.pythonanywhere.com/categoris/", {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(sessionStorage.getItem("token")).access,
      },
    })
    .then(function (response) {
      sessionStorage.setItem("category", JSON.stringify(response.data));
    })
    .catch(function (error) {
      if (error.response.status === 401) {
        refreshToken(JSON.parse(sessionStorage.getItem("token")).refresh);
      }
    });
}

export default getTokenData;
