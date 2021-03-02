import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { IEvent, displayEventDate } from "../models/event";
import { useHistory } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import routes from "../constants/routes";
import { selectedEvent } from "../store";
import RegisterButton from "../views/EventDetails/RegisterButton";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // maxWidth: 345,
      "&:hover": {
        backgroundColor: theme.palette.grey[100],
      },
      "& .MuiCardActionArea-focusHighlight": {
        backgroundColor: theme.palette.background.paper,
      },
    },
    media: {
      height: 140,
    },
    title: {
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      width: "100%",
      overflow: "hidden",
    },
    cardActions: {
      padding: "16px",
    },
  })
);

export default function EventCard(props) {
  const event: IEvent = props.event;
  const classes = useStyles();
  const history = useHistory();
  const [elevationState, setElevationState] = useState(1);
  const [futureState, setFutureState] = useState(true);
  const onMouseEnter = () => {
    setElevationState(6);
  };
  const onMouseLeave = () => {
    setElevationState(1);
  };
  const [, setSelectedEventState] = useRecoilState(selectedEvent);

  const onClick = (e): any => {
    setSelectedEventState(e);
    history.push(`${routes.EVENT_LIST_URL}/${e.id}`);
  };

  useEffect(() => {
    const future = props.event.startTime > new Date() ? true : false;
    setFutureState(future);
  }, [props.event.startTime]);

  return (
    <Card
      className={classes.root}
      elevation={elevationState}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={() => onClick(event)}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          alt={event.topic}
          height="140"
          image={event.image}
          title={event.topic}
        />
        <CardContent>
          <Typography variant="overline" color="secondary" component="p">
            {displayEventDate(event.startTime)}
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className={classes.title}
          >
            {event.topic}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {`${event.description.substring(0, 80)}...`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        {futureState && <RegisterButton event={event} />}
      </CardActions>
    </Card>
  );
}
