import React from "react";
import { Route, Switch } from "react-router-dom";
import "./views/styles.css";

import DishesNew from "./views/new";
// import DishesEdit from "./view/edit";

/** Switch de las diferentes vistas para una entidad. */
export default function DishesRoutes() {
  const currRoute = "/dishes";

  return (
    <Switch>
      <Route path={`${currRoute}/new`} exact component={DishesNew} />
    </Switch>
  );
}
