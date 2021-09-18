import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import Hello from "./hello/view";
import RestaurantRoutes from "./restaurants/view";
import DishesRoutes from "./dishes/view";
import LayoutSignIn from "./users/view/LayoutSignIn";

import { UserContext } from "./utils/context";
import { getAccessTokenApi } from "./users/view/auth";

export default function App() {
  const [accessToken, setAccessToken] = useState(undefined);

  // useEffect(() => checkSession(accessToken), []);
  useEffect(() => setAccessToken(getAccessTokenApi()), []);

  if (accessToken === undefined) {
    return <div>Cargando...</div>;
  }

  if (accessToken === null) {
    return <LayoutSignIn />;
  }

  return (
    <Router>
      <UserContext.Provider value={accessToken}>
        <Switch>
          <Route exact path="/" component={Hello} />
          <Route path="/restaurants" component={RestaurantRoutes} />
          <Route path="/dishes" component={DishesRoutes} />
          <Route path="/auth" component={LayoutSignIn} />
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}
