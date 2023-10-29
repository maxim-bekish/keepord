import axios from "axios";

import {refreshURL} from "./../constants/api";
function refreshToken() {
  axios
    .post(refreshURL, {})
    .then((res) => {
      console.log("refreshToken");
      console.log(res);
    })
    // .catch(function (error) {
    //   console.error("ошибка в refreshToken: " + error);
    // });
}

export default refreshToken;




// function getCookie(name) {
//   let matches = document.cookie.match(
//     new RegExp(
//       "(?:^|; )" +
//         name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
//         "=([^;]*)"
//     )
//   );
//  return matches ? decodeURIComponent(matches[1]) : undefined;
// }