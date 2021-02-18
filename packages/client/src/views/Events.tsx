import React from "react";
// import { useRecoilState } from "recoil";
// import { useHistory } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Paper, Button, Container } from "@material-ui/core";
import AppTheme from "../styles/theme";
// import routes from "../constants/routes";
// import { selectedEvent } from "../store";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    container: {
      margin: "0px 5px 5px 0px",
      padding: "5px",
      height: "170px",
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
      margin: "4px 0px 4px 7px",
      borderRadius: 4,
    },
    eventPaper: {
      display: "flex",
      flexWrap: "wrap",
      height: "170px",
    },
    eventDetailsDiv: {
      display: "flex",
      width: "50%",
      flexWrap: "wrap",
    },
    eventTitle: {
      margin: 0,
      fontSize: "1.5rem",
    },
    eventParagraph: {
      margin: 0,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    eventDateDiv: {
      display: "flex",
      width: "100%",
    },
    eventDate: {
      margin: 0,
      color: AppTheme.primary,
      height: "10px",
    },
    eventBtnDiv: {
      width: "100%",
      position: "relative",
    },
    registerBtn: {
      margin: 0,
      color: AppTheme.primaryText,
      width: "50%",
      position: "absolute",
      bottom: "10px",
      right: 0,
      backgroundColor: AppTheme.primary,
      "&:hover": {
        backgroundColor: AppTheme.secondary,
      },
    },
  })
);

export default function Events(props) {
  const classes = useStyles();
  // const [selectedEventState, setSelectedEventState] = useRecoilState(
  //   selectedEvent
  // );

  // const onClick = (event?) => {
  //   setSelectedEventState(event);
  //   history.push(routes.EVENT_DETAILS_URL + event.id);
  // };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Container
          maxWidth="xs"
          className={classes.container}
          key={props.event.id}
        >
          <Paper className={classes.eventPaper}>
            <div className={classes.eventsImgDiv}>
              <img
                src={props.event.image}
                className={classes.eventPhoto}
                alt="Publicity for upcoming event"
              />
            </div>
            <div className={classes.eventDetailsDiv}>
              <div>
                {" "}
                class
                <h1 className={classes.eventTitle}>{props.event.topic}</h1>
                <p className={classes.eventParagraph}>
                  {props.event.description}
                </p>
              </div>
              <div className={classes.eventDateDiv}>
                <p className={classes.eventDate}>
                  {new Date(
                    props.event.startTime.seconds * 1000
                  ).toDateString()}
                </p>
                <div className={classes.eventBtnDiv}>
                  <Button variant="contained" className={classes.registerBtn}>
                    register
                  </Button>
                </div>
              </div>
            </div>
          </Paper>
        </Container>
      </div>
    </React.Fragment>
  );
}
