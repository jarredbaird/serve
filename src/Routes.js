import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Authed from "./Authed";
import CreateEventTemplateForm from "./CreateEventTemplateForm";
import SignInForm from "./SignInForm.js";
import SignupForm from "./SignupForm.js";

function Routes() {
  return (
    <Switch>
      <Route exact path="/signin">
        <SignInForm />
      </Route>
      <Route exact path="/signup">
        <SignupForm />
      </Route>
      <Route exact path="/authed">
        <Authed />
      </Route>
      <Route exact path="/event-template/create">
        <CreateEventTemplateForm />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;
