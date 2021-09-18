import React from "react";
import { Route, Switch } from "react-router-dom";
import "./views/styles.css";

import PostsIndex from "./views/index";
import PostsNew from "./views/new";
// import PostsEdit from "./view/edit";

/** Switch de las diferentes vistas para una entidad. */
export default function PostsRoutes() {
  const currRoute = "/posts";

  return (
    <Switch>
      <Route path={currRoute} exact component={PostsIndex} />
      <Route path={`${currRoute}/new`} exact component={PostsNew} />
      {/* <Route path={`${currRoute}/:id/edit`} component={PostsEdit} /> */}
    </Switch>
  );
}
