import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Signin from "./Signin.js";
import Signup from "./Signup.js";

function Routes() {
  return (
    <Switch>
      <Route exact path="/signin">
        <Signin />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;
