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
import { useSnackbar } from "notistack";

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
    b: {
      color: theme.palette.text.secondary,
    },
    cardWrapper: {
      position: "relative",
    },
    backArrow: {
      position: "absolute",
      left: "-10%",
    },
    card: {
      maxWidth: AppTheme.cardWidthSmall,
    },
    infoType: {
      fontSize: "1.2em",
      marginTop: "10px",
      color: theme.palette.text.primary,
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
      margin: "3px",
      textTransform: "capitalize",
    },
    eventDescription: {
      paddingTop: theme.spacing(2),
    },

    eventHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: theme.spacing(1),
    },

    btnDiv: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    secondaryBtn: {
      marginRight: theme.spacing(2),
      backgroundColor: theme.palette.common.white,
      borderColor: theme.palette.primary.main,
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

export default function EventDetailsComponent(props) {
  const classes = useStyles();
  const history = useHistory();
  const { eventId } = useParams<{ eventId: string }>();
  const [open, setOpen] = React.useState(false);
  const [userState] = useRecoilState(user);
  const text = `${window.location.href}?share=true`;
  const { enqueueSnackbar } = useSnackbar();
  let eventCompleted;
  props.event.startTime < new Date()
    ? (eventCompleted = true)
    : (eventCompleted = false);

  const onShareClick = () => {
    enqueueSnackbar("Event Copied, Ready to Share");
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
            <Typography variant="h4">
              {capitalize(props.event.topic)}
            </Typography>
            <Typography variant="body1">
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
          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.eventDescription}
          >
            {props.event.description}
          </Typography>

          <div className={classes.eventData}>
            <Typography paragraph className={classes.infoType}>
              <b className={classes.b}>Location:</b> {props.event.location}
            </Typography>
            <Typography paragraph className={classes.infoType}>
              <b className={classes.b}>Time:</b>{" "}
              {displayEventTime(props.event.startTime)}
            </Typography>
            <Typography paragraph className={classes.infoType}>
              <b className={classes.b}>Cost:</b>
              {` ${formatCentsToCurrency(props.event.price)}`}
            </Typography>
            {userState?.isAdmin && (
              <Typography paragraph className={classes.infoType}>
                <b> Total Revenue:</b>{" "}
                {formatCentsToCurrency(props.event.totalRevenue)}
              </Typography>
            )}
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
                color="primary"
              >
                Edit
              </Button>
            )}
            <CopyToClipboard text={text}>
              <Button
                variant="outlined"
                className={classes.secondaryBtn}
                onClick={onShareClick}
                color="primary"
              >
                Share
              </Button>
            </CopyToClipboard>
            {!eventCompleted && <RegisterButton event={props.event} />}
          </CardActions>
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Card>
            <CardMedia
              component="img"
              height="300px"
              image={props.event.image}
            />
            <CardContent>
              <div>
                <Typography variant="h3">
                  {capitalize(props.event.topic)}
                </Typography>
              </div>
              <Typography paragraph className={classes.infoType}>
                A Link to this event has been copied to the Clipboard
              </Typography>
            </CardContent>
          </Card>
        </Dialog>
      </Card>
    </div>
  );
}
