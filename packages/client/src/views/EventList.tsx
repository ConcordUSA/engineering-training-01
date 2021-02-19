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
    },
    allEventsDiv: {},
    categoryH1: {},
  })
);

export default function EventListView() {
  const classes = useStyles();
  const [user, setUser] = useState<User>();
  const [events, setEvents] = useState<EventsPerCategory[]>([]);
  const { db, auth }: AppDependencies = useContext(AppDependenciesContext);
  const userService = useMemo(() => new UsersService(db, auth), [db, auth]);
  const eventService = useMemo(() => new EventsService(db), [db]);

  useEffect(() => {
    userService.getUser(auth.currentUser?.uid).then((user: User) => {
      setUser({ ...user });
    });
  }, [userService, auth.currentUser]);

  useEffect(() => {
    if (user?.interestedCategories) {
      eventService
        .getAllEvents(user.interestedCategories)
        .then((eventList: EventsPerCategory[]) => {
          setEvents(eventList);
        });
    }
  }, [eventService, user]);
  console.log(events);

  return (
    <React.Fragment>
      <div className={classes.root}>
        {events?.map((categoryList: EventsPerCategory) => (
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
