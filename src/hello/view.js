import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";

import { UserContext } from "../utils/context";
import jwtDecode from "jwt-decode";
import { Card, Input } from "antd";
import { logout } from "../users/view/auth";
import logo from "../assets/logo.png";
import Header from "./header";

import { toQueryString } from "../utils/front-functions";

/** Don't forget to JS-Doc all your components to know what you're doing! */
export default function Hello() {
  const history = useHistory();
  const accessToken = useContext(UserContext);
  const [search, setSearch] = useState("");

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
    <div className="App">
      <Header />
      <body className="App-body">
        <Card className="app-body__card">
          <Input
            prefix={<SearchOutlined />}
            placeholder="What you want to eat today"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="my-buttons-header primary"
            onClick={() => {
              history.push(`/dishes?${toQueryString({ prevInput: search })}`);
            }}
          >
            {" "}
            Search
          </button>
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
