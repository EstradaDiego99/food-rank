import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import Hello from "./hello/view";
import RestaurantRoutes from "./restaurants/view";

ReactDOM.render(
  <Router>
    <StrictMode>
      <Switch>
        <Route exact path="/" component={Hello} />
        <Route path="/restaurants" component={RestaurantRoutes} />
      </Switch>
    </StrictMode>
  </Router>,
  document.getElementById("root")
);
