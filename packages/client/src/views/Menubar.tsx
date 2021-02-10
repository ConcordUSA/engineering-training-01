import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import { AppDependencies, AppDependenciesContext } from "../appDependencies";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  menuBar: {
    backgroundColor: "#FF505F",
  },
  avatar: {
    position: "fixed",
    right: "8px",
  },
  signOutBtn: {
    position: "fixed",
    right: "8%",
  },
}));
export default function ButtonAppBar() {
  const classes = useStyles();
  const { auth }: AppDependencies = useContext(AppDependenciesContext);

  const handleSignOut = async () => {
    console.log("attempting to signout");
    await auth.signOut();
  };

  return (
    <div className={classes.root}>
      <AppBar
        style={{ backgroundColor: "#FF505F", color: "#FF505F" }}
        className={classes.menuBar}
      >
        <Toolbar>
          <Button
            variant="contained"
            className={classes.signOutBtn}
            onClick={handleSignOut}
          >
            Signout
          </Button>
          <Avatar src="/broken-image.jpg" className={classes.avatar} />
        </Toolbar>
      </AppBar>
    </div>
  );
}