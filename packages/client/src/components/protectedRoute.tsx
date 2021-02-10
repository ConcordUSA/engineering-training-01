import React from "react";
import { useRecoilState } from "recoil";
import { signedIn } from "../store";
import { Route, Redirect } from "react-router-dom";
import routes from "../constants/routes";

export default function ProtectedRoute(props: any) {
  const { component: Component, ...rest } = props;
  const [signedInState] = useRecoilState(signedIn);

  return (
    <Route
      {...rest}
      render={(props) =>
        signedInState === true ? (
          <Component {...props} />
        ) : (
          <Redirect to={routes.SIGNIN_URL} />
        )
      }
    />
  );
}
