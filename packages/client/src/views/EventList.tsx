import React, { useContext, useEffect, useMemo, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Event } from "../models/event";
import UsersService from "../services/usersService";
import { AppDependencies, AppDependenciesContext } from "../appDependencies";
import EventsService, { EventsPerCategory } from "../services/eventsService";
import { User } from "../models/user";
import Events from "./Events";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100vh",
      width: "100vw",
      overflow: "scroll",
    },
    allEventsDiv: {
      height: "500px",
      overflow: "scroll",
    },
    categoryH1: {},
  })
);

export default function EventListView() {
  // const [selectedEventState, setSelectedEventState] = useRecoilState(
  //   selectedEvent
  // );
  const classes = useStyles();
  const { db, auth }: AppDependencies = useContext(AppDependenciesContext);
  const userService = useMemo(() => new UsersService(db, auth), [db, auth]);
  const eventService = useMemo(() => new EventsService(db), [db]);
  const [userState, setState] = useState({ interests: [] });
  let coolEvents: EventsPerCategory[];
  const [eventState, setEventState] = useState(coolEvents);

  useEffect(() => {
    userService.getUser(auth.currentUser.uid).then((user: User) => {
      setState({
        interests: user.interestedCategories,
      });
    });
    eventService
      .getAllEvents(userState.interests)
      .then((eventList: EventsPerCategory[]) => {
        setEventState(eventList);
      });
  }, [userService, eventService, auth.currentUser.uid, userState.interests]);
  console.log(eventState);

  return (
    <React.Fragment>
      <div className={classes.root}>
        {eventState?.map((categoryList: EventsPerCategory) => (
          <div>
            <h1 className={classes.categoryH1}> {categoryList.category}</h1>
            <div className={classes.allEventsDiv}>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
              >
                {categoryList?.items?.map((event: Event | any) => (
                  <Events event={event} />
                ))}
              </Grid>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}
