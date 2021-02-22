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
      alignItems: "center",
      height: "100vh",
      width: "100vw",
      backgroundColor: AppTheme.background,
    },
    paperWrap: {
      display: "flex",
      flexWrap: "wrap",
      width: "900px",
      overflow: "hidden",
    },
    icon: {
      fontSize: "6em",
    },
    accountInput: {
      width: "72%",
      "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
          borderColor: AppTheme.input,
        },
      },
      "& label.Mui-focused": {
        color: AppTheme.input,
      },
    },
    passwordResetText: {
      textAlign: "center",
    },
    btnDiv: {
      display: "flex",
      justifyContent: "space-around",
      marginTop: "8px",
    },
    form: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      width: "60%",
    },
    banner: {
      background:
        "linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)",
      backgroundSize: "cover",
      width: "40%",
      display: "flex",
      flexFlow: "column",
      alignItems: "center",
      justifyContent: "space-around",
      padding: "10px 0px 10px 0px",
      borderRadius: "0px 4px 4px 0px",
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
          <div className={classes.passwordResetText}>
            <h1>Password Reset</h1>
            <img src="./lock-icon.svg" alt="lock icon" />
            <p>Enter email associated with account</p>
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
          </div>
          <div className={classes.btnDiv}>
            <Button onClick={handleBack}>
              <ArrowBackIcon />
            </Button>
            <Button
              id="registerButton"
              onClick={handleForgotPassword}
              className={classes.submit}
              variant="contained"
            >
              Send email
            </Button>
          </div>
        </div>
        <div className={classes.banner}>
          <div>
            <img
              src="/fstd-icns.png"
              alt="Flower Sun Leaf Snowflake, Four Seasons Logo"
            />
          </div>
          <div>
            <img src="./fstd-text.png" alt="Four Seasons Total Development" />
          </div>
        </div>
      </Paper>
    </div>
  );
}
