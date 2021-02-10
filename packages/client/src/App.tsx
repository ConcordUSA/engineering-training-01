import React, { useEffect, useContext } from "react";
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
import { useRecoilState } from "recoil";
import { signedIn } from "./store";
import ProtectedRoute from "./components/protectedRoute";
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
  const [, setSignedInState] = useRecoilState(signedIn);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setSignedInState(true);
      } else {
        setSignedInState(false);
      }
    });
  }, [auth, setSignedInState]);

  return (
    <div className={classes.root}>
      <AppDependenciesContext.Provider value={defaultDependencies}>
        <Router>
          <Switch>
            <Route exact path={routes.SIGNIN_URL} component={SigninView} />
            <Route
              exact
              path={routes.CREATE_ACCOUNT_URL}
              component={CreateAccountView}
            />
            <ProtectedRoute
              exact
              path={routes.EVENTS_URL}
              component={EventListView}
            />
            <ProtectedRoute
              exact
              path={routes.INTERESTS_URL}
              component={InterestsPage}
            />
            <ProtectedRoute
              exact
              path={routes.EMAIL_VERIFICATION_URL}
              component={EmailVerification}
            />
            <ProtectedRoute exact path={"/"} component={SigninView} />
          </Switch>
        </Router>
      </AppDependenciesContext.Provider>
    </div>
  );
}
