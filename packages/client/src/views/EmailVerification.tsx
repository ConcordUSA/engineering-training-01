import React, { useContext, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { AppDependencies, AppDependenciesContext } from "../appDependencies";
import routes from "../constants/routes";
import getConfig from "../config";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      height: "90%",
    },
  })
);
export default function EmailVerificationView() {
  const classes = useStyles();
  const config = getConfig();

  const { auth }: AppDependencies = useContext(AppDependenciesContext);

  useEffect(() => {
    auth.currentUser
      ?.sendEmailVerification({
        url: config.appUrl + routes.HOME_URL,
      })
      .then(() => {
        console.log("email verification sent");
      })
      .catch(() => {
        console.log("user not logged in.");
      });
  }, [auth, config.appUrl]);

  return (
    <div className={classes.root}>
      <h2>email verificaiion</h2>
    </div>
  );
}
