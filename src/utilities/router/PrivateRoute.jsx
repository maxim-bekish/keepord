import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const status = useSelector((s) => s.sliceAuth.singIn);
console.log(status);
let x=true;
  return x ? <Outlet /> : <Navigate to="login" />;
};
export default PrivateRoute;
