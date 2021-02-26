import React, { useEffect, useContext, useMemo } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  defaultDependencies,
  AppDependenciesContext,
  AppDependencies,
} from "./appDependencies";
import PasswordResetView from "./views/PasswordReset";
import EmailVerificationView from "./views/EmailVerification";
import { useRecoilState } from "recoil";
import { signedIn, emailVerified, user } from "./store";
import routes from "./constants/routes";
import SignInView from "./views/SignIn";
import CreateAccountView from "./views/CreateAccount";
import Menubar from "./views/Menubar";
import AuthenticatedViews from "./views/AuthenticatedViews";
import UsersService from "./services/usersService";
import { SnackbarProvider } from "notistack";

export default function App() {
  const { db, auth }: AppDependencies = useContext(AppDependenciesContext);
  const usersService = useMemo(() => {
    return new UsersService(db, auth);
  }, [db, auth]);
  const [signedInState, setSignedInState] = useRecoilState(signedIn);
  const [emailVerifiedState, setEmailVerifiedState] = useRecoilState(
    emailVerified
  );
  const [, setUserState] = useRecoilState(user);

  useEffect(() => {
    let currentURL = window.location.href;
    if (currentURL.includes("?share=true")) {
      let shareURL = currentURL.replace("?share=true", "");
      localStorage.setItem("shareURL", shareURL);
    }
    auth.onAuthStateChanged((user) => {
      const isSignedIn = user ? true : false;
      setSignedInState(isSignedIn);

      const isEmailVerified = user?.emailVerified ? true : false;
      setEmailVerifiedState(isEmailVerified);

      if (isSignedIn) usersService.getUser(user.uid).then(setUserState);

      if (isSignedIn && isEmailVerified && localStorage.getItem("shareURL")) {
        let shareURL = localStorage.getItem("shareURL");
        window.location.replace(shareURL);
        localStorage.clear();
      }
    });
  }, [
    auth,
    setSignedInState,
    setEmailVerifiedState,
    usersService,
    setUserState,
  ]);

  return (
    <div>
      <AppDependenciesContext.Provider value={defaultDependencies}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
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
                <Route component={SignInView}></Route>
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
        </SnackbarProvider>
      </AppDependenciesContext.Provider>
    </div>
  );
}
