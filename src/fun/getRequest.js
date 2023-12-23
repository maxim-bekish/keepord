import axios from "axios";
import { getCookie } from "./getCookie";
import refreshToken from "./refreshToken";

async function getRequest(url) {
  let res=  await axios
    .get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("access")}`,
      },
    })
// .then((result)=>res=result.data)
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
    // console.log(res)

  return res.data
}
export default getRequest;
