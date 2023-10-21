import axios from "axios";

// import refreshToken from "./refreshToken";
import Error from "./../components/Error/Error";

// withcredentials: true;

async function getTokenData(url) {
  const access = JSON.parse(localStorage.getItem("token"));

  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    });

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
