
import axios from "axios";
import refreshToken from "./refreshToken";

function getTokenData(url, title) {
  console.log("getTokenData");
  axios
    .get(url, {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(sessionStorage.getItem("token")).access,
      },
    })
    .then((response) => {


      sessionStorage.setItem(title, JSON.stringify(response.data))
    })
    
    .catch(function (error) {
      if (error.response.status === 401) {
        refreshToken(JSON.parse(sessionStorage.getItem("token")).refresh);
      }
    });
}

export default getTokenData;
