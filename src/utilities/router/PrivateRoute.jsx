// import { useContext } from "react";
// import { useSelector } from "react-redux";
// import Context from "../Context/Context";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  // const xxx = useContext(Context);
  // console.log(xxx.$auth.auth);

  // const status = useSelector((s) => s.sliceAuth.singIn);
  // console.log(status);

  let x = true;

  return x ? <Outlet /> : <Navigate to="login" />;
};
export default PrivateRoute;
