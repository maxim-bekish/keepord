import axios from "axios";
import refreshToken from "./refreshToken";
import Error  from "./../components/Error/Error";

async function getTokenData(url) {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + JSON.parse(sessionStorage.getItem("access")),
      },
    });

    setInterval(() => {
      refreshToken(JSON.parse(sessionStorage.getItem("refresh")));
    }, 14.9 * 1000);
    return await response.data;
  } catch (error) {
    console.log(error);
     refreshToken(JSON.parse(sessionStorage.getItem("refresh")));
    error.response.status === 401 ? (
      window.location.replace("/login")
  
    ) : (
      <Error errors={error.response.status} />
    );
  }
}

export default getTokenData;
