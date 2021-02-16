import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Paper, Button, Container, Divider } from "@material-ui/core";
import AppTheme from "../styles/theme";
import { Event, EventFactory } from "../models/event";
import { selectedEvent } from "../store";
import { useRecoilState } from "recoil";
import faker from "faker";
import { useHistory } from "react-router-dom";
import routes from "../constants/routes";

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
const events: Event[] = [];

const generateEvents = (numberOfEvents: number | string) => {
  for (let step = 0; step < numberOfEvents; step++) {
    const event = EventFactory({
      id: faker.random.uuid(),
      topic: faker.random.word(),
      location: faker.address.city(),
      price: faker.random.number(),
      startTime: faker.date.future(),
      categories: randomCategories(),
      image: faker.image.imageUrl(400, 400, "business", true),
      description: faker.lorem.paragraph(),
    });
    events.push(event);
  }
  return events;
};
//this fucntion used to help randomly generate category data
const randomCategories = () => {
  const fullList = ["marketing", "leadership", "finance", "technology"];
  const shuffled = fullList.sort(function () {
    return 0.5 - Math.random();
  });
  return shuffled.slice(0, getRandomInt(1, 5));
};
//this function used to help randomly generate category data
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

export default function EventListView() {
  const [selectedEventState, setSelectedEventState] = useRecoilState(
    selectedEvent
  );
  const history = useHistory();
  const events = generateEvents(10);
  const classes = useStyles();
  const truncate = (str, n) => {
    return str.length > n ? str.substr(0, n - 1) + "..." : str;
  };
  const onClick = (event: Event) => {
    setSelectedEventState(event);
    history.push(routes.EVENT_DETAILS_URL + selectedEventState.id);
  };
  return (
    <>
      <div className={classes.root}>
        {events.map((event) => (
          <Container maxWidth="xs" className={classes.container} key={event.id}>
            <Paper className={classes.eventPaper}>
              <div className={classes.eventsImgDiv}>
                <img
                  src={event.image}
                  className={classes.eventPhoto}
                  alt="Publicity for upcoming event"
                />
              </div>
              <div className={classes.eventDetailsDiv}>
                <h1 className={classes.eventTitle}>{event.topic}</h1>
                <p className={classes.eventParagraph}>
                  {truncate(event.description, 32)}
                </p>
                <Divider variant="middle" className={classes.eventDivider} />
                <div className={classes.eventDateDiv}>
                  <p className={classes.eventDate}>
                    {event.startTime.toDateString()}
                  </p>
                  <div className={classes.eventBtnDiv}>
                    <Button
                      variant="outlined"
                      className={classes.detailsBtn}
                      onClick={() => onClick(event)}
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
        ))}
      </div>
    </>
  );
}
