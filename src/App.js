/* eslint-disable react/jsx-pascal-case */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import First_page from "./pages/first_page/FirstPage";
import LoginPages from "./pages/login_pages/LoginPages";
import Registration_page from "./pages/registration_page/RegistrationPage";

function App() {
  // const isLogin=localStorage.getItem('isLogin')
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<First_page />} />
          <Route path="/login" element={<LoginPages />} />
          <Route path="/registration" element={<Registration_page />} />
          <Route path="/loveNastasia" element={<div>love Nastasia</div>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
