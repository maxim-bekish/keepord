import axios from "axios";
import { getCookie } from "./getCookie";

// async function getUrl(url) {
//   const { data } = await axios.post(url, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${}`,
//     },
//   });
//   return data;
// }
async function postUrl(data) {
  axios.post(
    url,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("access")}`,
      },
    },
    data
  );
}

export default postUrl;
