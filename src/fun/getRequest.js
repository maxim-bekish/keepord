import axios from "axios";
import { getCookie } from "./getCookie";

async function getRequest(url) {
  const res = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("access")}`,
    },
  });

  return res.data;
}
export default getRequest;
