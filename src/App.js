/* eslint-disable react/jsx-pascal-case */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import First_page from "./pages/FirstPage/FirstPage";
import LoginPages from "./pages/LoginPages/LoginPages";
import Card from "./pages/Card/Card";
import Registration_page from "./pages/RegistrationPage/RegistrationPage";
import MethodsPage from "./pages/MethodsPage/MethodsPage";
import Home from "./pages/Home/Home";
import EditCard from "./pages/EditCard/EditCard";
import ListData from "./components/ListData/ListData";

import { CreatingCard } from "./pages/CreatingCard/CreatingCard";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Context from "./utilities/Context/Context";
import { useState } from "react";
import ListOfThings from "./components/ListOfThings/ListOfThings";
// import PrivateRoute from "./utilities/router/PrivateRoute";
import { RequireAuth } from "./utilities/router/RequireAuth.jsx";
//import { AuthProvider } from "./utilities/router/AuthProvider.jsx";

function App() {

  const [category, setCategory] = useState(null);
  const [storage, setStorage] = useState(null);

  const [isActiveBaseAndList, setIsActiveBaseAndList] = useState("base");

  let stateContext = {
    $state: {},
    $isActiveBaseAndList: {
      isActiveBaseAndList: isActiveBaseAndList,
      setIsActiveBaseAndList: setIsActiveBaseAndList,
    },
    $category: { category: category, setCategory: setCategory },
    $storage: { storage: storage, setStorage: setStorage },
  };

  return (
    //<AuthProvider>
      <Context.Provider value={stateContext}>
        <Router>
          <Routes>
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/first_page" element={<First_page />} />
            <Route path="/login" element={<LoginPages />} />
            <Route path="/registration" element={<Registration_page />} />
            <Route path="/methodsPage" element={<MethodsPage />} />
            {/* <Route element={<PrivateRoute />}> */}

            <Route
              path="/creatingCard"
              element={
                //<RequireAuth>
                  <CreatingCard />
                //</RequireAuth>
              }
            />
            <Route
              path="/card/:idCard"
              element={
                //<RequireAuth>
                  <Card />
                //</RequireAuth>
              }
            />
            <Route
              path="/card/:idCard/editCard"
              element={
                //<RequireAuth>
                  <EditCard />
                //</RequireAuth>
              }
            />
            <Route
              path="/"
              element={
                //<RequireAuth>
                  <Home />
                //</RequireAuth>
              }
            >
              <Route
                index
                element={
                  //<RequireAuth>
                    <ListOfThings />
                  //</RequireAuth>
                }
              />
              <Route
                path="listData"
                element={
                  //<RequireAuth>
                    <ListData />
                  //</RequireAuth>
                }
              />
            </Route>
            {/* </Route> */}
          </Routes>
        </Router>
      </Context.Provider>



  );
}

export default App;
