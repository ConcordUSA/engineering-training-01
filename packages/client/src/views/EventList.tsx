import React, { useContext, useEffect, useMemo, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { IEvent, capitalize, Category } from "../models/event";
import UsersService from "../services/usersService";
import { AppDependencies, AppDependenciesContext } from "../appDependencies";
import EventsService, { EventsPerCategory } from "../services/eventsService";
import { User } from "../models/user";
import Events from "./Events";
import Grid from "@material-ui/core/Grid";
import { materialTheme } from "../styles/theme";
import { useRecoilState } from "recoil";
import { searchTerm } from "../store";
import { colors } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%",
      width: "100%",
      backgroundColor: materialTheme.palette.background.default,
      backgroundSize: "cover",
    },
    gridDiv: {
      backgroundColor: materialTheme.palette.background.default,
      display: "flex",
      flexFlow: "row wrap",
      justifyContent: "left",
      alignContent: "flex-start",
      paddingTop: "1rem",
      paddingLeft: "2em",
    },
    categoryHeader: {
      fontSize: "2.2em",
      paddingLeft: "8px",
      color: colors.grey[500],
      fontWeight: 500,
    },
    emptyState: {
      textAlign: "center",
      marginTop: "3em",
      fontSize: "2.2em",
      color: colors.grey[500],
      fontWeight: 500,
    },
  })
);

const dateFilter = (filterDate: any, eventGroups: EventsPerCategory[]) => {
  let res = [];
  eventGroups.forEach((group: EventsPerCategory) => {
    group.items = group.items.filter((event: IEvent) => {
      console.log("filterDate");
      console.log("eventStartTime");
      return filterDate;
      // filterDate.() >= event.startTime.getTime &&
      // filterDate.getTime <= event.endTime.getTime
    });
    if (group.items.length) res.push(group);
  });
  return res;
};

const stringFilter = (
  search: string,
  eventGroups: EventsPerCategory[],
  queryField
) => {
  let res: EventsPerCategory[] = [];
  eventGroups.forEach((group: EventsPerCategory) => {
    const regex = new RegExp(`^${search}`, "gi");
    group.items = group.items.filter((event: IEvent) => {
      let i = 0;
      const keyWords = event[`${queryField}`].split(" ");
      while (keyWords[i]) {
        if (keyWords[i++].match(regex)) return true;
      }
      return false;
    });
    if (group.items.length) res.push(group);
  });
  return res;
};

export interface IFilter {
  topic?: string;
  startDate?: any;
  catagories?: Category[];
  location?: string;
}
const filterState: IFilter = {
  topic: undefined,
  startDate: new Date(),
  catagories: ["it", "leadership"],
  location: undefined,
};

const advanceFilter = (filter: IFilter, eventGroups: EventsPerCategory[]) => {
  let filteredResult = [];
  filter.catagories = filter?.catagories
    ? filter.catagories
    : ["it", "finance", "leadership", "marketing"];

  // Remove unwanted catagories
  filteredResult = eventGroups.filter((group: EventsPerCategory) => {
    return filter.catagories.includes(group.category);
  });

  // Filter events with topics that fuzzy match topic filter
  if (filter?.topic) {
    filteredResult = stringFilter(filter.topic, filteredResult, "topic");
  }

  // Filter events with topics that fuzzy match location filter
  if (filter?.location) {
    filteredResult = stringFilter(filter.location, filteredResult, "location");
  }

  // Filter events with dates that are on or after specified
  if (filter?.startDate) {
    filteredResult = dateFilter(filter.startDate, filteredResult);
  }
  return filteredResult;
};

export default function EventListView() {
  const classes = useStyles();
  const [user, setUser] = useState<User>();
  const [events, setEvents] = useState<EventsPerCategory[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventsPerCategory[]>([]);
  const [searchTermState] = useRecoilState(searchTerm);
  const { db, auth }: AppDependencies = useContext(AppDependenciesContext);
  const userService = useMemo(() => new UsersService(db, auth), [db, auth]);
  const eventService = useMemo(() => new EventsService(db), [db]);

  // get user from service
  useEffect(() => {
    userService.getUser(auth.currentUser?.uid).then((user: User) => {
      setUser({ ...user });
    });
  }, [userService, auth.currentUser, searchTermState]);

  // get events from service
  useEffect(() => {
    const interestedCategories = user?.interestedCategories
      ? user.interestedCategories
      : undefined;
    eventService.getAllEvents(interestedCategories).then(setEvents);
  }, [eventService, user]);

  // filter events based on search term in ui
  useEffect(() => {
    setFilteredEvents(
      searchTermState ? stringFilter(searchTermState, events, "topic") : events
    );
  }, [events, searchTermState]);

  console.log("Adv. Filter: ", advanceFilter(filterState, filteredEvents));

  return (
    <div className={classes.root}>
      {!filteredEvents.length && (
        <div className={classes.emptyState}>No Events</div>
      )}
      {filteredEvents?.map((categoryList: EventsPerCategory) => (
        <div className={classes.gridDiv} key={categoryList.category}>
          {categoryList.items.length > 0 && (
            <h1 className={classes.categoryHeader}>
              {capitalize(categoryList.category)}
            </h1>
          )}
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            {categoryList?.items?.map((event: IEvent | any) => (
              <Events event={event} key={event.topic} />
            ))}
          </Grid>
        </div>
      ))}
    </div>
  );
}
