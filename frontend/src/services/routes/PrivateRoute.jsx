/* eslint-disable import/no-extraneous-dependencies */
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SubjectList from "../../pages/subjectsList/SubjectsList";
import Subject from "../../pages/subject/Subject";
import Account from "../../pages/account/Account";
import Footer from "../../components/footer/Footer";

function PrivateRoute() {
  return (
    <Router>
      <Routes>
        <>
          <Route path="/" element={<SubjectList />} />
          <Route path="/subject/:id" element={<Subject />} />
          <Route path="/account" element={<Account />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </>
      </Routes>
      <Footer />
    </Router>
  );
}

export default PrivateRoute;
