/* eslint-disable react/jsx-pascal-case */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import First_page from "./pages/FirstPage/FirstPage";
import LoginPages from "./pages/LoginPages/LoginPages";
import ThingsCard from "./pages/ThingsCard/ThingsCard";
import Registration_page from "./pages/RegistrationPage/RegistrationPage";
import MethodsPage from "./pages/MethodsPage/MethodsPage";
import Home from "./pages/Home/Home";
import CreatingCard from "./pages/CreatingCard/CreatingCard";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import PrivateRoute from "./utilities/router/PrivateRoute";
import Context from "./utilities/Context/Context";
import { useState } from "react";

function App() {
  const [auth, setAuth] = useState(false);
  let stateContext = { $auth: { auth: auth, setAuth: setAuth } };

  return (
    <Context.Provider value={stateContext}>
      <Router>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<First_page />} />
          <Route path="/login" element={<LoginPages />} />
          <Route path="/registration" element={<Registration_page />} />
          <Route path="/send" element={<MethodsPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/creatingCard" element={<CreatingCard />} />
            <Route path="/thingsCard" element={<ThingsCard />} />
          </Route>
        </Routes>
      </Router>
    </Context.Provider>
  );
}

export default App;
