import React, { useContext, useState } from "react";
import {
  Paper,
  Button,
  TextField,
  Container,
  Typography,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppTheme from "../../styles/theme";
import { useHistory } from "react-router-dom";
import { AppDependencies, AppDependenciesContext } from "../../appDependencies";
import routes from "../../constants/routes";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100%",
      backgroundColor: "#D6D6D6",
    },
    paper: {
      width: "60%",
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
      color: AppTheme.primaryText,
      width: "30%",
      backgroundColor: AppTheme.primary,
      "&:hover": {
        backgroundColor: AppTheme.secondary,
      },
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
    },
  })
);

export default function SigninView() {
  const classes = useStyles();
  const history = useHistory();
  const { auth }: AppDependencies = useContext(AppDependenciesContext);
  const [usernameState, setUsernameState] = useState("");
  const [passwordState, setPasswordState] = useState("");

  const handleSignin = async () => {
    try {
      await auth.signInWithEmailAndPassword(usernameState, passwordState);
      history.push(routes.EVENT_LIST_URL);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleCreateAccount = () => {
    history.push(routes.CREATE_ACCOUNT_URL);
  };

  const handleForgotPassword = () => {
    history.push(routes.PASSWORD_RESET_URL);
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
              <Button
                variant="contained"
                className={classes.submit}
                onClick={handleSignin}
              >
                Submit
              </Button>
            </div>
            <div className={classes.links}>
              <Button className={classes.links} onClick={handleForgotPassword}>
                Forgot Password?
              </Button>
              OR
              <Button className={classes.links} onClick={handleCreateAccount}>
                Create Account
              </Button>
            </div>
          </form>
        </div>
      </Paper>
    </div>
  );
}
