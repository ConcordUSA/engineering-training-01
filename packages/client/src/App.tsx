import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import HelloWorldView from "./views/HelloWorld";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      display: "flex",
      height: "100vh",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <HelloWorldView />
    </div>
  );
}
