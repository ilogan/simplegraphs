import React from "react";
import { Route, Switch } from "react-router-dom";

import Landing from "./containers/Landing";
import Login from "./containers/Login";

export default () => {
  return (
    <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/login" exact component={Login} />
    </Switch>
  );
};
