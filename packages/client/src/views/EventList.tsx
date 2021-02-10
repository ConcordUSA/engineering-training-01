import React, { useContext } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Button, Paper, Container } from "@material-ui/core";
import { AppDependencies, AppDependenciesContext } from "../appDependencies";
import AppTheme from "../styles/theme";

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
  const events = [
    {
      title: "Perservance",
      photo: "is.gd/G7bFv5",
    },
  ];
  const handleSignOut = async () => {
    await auth.signOut();
  };

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.eventsContainerOne}></div>
      </Container>
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
