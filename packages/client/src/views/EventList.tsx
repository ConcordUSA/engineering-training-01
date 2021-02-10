import React, { useContext } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { Button } from "@material-ui/core";
import { AppDependencies, AppDependenciesContext } from "../appDependencies";
import AppTheme from "../styles/theme";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      height: "90%",
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

export default function EventListView() {
  const classes = useStyles();
  const { auth }: AppDependencies = useContext(AppDependenciesContext);

  const handleSignOut = async () => {
    await auth.signOut();
  };

  return (
    <div className={classes.root}>
      <h2>eventlanding</h2>
      <Button
        variant="contained"
        className={classes.submit}
        onClick={handleSignOut}
      >
        Signout
      </Button>
    </div>
  );
}
