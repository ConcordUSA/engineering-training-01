import React from "react";
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
import Menubar from "./Menubar";
import { useRecoilState, useRecoilValue } from "recoil";
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
  const [selectedEventState] = useRecoilState(selectedEvent);

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="300px"
            image={selectedEventState.image}
          />
          <CardContent>
            <div className={classes.eventHeader}>
              <Typography paragraph className={classes.eventTitle}>
                {selectedEventState.topic}
              </Typography>
              <Typography paragraph className={classes.eventDate}>
                {selectedEventState.startTime.toDateString()}
              </Typography>
            </div>
            <div>
              {selectedEventState.categories.map((category) => (
                <Box
                  bgcolor={getBackground(category)}
                  className={classes.interestTag}
                >
                  {category}
                </Box>
              ))}
              <br />
              <br />
            </div>
            <Typography className={classes.eventDescription}>
              {selectedEventState.description}
            </Typography>

            <div className={classes.eventData}>
              <Typography paragraph className={classes.infoType}>
                <b>Address:</b> {selectedEventState.location}
              </Typography>
              <Typography paragraph className={classes.infoType}>
                <b>Time:</b> {selectedEventState.startTime.toTimeString()}
              </Typography>
              <Typography paragraph className={classes.infoType}>
                <b>Cost:</b> ${selectedEventState.price}
              </Typography>
              <Typography paragraph className={classes.infoType}>
                <b>Status:</b> {selectedEventState.status}
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
