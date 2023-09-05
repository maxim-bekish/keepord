import axios from "axios";
import refreshToken from "./refreshToken";

async function getTokenData(url) {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(sessionStorage.getItem("token")).access,
      },
    });
    return await response.data;
  } catch (error) {
    if (error.response.status === 401) {
      refreshToken(JSON.parse(sessionStorage.getItem("token")).refresh);
    }
    console.log(error);
  }
}

export default getTokenData;
