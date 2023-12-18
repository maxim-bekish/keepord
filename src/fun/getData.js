import axios from "axios";
import { getCookie } from "./../fun/getCookie";

async function getUrl(url) {
  const res = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("access")}`,
    },
  });

  return res.data;
}
export default getUrl;
