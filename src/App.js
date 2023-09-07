/* eslint-disable react/jsx-pascal-case */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import First_page from "./pages/FirstPage/FirstPage";
import LoginPages from "./pages/LoginPages/LoginPages";
import Registration_page from "./pages/RegistrationPage/RegistrationPage";
import MethodsPage from "./pages/MethodsPage/MethodsPage";
import Home from "./pages/Home/Home";
import AddObject from "./pages/AddObject/AddObject";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<First_page />} />
        <Route path="/login" element={<LoginPages />} />
        <Route path="/registration" element={<Registration_page />} />
        <Route path="/send" element={<MethodsPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/add_object" element={<AddObject />} />
      </Routes>
    </Router>
  );
}

export default App;
