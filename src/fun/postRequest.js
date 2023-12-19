import axios from "axios";
import { getCookie } from "./getCookie";

async function postRequest(url, startingInformation) {
  const res = await axios.post(url, startingInformation, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("access")}`,
    },
  });

  return res.data;
}

export default postRequest;
