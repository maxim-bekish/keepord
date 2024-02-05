import { createContext, useState } from "react";
import { getCookie } from "../../fun/getCookie";

export const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {


  const [status, setStatus] = useState(null);

  const signIn = (status, cd) => {
    setStatus(status);
    cd();
  };
  const signOut = (cd) => {
    setStatus(null);
    cd();
    document.cookie = `access=${getCookie("access")}; max-age=-1`;
    document.cookie = `refresh=${getCookie("refresh")}; max-age=-1`;
  };
  const value = { status, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
