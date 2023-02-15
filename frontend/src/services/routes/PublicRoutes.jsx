/* eslint-disable import/no-extraneous-dependencies */
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "../../pages/login/Login";
import Signup from "../../pages/signup/Signup";
import Landing from "../../pages/landing/Landing";

function PublicRoutes() {
  return (
    <Router>
      <Routes>
        <>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </>
      </Routes>
    </Router>
  );
}

export default PublicRoutes;
