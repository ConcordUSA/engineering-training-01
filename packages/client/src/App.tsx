import React, { useState, useEffect, useContext } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import CreateAccountView from "./views/CreateAccount";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SigninView from "./views/Signin";
import {
  defaultDependencies,
  AppDependenciesContext,
  AppDependencies,
} from "./appDependencies";
import InterestsPage from "./views/InterestsPage";
import EventListView from "./views/EventList";
import EmailVerification from "./views/EmailVerification";

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
  const { auth }: AppDependencies = useContext(AppDependenciesContext);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setSignedIn(!user ? false : true);
    });
  }, [auth]);

  return (
    <div className={classes.root}>
      <AppDependenciesContext.Provider value={defaultDependencies}>
        {!signedIn && (
          <Router>
            <Switch>
              <Route path="/createAccount">
                <CreateAccountView />
              </Route>
            </Switch>
            <Switch>
              <Route path="/" exact>
                <SigninView />
              </Route>
            </Switch>
          </Router>
        )}

        {signedIn && (
          <Router>
            <Switch>
              <Route path="/interests" exact>
                <InterestsPage />
              </Route>
            </Switch>
            <Switch>
              <Route path="/emailVerification" exact>
                <EmailVerification />
              </Route>
            </Switch>
            <Switch>
              <Route path="/" exact>
                <EventListView />
              </Route>
            </Switch>
          </Router>
        )}
      </AppDependenciesContext.Provider>
    </div>
  );
}
