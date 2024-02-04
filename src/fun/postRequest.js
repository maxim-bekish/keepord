import axios from "axios";
import { getCookie } from "./getCookie";
import refreshToken from "./refreshToken";

async function postRequest(url, startingInformation) {
  await axios
    .post(url, startingInformation, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("access")}`,
      },
    })

    .then((res) => {
      console.log(res);

      return res.data;
    })
    .catch((error) => {
      if (error.request.status === 401) {
        refreshToken();
        postRequest(url, startingInformation);
      }
    });
}

export default postRequest;
