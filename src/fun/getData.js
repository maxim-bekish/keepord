import axios from "axios";

async function getUrl(url) {
  const res = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  });
  const data = res.data;
  return data;
}

export default getUrl;
