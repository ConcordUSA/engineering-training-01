import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import SignOut from "./signout";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar
        position="sticky"
        style={{ backgroundColor: "#FF505F", color: "#FF505F" }}
      >
        <Toolbar>
          <SignOut />
          <Avatar src="/broken-image.jpg" />
        </Toolbar>
      </AppBar>
    </div>
  );
}
