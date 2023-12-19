import axios from "axios";
import { getCookie } from "./getCookie";

async function deleteRequest(url) {

  const res = await axios.delete(url ,{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("access")}`,
    },
  });
}

export default deleteRequest;
