import React, { useState, useMemo, useContext, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Button, Modal } from "@material-ui/core";
import AppTheme, { materialTheme } from "../styles/theme";
import { UserFactory } from "../models/user";
import EventsService from "../services/eventsService";
import UsersService from "../services/usersService";
import { AppDependencies, AppDependenciesContext } from "../appDependencies";
import { IEvent } from "../models/event";
import { User } from "../models/user";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    container: {
      margin: "0px 5px 5px 0px",
      padding: "5px",
    },
    registerBtn: {
      marginRight: "15px",
      color: AppTheme.primaryText,
      backgroundColor: AppTheme.primary,
      "&:hover": {
        backgroundColor: AppTheme.secondary,
      },
    },
    paper: {
      width: "40%",
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      margin: "auto",
      marginTop: "200px",
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
    indented: {
      marginLeft: "25px",
    },
  })
);

export default function ViewAttendees(props) {
  const classes = useStyles();
  const { db, auth }: AppDependencies = useContext(AppDependenciesContext);
  const eventService = useMemo(() => new EventsService(db), [db]);
  const usersService = useMemo(() => new UsersService(db), [db]);
  const [eventAttendees, setEventAttendees] = useState<User[]>([]);
  const [user, setUser] = useState<User>();
  const [open, setOpen] = useState(false);
  const [userArray, setUserArray] = useState([]);

  async function handleViewAttendees() {
    const attendees = await eventService.getAttendees(props.event);
    const user = await usersService.getUser(auth.currentUser.uid);
    setUser(user);
    setEventAttendees(attendees);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  useEffect(() => {}, [eventService, props, open]);

  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Button
          variant="outlined"
          className={classes.secondaryBtn}
          onClick={handleViewAttendees}
        >
          View Attendees
        </Button>

        <Modal open={open} onClose={handleClose}>
          <div className={classes.paper}>
            <h2 id="simple-modal-title">Registered Attendees</h2>
            {eventAttendees.map((attendee) => {
              return (
                <div key={attendee.uid}>
                  <p>{attendee.firstName + " " + attendee.lastName}</p>
                  <div className={classes.indented}>
                    <p> {user?.isAdmin && "    " + attendee.email}</p>
                    <p> {user?.isAdmin && "    " + attendee.companyPhone}</p>
                    <p> {user?.isAdmin && "    " + attendee.company}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Modal>
      </div>
    </React.Fragment>
  );
}
