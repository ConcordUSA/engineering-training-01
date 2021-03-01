import React, { useContext, useEffect, useMemo, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { IEvent, capitalize } from "../models/event";
import { AppDependencies, AppDependenciesContext } from "../appDependencies";
import EventsService, { EventsPerCategory } from "../services/eventsService";
import Events from "./Events";
import Grid from "@material-ui/core/Grid";
import { materialTheme } from "../styles/theme";
import { useRecoilState } from "recoil";
import { searchTerm } from "../store";
import { colors } from "@material-ui/core";
import { eventListFilter, pastEvents, user } from "../store/atoms";

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
      marginTop: "0px",
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

export default function EventListView() {
  const classes = useStyles();
  const [events, setEvents] = useState<EventsPerCategory[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventsPerCategory[]>([]);
  const [filterState] = useRecoilState(eventListFilter);
  const [searchTermState] = useRecoilState(searchTerm);
  const [userState] = useRecoilState(user);
  const { db }: AppDependencies = useContext(AppDependenciesContext);
  const eventService = useMemo(() => new EventsService(db), [db]);
  const [pastEventState] = useRecoilState(pastEvents);

  // get events from service
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

  // filter events based on search term or filter in ui
  useEffect(() => {
    if (searchTermState) {
      const filtered = EventsService.stringFilter(
        searchTermState,
        events,
        "topic"
      );
      setFilteredEvents(filtered);
    }
    if (filterState) {
      const filtered = EventsService.filter(filterState, events);
      setFilteredEvents(filtered);
    }
    if (!searchTermState && !filterState) {
      setFilteredEvents(events);
    }
  }, [searchTermState, filterState, events]);

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
