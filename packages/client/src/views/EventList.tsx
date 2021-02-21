import React, { useContext, useEffect, useMemo, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Event, capitalize } from "../models/event";
import UsersService from "../services/usersService";
import { AppDependencies, AppDependenciesContext } from "../appDependencies";
import EventsService, { EventsPerCategory } from "../services/eventsService";
import { User } from "../models/user";
import Events from "./Events";
import Grid from "@material-ui/core/Grid";
import AppTheme from "../styles/theme";
import { useRecoilState } from "recoil";
import { searchTerm } from "../store";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%",
      width: "100vw",
      backgroundColor: AppTheme.background,
      backgroundSize: "cover",
    },
    gridDiv: {
      backgroundColor: AppTheme.background,
      paddingTop: "20px",
    },
    categoryHeader: {
      fontSize: "3.2em",
    },
  })
);

const searchFilter = (search: string, events: EventsPerCategory[]): any => {
  let res = [];
  const searchTermArray = [
    search,
    search.toLowerCase(),
    search.toUpperCase(),
    capitalize(search.toLowerCase()),
  ];
  events.forEach((eventCategory: EventsPerCategory) => {
    eventCategory.items = eventCategory.items.filter((event: Event) => {
      const topicWords = event.topic.split(" ");
      return searchTermArray.some((i) => topicWords.includes(i));
    });
    res.push(eventCategory);
  });
  return res;
};

export default function EventListView() {
  const classes = useStyles();
  const [user, setUser] = useState<User>();
  const [events, setEvents] = useState<EventsPerCategory[]>([]);
  const [searchTermState] = useRecoilState(searchTerm);
  const { db, auth }: AppDependencies = useContext(AppDependenciesContext);
  const userService = useMemo(() => new UsersService(db, auth), [db, auth]);
  const eventService = useMemo(() => new EventsService(db), [db]);

  useEffect(() => {
    userService.getUser(auth.currentUser?.uid).then((user: User) => {
      setUser({ ...user });
    });
  }, [userService, auth.currentUser, searchTermState]);

  useEffect(() => {
    if (user?.interestedCategories) {
      eventService
        .getAllEvents(user.interestedCategories)
        .then((eventList: EventsPerCategory[]) => {
          setEvents(
            searchTermState
              ? searchFilter(searchTermState, eventList)
              : eventList
          );
        });
    }
  }, [eventService, user, searchTermState]);

  return (
    <React.Fragment>
      <div className={classes.root}>
        {events?.map((categoryList: EventsPerCategory) => (
          <div className={classes.gridDiv} key={categoryList.category}>
            {categoryList.items.length > 0 && (
              <h1 className={classes.categoryHeader}>
                {" "}
                {capitalize(categoryList.category)}
              </h1>
            )}
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="flex-start"
            >
              {categoryList?.items?.map((event: Event | any) => (
                <Events event={event} key={event.topic} />
              ))}
            </Grid>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}
