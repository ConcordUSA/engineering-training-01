import React, { useState, useContext } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";

import { AppDependencies, AppDependenciesContext } from "../appDependencies";
import { Paper, Button, TextField } from "@material-ui/core";
import AppTheme from "../styles/theme";
import getConfig from "../config";
import routes from "../constants/routes";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      height: "100%",
      width: "100%",
      backgroundColor: "#D6D6D6",
    },
    paperWrap: {
      marginTop: "3%",
      marginBottom: "3%",
      display: "flex",
      flexWrap: "wrap",
      width: "90%",
    },
    icon: {
      fontSize: "6em",
    },
    accountInput: {
      width: "70%",
      margin: "5px",
    },

    btnBack: {},
    btnDiv: {
      display: "flex",
      marginTop: "8px",
      marginLeft: "15%",
    },
    form: {
      marginTop: "10%",
      width: "60%",
      textAlign: "center",
    },
    banner: {
      background:
        "linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)",
      height: "100%",
      width: "40%",
      textAlign: "center",
      borderRadius: "0px 4px 4px 0px",
    },
    signUpHeader: {
      textAlign: "left",
      marginLeft: "15%",
    },
    iconDiv: {
      marginTop: "6rem",
    },
    fstdDiv: {
      marginTop: "7rem",
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      color: AppTheme.primaryText,
      width: "30%",
      backgroundColor: AppTheme.primary,
      "&:hover": {
        backgroundColor: AppTheme.secondary,
      },
    },
  })
);

export default function PasswordResetView() {
  const classes = useStyles();
  const history = useHistory();
  const { auth }: AppDependencies = useContext(AppDependenciesContext);
  const [emailState, setEmailState] = useState("");
  const config = getConfig();

  const handleForgotPassword = () => {
    var emailAddress = emailState;
    auth
      .sendPasswordResetEmail(emailAddress, {
        url: config.appUrl + routes.HOME_URL,
        handleCodeInApp: true,
      })
      .then(() => {
        //TODO: Handle this global message
        console.log("email sent");
      });
  };

  const handleBack = () => {
    history.push(routes.HOME_URL);
  };

  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.paperWrap}>
        <div className={classes.form}>
          <h1 className={classes.signUpHeader}>Password Reset</h1>
          <p className={classes.signUpHeader}>
            Enter email associated with account
          </p>
          <TextField
            className={classes.accountInput}
            variant="outlined"
            margin="normal"
            required
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={emailState}
            onChange={(e) => {
              setEmailState(e.target.value);
            }}
          />
          <div className={classes.btnDiv}>
            <Button className={classes.btnBack} onClick={handleBack}>
              <ArrowBackIcon />
            </Button>
            <Button
              id="registerButton"
              onClick={handleForgotPassword}
              className={classes.submit}
              variant="contained"
            >
              Send password reset email
            </Button>
          </div>
        </div>
        <div className={classes.banner}>
          <div className={classes.iconDiv}>
            <img
              src="/fstd-icns.png"
              alt="Flower Sun Leaf Snowflake, Four Seasons Logo"
            />
          </div>
          <div className={classes.fstdDiv}>
            <img src="./fstd-text.png" alt="Four Seasons Total Development" />
          </div>
        </div>
      </Paper>
    </div>
  );
}
