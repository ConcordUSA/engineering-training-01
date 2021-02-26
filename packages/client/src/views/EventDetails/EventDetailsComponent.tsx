import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useHistory, useParams } from "react-router-dom";
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
  formatCentsToCurrency,
  displayEventDate,
  displayEventTime,
  Category,
  capitalize,
} from "../../models/event";
import routes from "../../constants/routes";
import AppTheme, { materialTheme } from "../../styles/theme";
import RegisterButton from "./RegisterButton";
import ViewAttendees from "./ViewAttendees";
import { user } from "../../store";
import { useRecoilState } from "recoil";

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
    noWrap: {},
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

export default function EventDetailsComponent(props) {
  const classes = useStyles();
  const history = useHistory();
  const { eventId } = useParams<{ eventId: string }>();
  const [open, setOpen] = React.useState(false);
  const [userState] = useRecoilState(user);
  const text = window.location.href;
  let eventCompleted;
  props.event.startTime < new Date()
    ? (eventCompleted = true)
    : (eventCompleted = false);

  const onShareClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBack = () => {
    history.push(routes.EVENT_LIST_URL);
  };

  const handleEdit = () => {
    history.push(`${routes.EVENT_LIST_URL}/${eventId}/edit`);
  };

  return (
    <div className={classes.cardWrapper}>
      <Button onClick={handleBack} className={classes.backArrow}>
        <ArrowBackIcon />
      </Button>
      <Card className={classes.card}>
        <CardMedia component="img" height="300px" image={props.event.image} />
        <CardContent>
          <div className={classes.eventHeader}>
            <Typography paragraph className={classes.eventTitle}>
              {capitalize(props.event.topic)}
            </Typography>
            <Typography paragraph className={classes.eventDate}>
              {displayEventDate(props.event.startTime)}
            </Typography>
          </div>
          <div className={classes.categoryDiv}>
            {props.event.categories.map((category) => (
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
            {props.event.description}
          </Typography>

          <div className={classes.eventData}>
            <Typography paragraph className={classes.infoType}>
              <b>Address:</b> {props.event.location}
            </Typography>
            <Typography paragraph className={classes.infoType}>
              <b>Time:</b> {displayEventTime(props.event.startTime)}
            </Typography>
            <Typography paragraph className={classes.infoType}>
              <b>Cost:</b> {formatCentsToCurrency(props.event.price)}
            </Typography>
            {userState?.isAdmin && (
            <Typography paragraph className={classes.infoType}>
                <b> Total Revenue:</b>{" "}
                {formatCentsToCurrency(props.event.totalRevenue)}
              </Typography>
            )}
            <Typography paragraph className={classes.infoType}>
              <b>Status:</b> {props.event.status}
            </Typography>
          </div>
        </CardContent>
        <div className={classes.btnDiv}>
          <CardActions>
            <ViewAttendees event={props.event} />
            {!eventCompleted && userState?.isAdmin && (
              <Button
                variant="outlined"
                className={classes.secondaryBtn}
                onClick={handleEdit}
              >
                Edit
              </Button>
            )}
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
            {!eventCompleted && <RegisterButton event={props.event} />}
          </CardActions>
        </div>
      </Card>
    </div>
  );
}
