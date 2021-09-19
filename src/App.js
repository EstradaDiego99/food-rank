import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import Hello from "./hello/view";
import RestaurantRoutes from "./restaurants/view";
import DishesRoutes from "./dishes/view";
import LayoutSignIn from "./users/view/LayoutSignIn";

import ProfileRecommendations from "./users/view/recommendations";

import { UserContext } from "./utils/context";
import { getAccessTokenApi } from "./users/view/auth";

export default function App() {
  const [accessToken, setAccessToken] = useState(undefined);

  // useEffect(() => checkSession(accessToken), []);
  useEffect(() => setAccessToken(getAccessTokenApi()), []);

  if (accessToken === undefined) {
    return <div>Cargando...</div>;
  }
  //PONER EN RUTAS PROTEGIDAS
  /*if (accessToken === null) {
    return <LayoutSignIn />;
  }*/

  return (
    <UserContext.Provider value={accessToken}>
      <Router>
        <Switch>
          <Route exact path="/" component={Hello} />
          <Route
            exact
            path="/profile/recommendations"
            component={ProfileRecommendations}
          />
          <Route path="/restaurants" component={RestaurantRoutes} />
          <Route path="/dishes" component={DishesRoutes} />
          <Route path="/auth" component={LayoutSignIn} />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}
