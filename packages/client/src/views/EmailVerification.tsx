import React, { useContext, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
// import { TextField, Button, Paper, Input } from "@material-ui/core";
// import { useHistory } from "react-router-dom";
// import UsersService from "../services/usersService";
import { AppDependencies, AppDependenciesContext } from "../appDependencies";
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
  //   const history = useHistory();
  const { auth }: AppDependencies = useContext(AppDependenciesContext);
  //   const usersService = new UsersService(db, auth);
  //assuming that user has just logged or created account
  //and their email is not verified
  useEffect(() => {
    auth.currentUser
      ?.sendEmailVerification({
        url: "http://localhost:3000",
      })
      .then(() => {
        console.log("email verification sent");
      })
      .catch(() => {
        console.log("user not logged in.");
      });
  }, [auth]);
  //we send an email to their address
  //provide a button on this page to resend email
  //once user is verified, navigate to regular page
  return (
    <div className={classes.root}>
      <h2>email verificaiion</h2>
    </div>
  );
}
