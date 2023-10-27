import axios from "axios";

// async function getUrl(url) {
//   const { data } = await axios.post(url, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
//     },
//   });
//   return data;
// }
async function postUrl(data) {
  axios.post(
    url,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    },
    data
  );
}

export default postUrl;
