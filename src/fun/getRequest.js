import axios from "axios";
import { getCookie } from "./getCookie";
import refreshToken from "./refreshToken";

async function getRequest(url) {
  const res = await axios
    .get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("access")}`,
      },
    })
// .then((www)=>this.www.data)
    // .catch(  (error) => {
    //   if (error.request.status === 401) {
    //    refreshToken();
    //    getRequest(url);
    //     console.log(401);
    //   } 
    //   if (error.request.status!==401) {
    //     console.log(error.request);
    //   }
    // });
  return res?.data;
}
export default getRequest;
