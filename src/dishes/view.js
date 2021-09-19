import React from "react";
import { Route, Switch } from "react-router-dom";
import "./views/styles.css";

import DishesNew from "./views/new";
import ShowDish from "./views/show";
// import DishesEdit from "./view/edit";

/** Switch de las diferentes vistas para una entidad. */
export default function DishesRoutes() {
  const currRoute = "/dishes";

  return (
    <Switch>
      <Route exact path={`${currRoute}/new`} component={DishesNew} />
      <Route exact path={`${currRoute}/:id`} component={ShowDish} />
    </Switch>
  );
}
