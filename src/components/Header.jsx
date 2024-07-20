import { Link, useNavigate } from "react-router-dom";
import { getUser } from "../utils/helpers";

const Header = () => {
  const user = getUser();
  const navigate = useNavigate();

  const logUseOut = () => {
    localStorage.removeItem("isVendorToken");
    localStorage.removeItem("isVendorTokenData");
    navigate("/login");
  };

  return (
    <div className="navbar fixed t-0">
      <div className="nav-container container">
        <Link
          to="/"
          className="logo"
          style={{ color: "white", textDecoration: "None" }}
        >
          Firearms Inventory
        </Link>
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/firearms" className="nav-link">
              My Firearms
            </Link>{" "}
          </li>
          {user ? (
            <>
              <li className="nav-item">
                <Link to="/profile" className="nav-link">
                  My Account
                </Link>{" "}
              </li>
              <li className="nav-item">
                <span className="nav-link" onClick={logUseOut}>
                  Logout
                </span>{" "}
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>{" "}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
