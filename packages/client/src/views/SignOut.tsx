import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AppDependencies, AppDependenciesContext } from "../appDependencies";
import routes from "../constants/routes";

export default function SignOutView() {
  const history = useHistory();
  const { auth }: AppDependencies = useContext(AppDependenciesContext);

  useEffect(() => {
    if (auth.currentUser) {
      auth.signOut().then(() => {
        history.push(routes.HOME_URL);
      });
    } else {
      history.push(routes.HOME_URL);
    }
  }, [auth]);

  return (
    <div>
      <h1>Signing Out</h1>
    </div>
  );
}
