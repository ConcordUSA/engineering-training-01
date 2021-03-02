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
} from "@material-ui/core";
import {
  formatCentsToCurrency,
  displayEventDate,
  displayEventTime,
  Category,
  capitalize,
} from "../../models/event";
import routes from "../../constants/routes";
import AppTheme from "../../styles/theme";
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
      background: theme.palette.background.default,
    },

    cardWrapper: {
      position: "relative",
    },
    card: {
      maxWidth: AppTheme.cardWidthSmall,
    },
    p: {
      display: "inline-block",
      margin: "8px 6px 0px 0px",
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

  const handleEdit = () => {
    history.push(`${routes.EVENT_LIST_URL}/${eventId}/edit`);
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardMedia component="img" height="300px" image={props.event.image} />
        <CardContent>
          <div className={classes.eventHeader}>
            <Typography variant="h4">
              {capitalize(props.event.topic)}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {displayEventDate(props.event.startTime)}
            </Typography>
          </div>
          <div className={classes.categoryDiv}>
            {props.event.categories.map((category) =>
              category === "it" ? (
                <Box
                  bgcolor={getBackground(category)}
                  className={classes.interestTag}
                  key={category}
                >
                  IT
                </Box>
              ) : (
                <Box
                  bgcolor={getBackground(category)}
                  className={classes.interestTag}
                  key={category}
                >
                  {category}
                </Box>
              )
            )}
          </div>
          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.eventDescription}
          >
            {props.event.description}
          </Typography>

          <div className={classes.eventData}>
            <Typography variant="h6" color="textSecondary">
              <Typography
                variant="h6"
                color="textPrimary"
                className={classes.p}
              >
                Location:
              </Typography>
              {props.event.location}
            </Typography>
            <Typography variant="h6" color="textSecondary">
              <Typography
                variant="h6"
                color="textPrimary"
                className={classes.p}
              >
                Time:
              </Typography>
              {displayEventTime(props.event.startTime)}
            </Typography>
            <Typography variant="h6" color="textSecondary">
              <Typography
                variant="h6"
                color="textPrimary"
                className={classes.p}
              >
                Cost:
              </Typography>
              {` ${formatCentsToCurrency(props.event.price)}`}
            </Typography>
            {userState?.isAdmin && (
              <Typography>
                <b> Total Revenue:</b>{" "}
                {formatCentsToCurrency(props.event.totalRevenue)}
              </Typography>
            )}

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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
