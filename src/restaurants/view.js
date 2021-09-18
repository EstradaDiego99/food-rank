import React from "react";
import { Route, Switch } from "react-router-dom";
import "./views/styles.css";

import RestaurantShow from "./views/show";
import RestaurantIndex from "./views/index";

/** Routes for restaurants. */
export default function RestaurantsRoutes() {
  const currRoute = "/restaurants";

  return (
    <Switch>
      <Route exact path={`${currRoute}`} component={RestaurantIndex} />
      <Route exact path={`${currRoute}/:id`} component={RestaurantShow} />
    </Switch>
  );
}
