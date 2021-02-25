import React, { useState, useMemo, useContext, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { materialTheme } from "./../../styles/theme";
import { UserFactory } from "../../models/user";
import EventsService from "../../services/eventsService";
import UsersService from "../../services/usersService";
import { AppDependencies, AppDependenciesContext } from "../../appDependencies";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    container: {
      margin: "0px 5px 5px 0px",
      padding: "5px",
    },
    registerBtn: {
      marginRight: "15px",
      color: materialTheme.palette.common.white,
    },
  })
);

export default function RegisterButton(props) {
  const classes = useStyles();
  const { db, auth }: AppDependencies = useContext(AppDependenciesContext);
  const eventService = useMemo(() => new EventsService(db), [db]);
  const usersService = useMemo(() => new UsersService(db), [db]);
  const newUser = UserFactory();
  const [usersState, setUsersState] = useState(newUser);
  const [registeredState, setRegisteredState] = useState({
    isRegistered: false,
  });
  const eventID = props.event.id;

  function handleRegister(e) {
    eventService.registerForEvent(
      usersState,
      props.event,
      registeredState.isRegistered
    );
    editEventsAttending(usersState.eventsAttending);
    setRegisteredState({
      isRegistered: !registeredState.isRegistered,
    });
    e.stopPropagation();
  }

  function editEventsAttending(eventsArray: string[]) {
    if (!registeredState.isRegistered) {
      eventsArray.push(eventID);
    } else {
      const indexToRemove = eventsArray.indexOf(eventID);
      eventsArray.splice(indexToRemove, 1);
    }
    setUsersState({
      ...usersState,
      eventsAttending: eventsArray,
    });
    usersService.updateUser(usersState.uid, { eventsAttending: eventsArray });
  }

  function registerButtonDisplayText() {
    if (registeredState.isRegistered) {
      return "Unregister";
    }
    return "Register";
  }

  useEffect(() => {
    const uid = auth.currentUser.uid;
    usersService.getUser(uid).then((user) => {
      if (user.eventsAttending.includes(eventID)) {
        setRegisteredState({ isRegistered: true });
      }
      setUsersState(user);
    });
  }, [eventService, eventID, auth.currentUser.uid, usersService]);

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Button
          variant="contained"
          className={classes.registerBtn}
          onClick={handleRegister}
          color="primary"
        >
          {registerButtonDisplayText()}
        </Button>
      </div>
    </React.Fragment>
  );
}
