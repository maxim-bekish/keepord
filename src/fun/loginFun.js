// import axios from "axios";


export function onSubmit (data,url)  {
  console.log(data);
  // axios
  //   .post(url, data)
  //   .then(function (response) {
  //     if (response.status === 200) {
  //       // +1 день от текущей даты

  //       let date = new Date(Date.now() + 86400e3);
  //       date = date.toUTCString();
  //       document.cookie = `access=${response.data.access};max-age=3600`;
  //       document.cookie = `refresh=${response.data.refresh};max-age=${date}`;

  //       // navigation("/home", { replace: true });
  //     }
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //     //  debugger
  //     if (error.response?.status === 401) {
  //      return <p> не вырный логин или пароль</p>;
  //     }
  //     console.log(error);
  //   });
};
export default onSubmit;
