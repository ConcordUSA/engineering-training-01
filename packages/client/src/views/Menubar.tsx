import React, { useContext, useEffect, useMemo, useState } from "react";
import { makeStyles, fade } from "@material-ui/core/styles";
import { useRecoilState } from "recoil";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import AddIcon from "@material-ui/icons/Add";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useHistory, useLocation } from "react-router-dom";
import routes from "../constants/routes";
import { AppDependencies, AppDependenciesContext } from "../appDependencies";
import { pastEvents, searchTerm, user } from "../store/atoms";
import {
  Button,
  FormControlLabel,
  Slide,
  Switch,
  useScrollTrigger,
} from "@material-ui/core";
import { materialTheme } from "../styles/theme";
import Filter from "../components/Filter";
import { Theme } from "@material-ui/core/styles";
import EventsService, { EventsPerCategory } from "../services/eventsService";

const useStyles = makeStyles((theme: Theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "block",
    fontWeight: 600,
    color: materialTheme.palette.common.white,
    cursor: "pointer",
  },
  search: {
    position: "relative",
    cursor: "pointer",
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
  // userIcon: {
  //   cursor: "pointer",
  //   boxShadow: theme.spacing(1),
  // },
  logoutBtn: {
    backgroundColor: materialTheme.palette.common.white,
    color: materialTheme.palette.primary.main,
    borderColor: materialTheme.palette.primary.main,
    "&:hover": {
      backgroundColor: materialTheme.palette.background.default,
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
    color: materialTheme.palette.common.white,
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
    color: materialTheme.palette.common.white,
  },
  menuRight: {
    position: "absolute",
    right: "24px",
  },
  colorToWhite: {
    color: materialTheme.palette.common.white,
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [, setEvents] = useState<EventsPerCategory[]>([]);
  const [userState] = useRecoilState(user);
  const [searchTermState, setSearchTermState] = useRecoilState(searchTerm);
  const [pastEventState, setPastEvents] = useRecoilState(pastEvents);
  const { db, auth }: AppDependencies = useContext(AppDependenciesContext);
  const eventService = useMemo(() => new EventsService(db), [db]);
  useEffect(() => {
    // make sure user exists first
    if (userState) {
      eventService
        .getAllEvents(userState?.interestedCategories, pastEventState)
        .then((resp) => {
          setEvents(resp);
        });
    }
  }, [eventService, userState, pastEventState]);

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

  const handleNavHome = () => {
    history.push(routes.HOME_URL);
  };
  const handleSwitch = () => {
    setPastEvents(!pastEventState);
    const interestedCategories = userState?.interestedCategories;
    eventService
      .getAllEvents(interestedCategories, pastEventState)
      .then((events) => {
        setEvents(events);
      });
  };
  const HideOnScroll = (props) => {
    const { children } = props;
    const trigger = useScrollTrigger();
    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  };

  return (
    <HideOnScroll>
      <AppBar className={classes.grow}>
        <Toolbar>
          <div onClick={handleNavHome}>
            <Typography className={classes.title} variant="h5" noWrap>
              Four Seasons
            </Typography>
          </div>

          <div className={classes.searchDiv}>
            {(location.pathname === routes.EVENT_LIST_URL ||
              location.pathname === routes.HOME_URL) && (
              <>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    id="search"
                    placeholder="Search..."
                    classes={{
                      root: classes.grow,
                      input: classes.inputInput,
                    }}
                    inputProps={{ "aria-label": "search" }}
                    onChange={handleSearch}
                    value={searchTermState}
                  />
                </div>
                <Filter />
              </>
            )}
            <div className={classes.menuRight}>
              {userState?.isAdmin &&
                (location.pathname === routes.EVENT_LIST_URL ||
                  location.pathname === routes.HOME_URL) && (
                  <FormControlLabel
                    className={classes.colorToWhite}
                    control={
                      <Switch
                        checked={pastEventState}
                        onChange={handleSwitch}
                        color="secondary"
                      />
                    }
                    label="Past Events"
                  ></FormControlLabel>
                )}
              {userState?.isAdmin && (
                <IconButton
                  aria-label="Add Event"
                  className={classes.colorToWhite}
                  onClick={handleCreateEvent}
                >
                  <AddIcon />
                </IconButton>
              )}

              <Button
                className={classes.logoutBtn}
                aria-label="Signout"
                variant="outlined"
                onClick={handleSignout}
                endIcon={<ExitToAppIcon />}
                id="signoutBtn"
              >
                Sign Out
              </Button>
              <IconButton
                edge="end"
                aria-label="User account"
                aria-haspopup="true"
                color="inherit"
                className={classes.colorToWhite}
              >
                <AccountCircle />
              </IconButton>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}
