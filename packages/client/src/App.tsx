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
import PasswordResetView from "./views/PasswordReset";
import EmailVerificationView from "./views/EmailVerification";
import { useRecoilState } from "recoil";
import { signedIn, emailVerified } from "./store";
import routes from "./constants/routes";
import SignInView from "./views/Signin/SignIn";
import CreateAccountView from "./views/Signin/CreateAccount";
import EventDetailsView from "./views/EventDetails";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      display: "flex",
      height: "100vh",
      justifyContent: "center",
      alignItems: "center",
      overflow: "scroll",
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
          {!signedInState && (
            <Switch>
              {!emailVerifiedState}
              <Route
                exact
                path={routes.HOME_URL}
                component={SignInView}
              ></Route>
              <Route
                exact
                path={routes.CREATE_ACCOUNT_URL}
                component={CreateAccountView}
              ></Route>
              <Route
                exact
                path={routes.PASSWORD_RESET_URL}
                component={PasswordResetView}
              ></Route>
            </Switch>
          )}

          {signedInState && !emailVerifiedState && <EmailVerificationView />}
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
              <Route
                exact
                path={routes.EVENT_DETAILS_URL}
                component={EventDetailsView}
              ></Route>
            </Switch>
          )}
        </Router>
      </AppDependenciesContext.Provider>
    </div>
  );
}
