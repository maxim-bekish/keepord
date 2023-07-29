/* eslint-disable react/jsx-pascal-case */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import First_page from "./all_pages/first_page/first_page";
import Login_pages from "./all_pages/login_pages/login_pages/login_pages";
import Registration_page from "./all_pages/registration_page/registration_page";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<First_page />} />
          <Route path="/login" element={<Login_pages />} />
          <Route path="/registration" element={<Registration_page />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
