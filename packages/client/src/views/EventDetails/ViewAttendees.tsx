import React, { useState, useMemo, useContext } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Button, Modal, List } from "@material-ui/core";
import AppTheme from "../../styles/theme";
import EventsService from "../../services/eventsService";
import UsersService from "../../services/usersService";
import { AppDependencies, AppDependenciesContext } from "../../appDependencies";
import { User } from "../../models/user";
import ListItemComponent from "./ListItemComponent";

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
    },
    indented: {
      marginLeft: "25px",
    },
    modal_body: {
      height: "50vh",
      overflowY: "auto",
    },
  })
);

export default function ViewAttendees(props) {
  const classes = useStyles();
  const { db, auth }: AppDependencies = useContext(AppDependenciesContext);
  const eventService = useMemo(() => new EventsService(db), [db]);
  const usersService = useMemo(() => new UsersService(db), [db]);
  const [eventAttendees, setEventAttendees] = useState<User[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleViewAttendees() {
    const attendees = await eventService.getAttendees(props.event);
    const user = await usersService.getUser(auth.currentUser.uid);
    setIsAdmin(user.isAdmin);
    setEventAttendees(attendees);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Button
          variant="outlined"
          className={classes.secondaryBtn}
          onClick={handleViewAttendees}
          color="primary"
        >
          View Guests
        </Button>

        <Modal open={open} onClose={handleClose}>
          <div className={classes.paper}>
            <h2 id="simple-modal-title">Registered Guests</h2>
            <List className={classes.modal_body}>
              {eventAttendees.map((attendee) => {
                return (
                  <ListItemComponent
                    key={attendee.uid}
                    attendee={attendee}
                    isAdmin={isAdmin}
                  />
                );
              })}
            </List>
          </div>
        </Modal>
      </div>
    </React.Fragment>
  );
}
