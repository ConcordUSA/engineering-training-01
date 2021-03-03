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
    registeredBtn: {
      marginRight: "15px",
      borderColor: materialTheme.palette.primary.main,
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
  const [isRegistered, setisRegistered] = useState(
    userState.eventsAttending.includes(eventID)
  );

  async function handleRegister(e) {
    e.stopPropagation();
    await eventService.registerForEvent(userState, props.event, isRegistered);
    const newState = await usersService.registerForEvent(
      userState,
      props.event,
      isRegistered
    );
    setUserState(newState);
    setisRegistered(!isRegistered);
  }

  useEffect(() => {
    setisRegistered(userState.eventsAttending.includes(eventID));
  }, [userState, eventID]);

  return (
    <React.Fragment>
      <div className={classes.root}>
        {!isRegistered && (
          <Button
            variant="contained"
            className={classes.registerBtn}
            onClick={handleRegister}
            color="primary"
          >
            Register
          </Button>
        )}
        {isRegistered && (
          <Button
            variant="outlined"
            className={classes.registeredBtn}
            onClick={handleRegister}
            color="primary"
          >
            Unregister
          </Button>
        )}
      </div>
    </React.Fragment>
  );
}
