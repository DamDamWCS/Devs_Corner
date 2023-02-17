import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <div className="bg-gray d-flex justify-content-between align-items-center py-1 px-2 ">
      <div className="d-flex">
        <img src="/src/assets/sncf-logo.png" alt="logo SNCF" height="22px" />
        <div className="text-white pl-2 text-sm">
          Bienvenue sur Dev's CORNER
        </div>
      </div>
      <div>
        <Link to="/login">
          <button type="button" className="btn btn-primary px-2 py-0">
            conexion
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
