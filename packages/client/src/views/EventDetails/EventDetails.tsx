import React, { useContext, useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import { EventFactory } from "../../models/event";
import EventsService from "../../services/eventsService";
import { AppDependencies, AppDependenciesContext } from "../../appDependencies";
import { useMemo } from "react";
import AppTheme, { materialTheme } from "../../styles/theme";
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
    backArrow: {
      position: "absolute",
      left: "-10%",
    },
    card: {
      width: AppTheme.cardWidthSmall,
    },
    paperWrap: {
      height: "300px",
      width: "100%",
      overflow: "hidden",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    infoType: {
      fontSize: "1.2em",
      marginTop: "10px",
    },
    eventData: {
      marginTop: "20px",
    },
    interestTag: {
      width: "15%",
      textAlign: "center",
      padding: "3px",
      borderRadius: "5px",
      color: "white",
      display: "inline-block",
      float: "right",
      margin: "1px",
      textTransform: "capitalize",
    },
    eventDescription: {
      marginTop: "10px",
    },
    eventTitle: {
      fontSize: "20pt",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    eventHeader: {
      display: "flex",
      position: "relative",
    },
    eventDate: {
      position: "absolute",
      right: 0,
      bottom: 0,
    },
    eventCentered: {
      textAlign: "center",
    },
    btnDiv: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      marginBottom: theme.spacing(1),
    },
    registerBtn: {
      marginRight: theme.spacing(1),
      color: materialTheme.palette.common.white,
    },
    secondaryBtn: {
      marginRight: theme.spacing(1),
      backgroundColor: materialTheme.palette.common.white,
    },
    categoryDiv: {
      display: "flex",
      justifyContent: "flex-end",
    },
    imgTop: {
      width: "80%",
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
