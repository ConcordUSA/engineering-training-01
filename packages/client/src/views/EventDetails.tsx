import React, { useContext, useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";

import {
  Card,
  CardActions,
  Button,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Dialog,
  Paper,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {
  EventFactory,
  formatCentsToCurrency,
  displayEventDate,
  displayEventTime,
  Category,
  capitalize,
} from "../models/event";
import EventsService from "../services/eventsService";
import { AppDependencies, AppDependenciesContext } from "../appDependencies";
import routes from "../constants/routes";
import { useMemo } from "react";
import AppTheme, { materialTheme } from "../styles/theme";
import RegisterButton from "./RegisterButton";
import ViewAttendees from "./ViewAttendees";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100vw",
      background: materialTheme.palette.background.default,
    },
    cardWrapper: {
      position: "relative",
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
    btnDiv: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      marginBottom: "10px",
    },
    registerBtn: {
      marginRight: "15px",
      color: materialTheme.palette.common.white,
      backgroundColor: materialTheme.palette.primary.main,
      "&:hover": {
        backgroundColor: materialTheme.palette.primary.dark,
      },
    },
    secondaryBtn: {
      marginRight: "15px",
      backgroundColor: "#ffffff",
      color: materialTheme.palette.primary.main,
      borderColor: materialTheme.palette.primary.main,
      "&:hover": {
        backgroundColor: materialTheme.palette.background.default,
      },
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

function getBackground(category: Category) {
  switch (category) {
    case "marketing":
      return "green";
    case "finance":
      return "red";
    case "leadership":
      return "orange";
    //technology or IT???
    case "it":
      return "blue";
  }
}

export default function EventDetailsView() {
  const classes = useStyles();
  const history = useHistory();
  const { db }: AppDependencies = useContext(AppDependenciesContext);
  const eventService = useMemo(() => new EventsService(db), [db]);
  const newEvent = EventFactory();
  const [open, setOpen] = React.useState(false);
  const [eventState, setState] = useState(newEvent);
  const eventID = getEventIdFromURL();
  const text = window.location.href;
  function getEventIdFromURL() {
    return window.location.pathname.replace(routes.EVENT_DETAILS_URL, "");
  }

  useEffect(() => {
    eventService.getEvent(eventID).then((event) => {
      setState(event);
    });
  }, [eventService, eventID]);

  const handleBack = () => {
    history.push(routes.EVENT_LIST_URL);
  };

  const onShareClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.cardWrapper}>
      <Button onClick={handleBack} className={classes.backArrow}>
        <ArrowBackIcon />
      </Button>
      <Card className={classes.card}>
        <CardMedia component="img" height="300px" image={eventState.image} />
        <CardContent>
          <div className={classes.eventHeader}>
            <Typography paragraph className={classes.eventTitle}>
              {capitalize(eventState.topic)}
            </Typography>
            <Typography paragraph className={classes.eventDate}>
              {displayEventDate(eventState.startTime)}
            </Typography>
          </div>
          <div className={classes.categoryDiv}>
            {eventState.categories.map((category) => (
              <Box
                bgcolor={getBackground(category)}
                className={classes.interestTag}
                key={category}
              >
                {category}
              </Box>
            ))}
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
        <div className={classes.btnDiv}>
          <CardActions>
            <ViewAttendees event={eventState} />
            <Button variant="outlined" className={classes.secondaryBtn}>
              Edit
            </Button>
            <CopyToClipboard options={{ message: "Whoa!" }} text={text}>
              <Button
                variant="outlined"
                className={classes.secondaryBtn}
                onClick={onShareClick}
              >
                Share
              </Button>
            </CopyToClipboard>
            <Dialog open={open} onClose={handleClose}>
              <Paper>
                <img
                  className={classes.imgTop}
                  src="/fstd-logo-colorized.svg"
                  alt="four seasons total development logo"
                />
                <Typography paragraph className={classes.infoType}>
                  A Link to this event has been copied to the Clipboard
                </Typography>
              </Paper>
            </Dialog>
            <RegisterButton event={eventState} />
          </CardActions>
        </div>
      </Card>
    </div>
  );
}
