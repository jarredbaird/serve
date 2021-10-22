import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Authed from "../Authed";
import CreateEventTemplateForm from "../events/CreateEventTemplateForm";
import ShowEventTemplates from "../events/ShowEventTemplates";
import SignInForm from "../account/SignInForm.js";
import SignupForm from "../account/SignUpForm.js";
import Home from "../common/Home.js";
import PrivateRoute from "./PrivateRoute";

function Routes() {
  return (
    <Switch>
      <Route exact path="/signin">
        <SignInForm />
      </Route>
      <Route exact path="/signup">
        <SignupForm />
      </Route>
      <PrivateRoute exact path="/authed">
        <Authed />
      </PrivateRoute>
      <PrivateRoute exact path="/event-templates/create">
        <CreateEventTemplateForm />
      </PrivateRoute>
      <PrivateRoute exact path="/event-templates">
        <ShowEventTemplates />
      </PrivateRoute>
      <PrivateRoute exact path="/home">
        <Home />
      </PrivateRoute>
      <Redirect to="/home" />
    </Switch>
  );
}

export default Routes;
