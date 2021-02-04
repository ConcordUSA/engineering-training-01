import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
// import { BiPyramid } from "react-icons/bi";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center",
    },
    title: {
      fontSize: "3em",
    },
    icon: {
      fontSize: "6em",
    },
  })
);

export default function HelloWorldView() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Link id="loginButton" to="/login">
        Login
      </Link>
    </div>
  );
}
