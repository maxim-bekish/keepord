import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  let x = true;

  return x ? <Outlet /> : <Navigate to="login" />;
};
export default PrivateRoute;
