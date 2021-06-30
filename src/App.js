import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import SignUpPage from "./components/signup/SignUpPage";
import SignInPage from "./components/signin/SignInPage";
import TasksPage from "./components/taskspage/TasksPage";
import CreateTaskPage from "./components/CreateTaskPage";
function App() {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/" component={SignUpPage} />
        <Route exact path="/signup/" component={SignUpPage} />
        <Route exact path="/signin/" component={SignInPage} />
        <Route exact path="/tasks/" component={TasksPage} />
        <Route exact path="/tasks/create" component={CreateTaskPage} />
        <Route exact path="/tasks/edit/:slug" component={CreateTaskPage} />
      </Switch>
    </Fragment>
  );
}

export default App;
