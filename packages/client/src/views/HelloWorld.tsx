import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { BiPyramid } from "react-icons/bi";

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
      <p className={classes.title}>Hello World</p>
      <BiPyramid className={classes.icon} />
    </div>
  );
}
