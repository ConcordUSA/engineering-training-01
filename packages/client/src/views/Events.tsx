import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { capitalize, IEvent, displayEventDate } from "../models/event";
import { useHistory } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Paper, Container } from "@material-ui/core";
import { materialTheme } from "../styles/theme";
import routes from "../constants/routes";
import { selectedEvent } from "../store";
import RegisterButton from "./EventDetails/RegisterButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    container: {
      margin: "0px 5px 5px 0px",
      padding: "5px",
    },
    event: {
      width: "29%",
      height: "30%",
    },
    eventsImgDiv: {
      width: "40%",
      display: "flex",
      alignItems: "center",
      justifyContent: "left",
    },
    eventPhoto: {
      height: "92%",
      width: "92%",
      margin: "0px 0px 0px 8px",
      borderRadius: 4,
    },
    eventPaper: {
      display: "flex",
      flexWrap: "wrap",
      height: "170px",
      marginBottom: "10px",
      "&:hover": {
        boxShadow: materialTheme.shadows[6],
        cursor: "pointer",
      },
    },
    eventDetailsDiv: {
      display: "flex",
      width: "60%",
      flexWrap: "wrap",
    },
    eventTitle: {
      margin: 0,
      fontWeight: 400,
      fontFamily: "Roboto",
      fontSize: "1.5rem",
    },
    eventParagraph: {
      display: "-webkit-box",
      "-webkit-line-clamp": 3,
      "-webkit-box-orient": "vertical",
      padding: 0,
      margin: 0,
      lineHeight: "1.2em",
    },

    eventDateDiv: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
    eventParaDiv: {
      marginTop: "10px",
      width: "100%",
      overflow: "hidden",
      height: "3.6em",
    },
    eventDate: {
      margin: 0,
      color: materialTheme.palette.primary.main,
    },

    registerBtn: {
      marginRight: "15px",
      color: materialTheme.palette.common.white,
      backgroundColor: materialTheme.palette.primary.main,
      "&:hover": {
        backgroundColor: materialTheme.palette.primary.dark,
      },
    },
  })
);

export default function Events(props) {
  const event: IEvent = props.event;
  const classes = useStyles();
  const history = useHistory();
  const [elevationState, setElevationState] = useState(1);
  const onMouseEnter = () => {
    setElevationState(10);
  };
  const onMouseLeave = () => {
    setElevationState(1);
  };
  const [, setSelectedEventState] = useRecoilState(selectedEvent);

  const onClick = (e): any => {
    setSelectedEventState(e);
    history.push(`${routes.EVENT_LIST_URL}/${e.id}`);
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Container maxWidth="xs" className={classes.container} key={event.id}>
          <Paper
            className={classes.eventPaper}
            elevation={elevationState}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={() => onClick(event)}
          >
            <div className={classes.eventsImgDiv}>
              <img
                src={event.image}
                className={classes.eventPhoto}
                alt="Publicity for upcoming event"
              />
            </div>
            <div className={classes.eventDetailsDiv}>
              <div>
                <h1 className={classes.eventTitle}>
                  {capitalize(event.topic)}
                </h1>
                <div className={classes.eventParaDiv}>
                  <p className={classes.eventParagraph}>{event.description}</p>
                </div>
              </div>
              <div className={classes.eventDateDiv}>
                <p className={classes.eventDate}>
                  {displayEventDate(event.startTime)}
                </p>
                <RegisterButton event={event} />
              </div>
            </div>
          </Paper>
        </Container>
      </div>
    </React.Fragment>
  );
}
