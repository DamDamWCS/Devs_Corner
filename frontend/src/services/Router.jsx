/* eslint-disable import/no-extraneous-dependencies */
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import SubjectList from "../pages/subjectsList/SubjectsList";
import Subject from "../pages/subject/Subject";
import Account from "../pages/account/Account";
import Landing from "../pages/landing/Landing";

function RouterApp() {
  const isLoggedIn = sessionStorage.getItem("token") !== null;
  return (
    <Router>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<SubjectList />} />
            <Route path="/subject/:id" element={<Subject />} />
            <Route path="/account" element={<Account />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default RouterApp;
