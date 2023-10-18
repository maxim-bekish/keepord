import axios from "axios";

// import refreshToken from "./refreshToken";
import Error from "./../components/Error/Error";

// withcredentials: true;

const access = JSON.parse(localStorage.getItem("token"));

async function getTokenData(url) {
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    });

    // console.log(response);

    return await response.data;
  } catch (error) {
    console.log(error);
    // refreshToken();
    error.response.status === 401 ? (
      window.location.replace("/login")
    ) : (
      <Error errors={error.response.status} />
    );
  }
}

export default getTokenData;
