import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import { UserContext } from "../utils/context";
import jwtDecode from "jwt-decode";
import { logout } from "../users/view/auth";
import logo from "../assets/logo.png";
export default function Header() {
  const accessToken = useContext(UserContext);
  let user = "";
  if (accessToken === null) {
  } else {
    user = jwtDecode(accessToken);
  }
  const logoutUser = () => {
    logout();
    window.location.reload();
  };
  return (
    <header className="App-header">
      {user !== "" ? (
        <>
          <Link to="/">
            <img src={logo} alt="logo"></img>
          </Link>{" "}
          <div>
            <Link to="/profile/recommendations">
              <button className="my-buttons-header primary">
                My profile: {user.name.substr(0, user.name.indexOf(" "))}
              </button>
            </Link>

            <button className="my-buttons-header primary" onClick={logoutUser}>
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <Link to="/">
            <img src={logo} alt="logo"></img>
          </Link>
          <div>
            <Link to="/auth">
              <button className="my-buttons-header primary">Signup</button>
            </Link>
            <Link to="/auth">
              <button className="my-buttons-header primary">Login</button>
            </Link>
          </div>
        </>
      )}
    </header>
  );
}
