import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import TokenContext from "../../services/contexts/TokenContext";

function Login() {
  const { setIsLoggedIn } = useContext(TokenContext);
  const navigate = useNavigate();
  const handleclick = async () => {
    await sessionStorage.setItem(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsInVzZXJSb2xlIjoidXNlciIsInVzZXJTdGF0ZSI6MSwiaWF0IjoxNjc2NDE0MTIxLCJleHAiOjE2NzY1MDA1MjF9._JiRl-zBINxA7Nsfjqd0Xgnf6H3LsWdMntLqhvO05G0"
    );
    setIsLoggedIn(true);
    navigate("/");
  };
  return (
    <div className="text-center">
      <h1>PAGE LOGIN</h1>
      <p>Test ICON :</p>
      <i className="icons-checked icons-size-30px" aria-hidden="true" />
      <button type="button" onClick={handleclick}>
        TEST CONEXION
      </button>
    </div>
  );
}

export default Login;
