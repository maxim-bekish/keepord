import axios from "axios";
import { getCookie } from "./getCookie";
import refreshToken from "./refreshToken";
import {itemsURL} from "../constants/api";



async function deleteRequest(id) {
  await axios
    .delete(`${itemsURL}/${id}/delete`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("access")}`,
      },
    })

    .catch((error) => {
      if (error.request.status === 401) {
        refreshToken();
        deleteRequest(id);
      }
    });
}

export default deleteRequest;
