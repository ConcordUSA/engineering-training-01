import React, { useContext, useEffect, useMemo, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { IEvent, capitalize } from "../models/event";
import { AppDependencies, AppDependenciesContext } from "../appDependencies";
import EventsService, { EventsPerCategory } from "../services/eventsService";
import EventCard from "../components/EventCard";
import Grid from "@material-ui/core/Grid";
import { materialTheme } from "../styles/theme";
import { useRecoilState } from "recoil";
import { searchTerm } from "../store";
import { colors } from "@material-ui/core";
import { eventListFilter, pastEvents, user } from "../store/atoms";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: "100%",
      maxWidth: "1400px",
      backgroundColor: materialTheme.palette.background.default,
      backgroundSize: "cover",
      paddingTop: "5em",
    },
    gridDiv: {
      paddingTop: "1rem",
      padding: "1rem 2em",
    },
    categoryHeader: {
      fontSize: "2.2em",
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
      document.getElementById("search").focus();
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
          {categoryList.items.length > 0 &&
            (categoryList.category === "it" ? (
              <h1 className={classes.categoryHeader}>Information Technology</h1>
            ) : (
              <h1 className={classes.categoryHeader}>
                {capitalize(categoryList.category)}
              </h1>
            ))}
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={3}
          >
            {categoryList?.items?.map((event: IEvent | any) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={event.topic}>
                <EventCard event={event} />
              </Grid>
            ))}
          </Grid>
        </div>
      ))}
    </div>
  );
}
