import React, { useState, useMemo, useContext, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { materialTheme } from "./../../styles/theme";
import EventsService from "../../services/eventsService";
import UsersService from "../../services/usersService";
import { AppDependencies, AppDependenciesContext } from "../../appDependencies";
import { useRecoilState } from "recoil";
import { user } from "../../store";

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
  const { db }: AppDependencies = useContext(AppDependenciesContext);
  const eventService = useMemo(() => new EventsService(db), [db]);
  const usersService = useMemo(() => new UsersService(db), [db]);
  const [userState, setUserState] = useRecoilState(user);
  const eventID = props.event.id;
  const [registeredState, setRegisteredState] = useState(
    userState.eventsAttending.includes(eventID)
  );

  async function handleRegister(e) {
    e.stopPropagation();
    eventService.registerForEvent(userState, props.event, registeredState);
    const newState = await usersService.registerForEvent(
      userState,
      props.event,
      registeredState
    );
    setUserState(newState);
    setRegisteredState(!registeredState);
  }

  useEffect(() => {
    setRegisteredState(userState.eventsAttending.includes(eventID));
  }, [userState, eventID]);

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Button
          variant="contained"
          className={classes.registerBtn}
          onClick={handleRegister}
          color="primary"
        >
          {registeredState ? "Unregister" : "Register"}
        </Button>
      </div>
    </React.Fragment>
  );
}
