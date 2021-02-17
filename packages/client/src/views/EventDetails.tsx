import React, { useContext, useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardActions,
  Button,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@material-ui/core";
import {
  EventFactory,
  formatCentsToCurrency,
  displayEventDate,
  displayEventTime,
} from "../models/event";
import EventsService from "../services/eventsService";
import { AppDependencies, AppDependenciesContext } from "../appDependencies";
import routes from "../constants/routes";
import { useMemo } from "react";
import AppTheme from "../styles/theme";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      height: "100vh",
      width: "100vw",
      background: AppTheme.background,
    },
    card: {
      width: "50%",
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
  })
);

function getBackground(category: string) {
  switch (category) {
    case "marketing":
      return "green";
    case "finance":
      return "red";
    case "leadership":
      return "orange";
    case "technology":
      return "blue";
  }
}

export default function EventDetailsView() {
  const classes = useStyles();
  const { db }: AppDependencies = useContext(AppDependenciesContext);
  const eventService = useMemo(() => new EventsService(db), [db]);
  const newEvent = EventFactory();
  const [eventState, setState] = useState(newEvent);

  function getEventIdFromURL() {
    return window.location.pathname.replace(routes.EVENT_DETAILS_URL, "");
  }

  useEffect(() => {
    const getEvent = getEventIdFromURL();
    console.log(getEvent);
    eventService.getEvent(getEvent).then((event) => {
      console.log(event);
      setState(event);
    });
  }, [eventService]);

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia component="img" height="300px" image={eventState.image} />
          <CardContent>
            <div className={classes.eventHeader}>
              <Typography paragraph className={classes.eventTitle}>
                {eventState.topic}
              </Typography>
              <Typography paragraph className={classes.eventDate}>
                {displayEventDate(eventState.startTime)}
              </Typography>
            </div>
            <div>
              {eventState.categories.map((category) => (
                <Box
                  bgcolor={getBackground(category)}
                  className={classes.interestTag}
                  key={category}
                >
                  {category}
                </Box>
              ))}
              <br />
              <br />
            </div>
            <Typography className={classes.eventDescription}>
              {eventState.description}
            </Typography>

            <div className={classes.eventData}>
              <Typography paragraph className={classes.infoType}>
                <b>Address:</b> {eventState.location}
              </Typography>
              <Typography paragraph className={classes.infoType}>
                <b>Time:</b> {displayEventTime(eventState.startTime)}
              </Typography>
              <Typography paragraph className={classes.infoType}>
                <b>Cost:</b> {formatCentsToCurrency(eventState.price)}
              </Typography>
              <Typography paragraph className={classes.infoType}>
                <b>Status:</b> {eventState.status}
              </Typography>
            </div>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button variant="contained">Edit</Button>
          <Button variant="contained">WatchList</Button>
          <Button variant="contained" color="primary">
            Register
          </Button>
          <br />
        </CardActions>
      </Card>
    </div>
  );
}
