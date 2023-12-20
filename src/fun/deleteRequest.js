import axios from "axios";
import { getCookie } from "./getCookie";
import refreshToken from "./refreshToken";

async function deleteRequest(url) {
  await axios
    .delete(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("access")}`,
      },
    })
    .then((res) => console.log(res))
    .catch((error) => {
      if (error.request.status === 401) {
        refreshToken();
        deleteRequest(url);
      }
    });
}

export default deleteRequest;
