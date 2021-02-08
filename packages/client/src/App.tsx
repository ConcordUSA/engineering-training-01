import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import HelloWorldView from "./views/HelloWorld";
import LoginView from "./views/Login";
import CreateAccountView from "./views/CreateAccount";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signin from "./views/Signin";
import { defaultDependencies, AppDependenciesContext } from "./appDependencies";
import InterestsPage from "./views/InterestsPage";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      display: "flex",
      height: "100vh",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppDependenciesContext.Provider value={defaultDependencies}>
        <Router>
          <Switch>
            <Route path="/createAccount">
              <CreateAccountView />
            </Route>
          </Switch>
          <Switch>
            <Route path="/signin" exact>
              <Signin />
            </Route>
          </Switch>
          <Switch>
            <Route path="/login">
              <LoginView />
            </Route>
          </Switch>
            <Switch>
          <Route path = "/interests" exact>
            <InterestsPage />
              </Route>
        </Switch>
          <Switch>
            <Route path="/" exact>
              <HelloWorldView />
            </Route>
          </Switch>
        </Router>
      </AppDependenciesContext.Provider>
    </div>
  );
}
