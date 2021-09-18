import React from "react";
import { Route, Switch } from "react-router-dom";
import "./views/styles.css";

import RestaurantShow from "./views/show";

/** Routes for restaurants. */
export default function RestaurantsRoutes() {
  const currRoute = "/restaurants";

  return (
    <Switch>
      <Route path={`${currRoute}/:id`} component={RestaurantShow} />
    </Switch>
  );
}
