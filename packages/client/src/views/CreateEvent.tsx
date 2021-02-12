import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { TextField, Button, Paper } from "@material-ui/core";
import { EventFactory, Event } from "../models/event";
import { AppDependencies, AppDependenciesContext } from "../appDependencies";
import EventsService from "../services/eventsService";
import routes from "../constants/routes";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppTheme from "../styles/theme";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";

import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      height: "100%",
      width: "100%",
      backgroundColor: "#D6D6D6",
    },
    formControl: {
      margin: theme.spacing(3),
    },
    paperWrap: {
      marginTop: "3%",
      marginBottom: "3%",
      display: "flex",
      flexWrap: "wrap",
      width: "90%",
    },
    title: {
      fontSize: "3em",
    },
    icon: {
      fontSize: "6em",
    },

    accountInputName: {
      width: "34%",
      margin: "5px",
    },
    btnCreateEvent: {
      margin: "10px",
      marginLeft: "40%",
      color: AppTheme.primaryText,
      backgroundColor: AppTheme.primary,
      "&:hover": {
        backgroundColor: AppTheme.secondary,
      },
    },
    btnBack: {},
    btnDiv: {
      display: "flex",
      marginTop: "8px",
      marginLeft: "15%",
    },
    form: {
      marginTop: "10%",
      width: "60%",
      textAlign: "center",
    },
    banner: {
      background:
        "linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)",
      height: "100%",
      width: "40%",
      textAlign: "center",
      borderRadius: "0px 4px 4px 0px",
    },
    createEventHeader: {
      textAlign: "left",
      marginLeft: "15%",
    },
    iconDiv: {
      marginTop: "6rem",
    },
    fstdDiv: {
      marginTop: "7rem",
    },
  })
);

export default function CreateAccountView() {
  const classes = useStyles();
  const newEvent = EventFactory();
  const [state, setState] = useState(newEvent);
  const history = useHistory();
  const { db }: AppDependencies = useContext(AppDependenciesContext);
  const eventsService = new EventsService(db);

  const [checkboxState, setCheckBoxState] = React.useState({
    leadership: false,
    marketing: false,
    informationTechnology: false,
    finance: false,
  });

  const handleCheck = (event) => {
    setCheckBoxState({
      ...checkboxState,
      [event.target.name]: event.target.checked,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const id = e.target.id;
    setState({
      ...state,
      [id]: value,
    });
  };

  const handleCreate = async () => {
    const interestedCategories: string[] = [];

    if (checkboxState.leadership) interestedCategories.push("leadership");
    if (checkboxState.leadership) console.log("leadership");
    if (checkboxState.marketing) interestedCategories.push("marketing");
    if (checkboxState.finance) interestedCategories.push("finance");
    if (checkboxState.informationTechnology)
      interestedCategories.push("information technology");
    const event: Event = {
      ...state,
      interestedCategories,
    };
    //test console.logs
    console.log(event);
    try {
      await eventsService.createEvent(event);
      // TODO: What do we do after the event is created???
      console.log("successfully created an event"); // TODO: Handle system messages
      history.push(routes.HOME_URL);
    } catch (error) {
      console.log("error", error); //TODO: Handle system messages
    }
  };

  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.paperWrap}>
        <div className={classes.form}>
          <h1 className={classes.createEventHeader}>Create Event</h1>
          <TextField
            id="topic"
            label="Topic"
            className={classes.accountInputName}
            value={state.topic}
            onChange={handleChange}
          />
          <br />
          <TextField
            id="location"
            label="Location"
            className={classes.accountInputName}
            value={state.location}
            onChange={handleChange}
          />
          <br />
          <TextField
            id="startTime"
            label="Start time"
            type="datetime-local"
            defaultValue="2021-01-24T9:00"
            InputLabelProps={{
              shrink: true,
            }}
            value={state.startTime}
            onChange={handleChange}
          />
          <br />
          <TextField
            id="endTime"
            label="end time"
            type="datetime-local"
            defaultValue="2021-01-24T9:00"
            InputLabelProps={{
              shrink: true,
            }}
            value={state.endTime}
            onChange={handleChange}
          />
          <br />
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">
              Categories (check all that apply)
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkboxState.leadership}
                    onChange={handleCheck}
                    name="leadership"
                  />
                }
                label="leadership"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkboxState.marketing}
                    onChange={handleCheck}
                    name="marketing"
                  />
                }
                label="marketing"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkboxState.finance}
                    onChange={handleCheck}
                    name="finance"
                  />
                }
                label="finance"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkboxState.informationTechnology}
                    onChange={handleCheck}
                    name="informationTechnology"
                  />
                }
                label="Information Technology"
              />
            </FormGroup>
          </FormControl>
          <TextField
            id="price"
            label="Price"
            value={state.price}
            className={classes.accountInputName}
            onChange={handleChange}
            type="number"
          />
          <br />
          <TextField
            id="image"
            label="Image"
            value={state.image}
            className={classes.accountInputName}
            onChange={handleChange}
          />
          <br />
          <Button
            id="createEventButton"
            onClick={handleCreate}
            className={classes.btnCreateEvent}
            variant="contained"
          >
            Create Event
          </Button>
        </div>
        <div className={classes.banner}>
          <div className={classes.iconDiv}>
            <img
              src="/fstd-icns.png"
              alt="Flower Sun Leaf Snowflake, Four Seasons Logo"
            />
          </div>
          <div className={classes.fstdDiv}>
            <img src="./fstd-text.png" alt="Four Seasons Total Development" />
          </div>
        </div>
      </Paper>
    </div>
  );
}
