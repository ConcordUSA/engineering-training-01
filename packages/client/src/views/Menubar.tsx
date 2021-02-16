import React, { useContext, useEffect, useMemo, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
// import Badge from "@material-ui/core/Badge";
import AccountCircle from "@material-ui/icons/AccountCircle";
import AddIcon from "@material-ui/icons/Add";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useHistory } from "react-router-dom";
import routes from "../constants/routes";
import { AppDependencies, AppDependenciesContext } from "../appDependencies";
import { User } from "../models/user";
import UsersService from "../services/usersService";
// import NotificationsIcon from "@material-ui/icons/Notifications";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "block",
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const history = useHistory();
  const { db, auth }: AppDependencies = useContext(AppDependenciesContext);

  const [user, setUser] = useState <User>();
  
  const usersService = useMemo (() => new UsersService(db, auth), [db,auth])
  
  useEffect(() => {
    usersService.getUser(auth.currentUser.uid).then((user) => {
     setUser (user);
    });

  }, [ usersService, auth ]);
  console.log(user)
  if(user?.isAdmin) {
    console.log("Im an Admin!");
  }

  const handleCreateEvent = () => {
    history.push(routes.CREATE_EVENT_URL);
  };

  const handleSignout = async () => {
    await auth.signOut();
    history.push(routes.HOME_URL);
  };

  return (
    <div className={classes.grow}>
      <AppBar position="absolute">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Four Seasons
          </Typography>
          <div className={classes.grow} />
          <div>
            {user?.isAdmin && (
            <IconButton
              aria-label="Add Event"
              color="inherit"
              onClick={handleCreateEvent}
            >
              <AddIcon />
            
            </IconButton>
            )}
            <IconButton
              aria-label="Signout"
              color="inherit"
              onClick={handleSignout}
            >
              <ExitToAppIcon />
            </IconButton>
            {/* <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            <IconButton
              edge="end"
              aria-label="User account"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
