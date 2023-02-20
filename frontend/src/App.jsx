/* eslint-disable react/jsx-no-constructed-context-values */
import "./App.css";
import { useState } from "react";
import PublicRoutes from "./services/routes/PublicRoutes";
import PrivateRoute from "./services/routes/PrivateRoute";
import TokenContext from "./services/contexts/TokenContext";
import Header from "./components/header/Header";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("token") !== null
  );

  return (
    <div className="App">
      <TokenContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <Header />
        {isLoggedIn ? <PrivateRoute /> : <PublicRoutes />}
      </TokenContext.Provider>
    </div>
  );
}

export default App;
