import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../utils/context";
import jwtDecode from "jwt-decode";
import { Card, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { logout } from "../users/view/auth";
import logo from "../assets/logo.png";

/** Don't forget to JS-Doc all your components to know what you're doing! */
export default function Hello() {
  const accessToken = useContext(UserContext);
  const [search, setSearch] = useState("");
  let user = "";
  if (accessToken === null) {
  } else {
    user = jwtDecode(accessToken);
  }
  const handleChange = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };

  const logoutUser = () => {
    logout();
    window.location.reload();
  };
  return (
    <div className="App">
      <header className="App-header">
        {user !== "" ? (
          <>
            <Link to="/">
              <img src={logo}></img>
            </Link>{" "}
            <div>
              <Link to="/">
                <button className="my-buttons-header primary">
                  My profile: {user.name.substr(0, user.name.indexOf(" "))}
                </button>
              </Link>

              <button
                className="my-buttons-header primary"
                onClick={logoutUser}
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <Link to="/">
              <img src={logo}></img>
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

      <body className="App-body">
        <Card className="app-body__card">
          <Input
            prefix={<SearchOutlined />}
            placeholder="What you want to eat today"
            onChange={handleChange}
          />
          <button className="my-buttons-header primary"> Search</button>
        </Card>
        <h1>Welcome back to YumYumRank!</h1>
        <div className="div__buttons">
          <Link to="/restaurants">
            <button className="my-buttons secondary">Restaurants</button>
          </Link>
          <Link to="/dishes">
            <button className="my-buttons secondary">Dishes</button>
          </Link>
        </div>
      </body>
    </div>
  );
}
