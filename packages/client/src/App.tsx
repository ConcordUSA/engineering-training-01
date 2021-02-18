import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  defaultDependencies,
  AppDependenciesContext,
  AppDependencies,
} from "./appDependencies";
import PasswordResetView from "./views/PasswordReset";
import EmailVerificationView from "./views/EmailVerification";
import { useRecoilState } from "recoil";
import { signedIn, emailVerified } from "./store";
import routes from "./constants/routes";
import SignInView from "./views/SignIn";
import CreateAccountView from "./views/CreateAccount";
import Menubar from "./views/Menubar";
import AuthenticatedViews from "./views/AuthenticatedViews";

export default function App() {
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
    <div>
      <AppDependenciesContext.Provider value={defaultDependencies}>
        <Router>
          {!signedInState && (
            <Switch>
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
            <div>
              <Menubar />
              <AuthenticatedViews />
            </div>
          )}
        </Router>
      </AppDependenciesContext.Provider>
    </div>
  );
}
