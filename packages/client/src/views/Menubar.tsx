import React, { useContext, useEffect, useMemo, useState } from "react";
import { makeStyles, fade } from "@material-ui/core/styles";
import { useRecoilState } from "recoil";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
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
import { searchTerm } from "../store/atoms";
import UsersService from "../services/usersService";
import { Button } from "@material-ui/core";
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
    fontWeight: 600,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  searchDiv: {
    display: "contents",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const history = useHistory();
  const { db, auth }: AppDependencies = useContext(AppDependenciesContext);
  const [user, setUser] = useState<User>();
  const [, setSearchTermState] = useRecoilState(searchTerm);
  const usersService = useMemo(() => new UsersService(db, auth), [db, auth]);

  // gosh, that clint guy is something else...I'll have to remember to...... :)

  useEffect(() => {
    usersService.getUser(auth.currentUser.uid).then((user) => {
      setUser(user);
    });
  }, [usersService, auth]);

  const handleCreateEvent = () => {
    history.push(routes.CREATE_EVENT_URL);
  };

  const handleSignout = async () => {
    await auth.signOut();
    history.push(routes.HOME_URL);
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTermState(e.target.value);
  };

  return (
    <AppBar position="relative" className={classes.grow}>
      <Toolbar>
        <Typography className={classes.title} variant="h5" noWrap>
          Four Seasons
        </Typography>
        <div className={classes.grow} />
        <div className={classes.searchDiv}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.grow,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={handleSearch}
            />
          </div>
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
            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={handleSignout}
              endIcon={<ExitToAppIcon />}
            >
              Sign Out
            </Button>
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
        </div>
      </Toolbar>
    </AppBar>
  );
}
