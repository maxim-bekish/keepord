const saveTokenSessionStorage = function (tokenData) {
  sessionStorage.setItem("token", JSON.stringify(tokenData));

};

export default saveTokenSessionStorage;