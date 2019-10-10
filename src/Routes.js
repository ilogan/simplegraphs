import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";

import Landing from "./containers/Landing";
import Login from "./containers/Login";
import NotFound from "./components/NotFound";

export default props => {
  console.log(props);
  return (
    <Switch>
      <AppliedRoute path="/" props={props} exact component={Landing} />
      <AppliedRoute path="/login" props={props} exact component={Login} />
      <Route component={NotFound} />
    </Switch>
  );
};
