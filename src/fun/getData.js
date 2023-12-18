import axios from "axios";
// import { getCookie } from "./../fun/getCookie";

async function getUrl(url) {
  // const access= getCookie("access")


const x=JSON.parse(localStorage.getItem("token"));
  const res = await axios.get(url, {

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${x}`,
    },
  });

  return res.data;
}
export default getUrl;
