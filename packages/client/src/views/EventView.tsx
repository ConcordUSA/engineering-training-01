import React, { useContext } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Button, Paper, Container } from "@material-ui/core";
import { AppDependencies, AppDependenciesContext } from "../appDependencies";
import AppTheme from "../styles/theme";
import Typography from "material-ui/styles/typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      height: "100%",
      width: "100%",
    },
    eventsContainerOne: {
      width: "100%",
    },
    event: {},
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

export default function EventView() {
  const classes = useStyles();
  const { auth }: AppDependencies = useContext(AppDependenciesContext);

  const handleSignOut = async () => {
    await auth.signOut();
  };

  return (
    <div className={classes.root}>
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
