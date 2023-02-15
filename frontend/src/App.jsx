/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable import/no-extraneous-dependencies */
import "./App.css";
import { useState } from "react";
import PublicRoutes from "./services/routes/PublicRoutes";
import PrivateRoute from "./services/routes/PrivateRoute";
import TokenContext from "./services/contexts/TokenContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("token") !== null
  );
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return (
    <TokenContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {isLoggedIn ? <PrivateRoute /> : <PublicRoutes />}
    </TokenContext.Provider>
  );
}

export default App;
