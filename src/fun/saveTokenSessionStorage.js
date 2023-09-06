const saveTokenSessionStorage = function (access, refresh) {
  sessionStorage.setItem("access", JSON.stringify(access));
  sessionStorage.setItem("refresh", JSON.stringify(refresh));
};

export default saveTokenSessionStorage;