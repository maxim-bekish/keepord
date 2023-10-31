/* eslint-disable react/jsx-pascal-case */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import First_page from "./pages/FirstPage/FirstPage";
import LoginPages from "./pages/LoginPages/LoginPages";
import ThingsCard from "./pages/ThingsCard/ThingsCard";
import Registration_page from "./pages/RegistrationPage/RegistrationPage";
import MethodsPage from "./pages/MethodsPage/MethodsPage";
import Home from "./pages/Home/Home";
import ListData from "./components/ListData/ListData";

import CreatingCard from "./pages/CreatingCard/CreatingCard";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import PrivateRoute from "./utilities/router/PrivateRoute";
import Context from "./utilities/Context/Context";
import { useState } from "react";

function App() {
  const [auth, setAuth] = useState(false);
  const [category, setCategory] = useState(null);
  const [storage, setStorage] = useState(null);
  const [isActiveBaseAndList, setIsActiveBaseAndList] = useState("base");

  let stateContext = {
    $isActiveBaseAndList:{ isActiveBaseAndList:isActiveBaseAndList,setIsActiveBaseAndList: setIsActiveBaseAndList},
    $auth: { auth: auth, setAuth: setAuth },
    $category: { category: category, setCategory: setCategory },
    $storage: { storage: storage, setStorage: setStorage },
  };

  return (
    <Context.Provider value={stateContext}>
      <Router>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<First_page />} />
          <Route path="/login" element={<LoginPages />} />
          <Route path="/registration" element={<Registration_page />} />
          <Route path="/methodsPage" element={<MethodsPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/creatingCard" element={<CreatingCard />} />
            <Route path="/thingsCard" element={<ThingsCard />} />
            <Route path="/home/:id" element={<ListData />} />
          </Route>
        </Routes>
      </Router>
    </Context.Provider>
  );
}

export default App;
