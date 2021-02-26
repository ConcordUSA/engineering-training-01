import React, { useContext, useEffect, useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import {
  Paper,
  Button,
  TextField,
  Container,
  Typography,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppTheme, { materialTheme } from "../styles/theme";
import { useHistory } from "react-router-dom";
import { AppDependencies, AppDependenciesContext } from "../appDependencies";
import routes from "../constants/routes";
import { Message } from "../models/message";
import Messages from "../components/messages";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      maxWidth: "100vw",
      backgroundColor: materialTheme.palette.background.default,
    },
    paper: {
      width: AppTheme.cardWidth,
      margin: "1em",
      textAlign: "center",
    },
    logo: {
      marginTop: "2%",
      marginBottm: "5%",
    },
    FourSeason: {
      marginTop: "0.35em",
    },
    loginText: {
      marginLeft: " 25%",
    },
    formContainer: {
      width: "100%", // Fix IE 11 issue.
      marginTop: "6%",
      marginBottom: "6%",
      textAlign: "center",
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      color: materialTheme.palette.common.white,
      width: "30%",
    },
    btnDiv: {
      width: "100%",
    },
    links: {
      margin: "5px",
    },
    topDiv: {
      marginTop: "40px",
    },
    accountInput: {
      width: "50%",
      margin: "5px",
      "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
          borderColor: materialTheme.palette.secondary.main,
        },
      },
      "& label.Mui-focused": {
        color: materialTheme.palette.secondary.main,
      },
    },
    checkBox: {
      color: materialTheme.palette.secondary.main,
    },
  })
);

export default function SigninView() {
  const classes = useStyles();
  const history = useHistory();
  const { auth }: AppDependencies = useContext(AppDependenciesContext);
  const [usernameState, setUsernameState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [rememberMe, setRememberMe] = useState(false);
  const localStorageEmailKey = "fourSeasonsEmail";

  useEffect(() => {
    const email = localStorage.getItem(localStorageEmailKey);
    if (email) {
      setUsernameState(email);
      setRememberMe(true);
    }
  }, []);

  const handleSignin = async () => {
    setMessages([]);
    try {
      await auth.signInWithEmailAndPassword(usernameState, passwordState);

      // manage email in local storage
      if (!rememberMe) localStorage.removeItem(localStorageEmailKey);
      if (rememberMe && usernameState)
        localStorage.setItem(localStorageEmailKey, usernameState);

      history.push(routes.EVENT_LIST_URL);
    } catch (e) {
      const message: Message = { text: e.message };
      setMessages([...messages, message]);
      console.log(e.message);
    }
  };

  const handleCreateAccount = () => {
    history.push(routes.CREATE_ACCOUNT_URL);
  };

  const handleForgotPassword = () => {
    history.push(routes.PASSWORD_RESET_URL);
  };

  const handleCheck = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Container maxWidth="sm" component="main" className={classes.topDiv}>
          <img
            src="fstd-logo-colorized.svg"
            alt="Four Seasons Total Development Logo, flower, sun, leaf, snowflake"
            className={classes.logo}
          />

          <Typography
            component="h1"
            variant="h3"
            align="center"
            color="textPrimary"
            gutterBottom
            className={classes.FourSeason}
          >
            FOUR SEASONS
          </Typography>
          <Typography variant="h5" align="center" component="p">
            TOTAL DEVELOPMENT
          </Typography>
        </Container>
        <Messages messages={messages} />
        <div className={classes.formContainer}>
          <Typography
            variant="h6"
            align="left"
            component="p"
            className={classes.loginText}
          >
            LOGIN:
          </Typography>
          <form noValidate>
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
              value={usernameState}
              onChange={(e) => {
                setUsernameState(e.target.value);
              }}
            />
            <TextField
              className={classes.accountInput}
              variant="outlined"
              margin="normal"
              required
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={passwordState}
              onChange={(e) => {
                setPasswordState(e.target.value);
              }}
            />

            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    id="rememberCheckBox"
                    checked={rememberMe}
                    className={classes.checkBox}
                  />
                }
                label="Remember me"
                onChange={handleCheck}
              />
            </div>

            <div>
              <Button
                variant="contained"
                className={classes.submit}
                onClick={handleSignin}
                id="loginBtn"
                color="primary"
              >
                Sign In
              </Button>
            </div>
            <div className={classes.links}>
              <Button
                className={classes.links}
                onClick={handleForgotPassword}
                id="forgotPasswordBtn"
              >
                Forgot Password?
              </Button>
              OR
              <Button
                className={classes.links}
                onClick={handleCreateAccount}
                id="createAccountBtn"
              >
                Create Account
              </Button>
            </div>
          </form>
        </div>
      </Paper>
    </div>
  );
}
