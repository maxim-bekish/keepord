import axios from "axios";

// import refreshToken from "./refreshToken";
import Error from "./../components/Error/Error";

// withcredentials: true;

async function getTokenData(url) {
  // const access = JSON.parse(localStorage.getItem("token"));

  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });

    // if (!response.ok) {
    //   throw new Error("Упс, ошибочка 1");
    // }

    return await response.data;
  } catch (error) {


    error.response.status === 401 ? (
      window.location.replace("/login")
    ) : (
      <Error errors={error.response.status} />
    );
  }
}

export default getTokenData;
