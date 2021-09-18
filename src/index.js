import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import Hello from "./hello/view";
import RestaurantRoutes from "./restaurants/view";
import DishesRoutes from "./dishes/view";
import LayoutSignIn from "./users/view/LayoutSignIn";

ReactDOM.render(
  <Router>
    <StrictMode>
      <Switch>
        <Route exact path="/" component={Hello} />
        <Route path="/restaurants" component={RestaurantRoutes} />
        <Route path="/dishes" component={DishesRoutes} />
        <Route path="/auth" component={LayoutSignIn} />
      </Switch>
    </StrictMode>
  </Router>,
  document.getElementById("root")
);
