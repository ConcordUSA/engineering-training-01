import React from "react";
import { useHistory } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Paper, Button, Container } from "@material-ui/core";
import AppTheme from "../styles/theme";
import routes from "../constants/routes";

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
      display: "-webkit-box",
      "-webkit-line-clamp": 3,
      "-webkit-box-orient": "vertical",
      padding: 0,
      margin: 0,
    },

    eventDateDiv: {
      display: "flex",
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
      color: AppTheme.primary,
      height: "10px",
    },

    registerBtn: {
      margin: 0,
      color: AppTheme.primaryText,
      width: "50%",
      backgroundColor: AppTheme.primary,
      "&:hover": {
        backgroundColor: AppTheme.secondary,
      },
    },
  })
);

export default function Events(props) {
  const classes = useStyles();
  const history = useHistory();
  const truncate = (str, n) => {
    return str.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  const onClick = (event?) => {
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
              <div>
                <h1 className={classes.eventTitle}>{props.event.topic}</h1>
                <div className={classes.eventParaDiv}>
                  <p className={classes.eventParagraph}>
                    {props.event.description}
                  </p>
                </div>
              </div>
              <div className={classes.eventDateDiv}>
                <p className={classes.eventDate}>
                  {new Date(
                    props.event.startTime.seconds * 1000
                  ).toDateString()}
                </p>
                <Button variant="contained" className={classes.registerBtn}>
                  register
                </Button>
              </div>
            </div>
          </Paper>
        </Container>
      </div>
    </React.Fragment>
  );
}
