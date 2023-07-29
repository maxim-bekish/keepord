/* eslint-disable react/jsx-pascal-case */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import First_page from "./all_pages/first_page/FirstPage";
import LoginPages from "./all_pages/login_pages/LoginPages";
import Registration_page from "./all_pages/registration_page/RegistrationPage";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<First_page />} />
          <Route path="/login" element={<LoginPages />} />
          <Route path="/registration" element={<Registration_page />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
