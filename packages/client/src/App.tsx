import React, { useEffect, useContext } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SigninView from "./views/Signin";
import {
  defaultDependencies,
  AppDependenciesContext,
  AppDependencies,
} from "./appDependencies";
import InterestsView from "./views/Interests";
import createEvent from "./views/CreateEvent";
import EventListView from "./views/EventList";
import EmailVerification from "./views/EmailVerification";
import { useRecoilState } from "recoil";
import { signedIn, emailVerified } from "./store";
import routes from "./constants/routes";

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
  const [signedInState, setSignedInState] = useRecoilState(signedIn);
  const [emailVerifiedState, setEmailVerifiedState] = useRecoilState(
    emailVerified
  );

  useEffect(() => {
    // this app will receive a request (to verify the email)
    // some method to retrigger this check

    auth.onAuthStateChanged((user) => {
      const isSignedIn = user ? true : false;
      setSignedInState(isSignedIn);

      const isEmailVerified = user?.emailVerified ? true : false;
      setEmailVerifiedState(isEmailVerified);
    });
  }, [auth, setSignedInState, setEmailVerifiedState]);

  return (
    <div className={classes.root}>
      <AppDependenciesContext.Provider value={defaultDependencies}>
        <Router>
          {!signedInState && <SigninView />}
          {signedInState && !emailVerifiedState && <EmailVerification />}
          {signedInState && emailVerifiedState && (
            <Switch>
              <Route exact path={routes.HOME_URL} component={EventListView} />
              <Route
                exact
                path={routes.INTERESTS_URL}
                component={InterestsView}
              />
              <Route
                exact
                path={routes.CREATE_EVENT_URL}
                component={createEvent}
              />
            </Switch>
          )}
        </Router>
      </AppDependenciesContext.Provider>
    </div>
  );
}
