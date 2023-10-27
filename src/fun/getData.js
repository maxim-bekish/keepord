import axios from "axios";

async function getUrl(url) {
  const { data } = await axios.get(url, {

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  });
  return data;
}

export default getUrl;
