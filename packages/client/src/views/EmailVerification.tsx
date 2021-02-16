import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InterestsView from "./Interests";
import { AppDependencies, AppDependenciesContext } from "../appDependencies";
import routes from "../constants/routes";
import getConfig from "../config";
import UsersService from "../services/usersService";
import { Typography, Button, Paper } from "@material-ui/core";
import AppTheme from "../styles/theme";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100vw",
      height: "100vh",
      backgroundColor: AppTheme.background,
    },
    paperWrap: {
      display: "flex",
      flexWrap: "wrap",
      width: "900px",
      overflow: "hidden",
    },
    form: {
      flex: 1,
      textAlign: "center",
    },
    formInner: {
      display: "inline-block",
      textAlign: "left",
      width: "80%",
      paddingTop: "1.5em",
    },
    banner: {
      flex: 1,
      background:
        "linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)",
      textAlign: "center",
      borderRadius: "0px 4px 4px 0px",
    },
    formControl: {
      width: "100%",
      margin: 0,
      marginBottom: "1em",
    },
    title: {
      textAlign: "center",
      margin: 0,
      paddingBottom: ".5em",
    },
    icon: {
      fontSize: "6em",
    },
    buttonContainer: {
      textAlign: "center",
      paddingBottom: "1em",
    },
    btnCreateEvent: {
      margin: "10px auto",
    },
    btnBack: {},
    btnDiv: {
      display: "flex",
      marginTop: "8px",
      marginLeft: "15%",
    },
    iconDiv: {
      marginTop: "4rem",
    },
    fstdDiv: {
      marginTop: "6rem",
      marginBottom: "3rem",
    },
    Menubar: {
      marginBottom: "100px",
    },
  })
);
export default function EmailVerificationView() {
  const classes = useStyles();
  const config = getConfig();
  const [hasPreferences, setHasPreferences] = useState(false);
  const { auth, db }: AppDependencies = useContext(AppDependenciesContext);
  const usersService = useMemo(() => new UsersService(db, auth), [db, auth]);

  const handleSend = useCallback(() => {
    if (!auth.currentUser.emailVerified)
      auth.currentUser
        ?.sendEmailVerification({
          url: config.appUrl + routes.EVENT_LIST_URL,
        })
        .then(() => {
          console.log("email verification sent");
          alert("email verification sent");
        })
        .catch(() => {
          console.log("user not logged in.");
        });
  }, [auth, config.appUrl]);

  useEffect(() => {
    if (auth.currentUser) {
      const uid = auth.currentUser.uid;
      usersService.getUser(uid).then((user) => {
        // set local view state
        const hasPreferences = user.interestedCategories.length > 0;
        setHasPreferences(hasPreferences);

        // send email verification
        handleSend();
      });
    }
  }, [auth, config.appUrl, usersService, handleSend]);

  return hasPreferences ? (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.paperWrap}>
        <div className={classes.form}>
          <div className={classes.formInner}>
            <h1 className={classes.title}>Account created</h1>
            <Typography>
              You must verify your email address before proceeding. A link has
              been sent to your email with instructions.
            </Typography>
            <div className={classes.buttonContainer}>
              <Button
                id="createEventButton"
                className={classes.btnCreateEvent}
                variant="contained"
                color="primary"
                onClick={handleSend}
              >
                Resend email link
              </Button>
            </div>
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
  ) : (
    <InterestsView />
  );
}
