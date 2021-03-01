import React, { useContext, useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import { EventFactory } from "../../models/event";
import EventsService from "../../services/eventsService";
import { AppDependencies, AppDependenciesContext } from "../../appDependencies";
import { useMemo } from "react";
import { materialTheme } from "../../styles/theme";
import EventDetailsComponent from "./EventDetailsComponent";
import PastEvent from "./PastEvent";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      justifyContent: "center",
      alignItems: "center",
      background: materialTheme.palette.background.default,
    },
    cardWrapper: {
      position: "relative",
      marginTop: "3em",
    },
  })
);

export default function EventDetailsView() {
  const classes = useStyles();
  const { eventId } = useParams<{ eventId: string }>();
  const { db }: AppDependencies = useContext(AppDependenciesContext);
  const eventService = useMemo(() => new EventsService(db), [db]);
  const newEvent = EventFactory();
  const [eventState, setState] = useState(newEvent);
  const [eventInPast, setEventInPast] = useState<boolean>();

  useEffect(() => {
    eventService.getEvent(eventId).then((event) => {
      setState(event);
      event.startTime < new Date()
        ? setEventInPast(true)
        : setEventInPast(false);
    });
  }, [eventService, eventId]);

  return (
    <div className={classes.cardWrapper}>
      {eventInPast ? (
        <PastEvent event={eventState} />
      ) : (
        <EventDetailsComponent event={eventState} />
      )}
    </div>
  );
}
