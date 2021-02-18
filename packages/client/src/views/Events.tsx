import React from "react";
import { useRecoilState } from "recoil";
import { useHistory } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Paper, Button, Container, Divider } from "@material-ui/core";
import AppTheme from "../styles/theme";
import routes from "../constants/routes";
import { selectedEvent } from "../store";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      marginTop: "12%",
      height: "100%",
      width: "100%",
    },
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
      height: "10px",
    },
    eventParagraph: {
      margin: 0,
      height: "2px",
    },
    eventDivider: {
      width: "220px",
      backgroundColor: "#000000",
      margin: 0,
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
    detailsBtn: {
      margin: 0,
      color: AppTheme.primary,
      width: "35%",
      position: "absolute",
      bottom: "10px",
      backgroundColor: "#ffffff",
      borderColor: AppTheme.primary,
      "&:hover": {
        backgroundColor: AppTheme.primary,
        color: "#ffffff",
      },
    },
  })
);

export default function Events(props) {
  const classes = useStyles();
  const history = useHistory();
  const [selectedEventState, setSelectedEventState] = useRecoilState(
    selectedEvent
  );
  const truncate = (str, n) => {
    return str.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  const onClick = (event?) => {
    setSelectedEventState(event);
    history.push(routes.EVENT_DETAILS_URL + event.id);
  };

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
              <h1 className={classes.eventTitle}>{props.topic}</h1>
              <p className={classes.eventParagraph}>
                {truncate(props.event.description, 32)}
              </p>
              <Divider variant="middle" className={classes.eventDivider} />
              <div className={classes.eventDateDiv}>
                <p className={classes.eventDate}>
                  {new Date(
                    props.event.startTime.seconds * 1000
                  ).toDateString()}
                </p>
                <div className={classes.eventBtnDiv}>
                  <Button
                    variant="outlined"
                    className={classes.detailsBtn}
                    onClick={() => onClick(props.event)}
                  >
                    details
                  </Button>
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
