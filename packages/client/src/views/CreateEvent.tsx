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
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
      backgroundColor: "#D6D6D6",
    },
    paperWrap: {
      display: "flex",
      flexWrap: "wrap",
      width: "900px",
      overflow: "hidden",
    },
    form: {
      flex: 1,
      textAlign: "center",
    },
    formInner: {
      display: "inline-block",
      textAlign: "left",
      width: "80%",
      paddingTop: "1.5em",
    },
    banner: {
      flex: 1,
      background:
        "linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)",
      textAlign: "center",
      borderRadius: "0px 4px 4px 0px",
    },
    formControl: {
      width: "100%",
      margin: 0,
      marginBottom: "1em",
    },
    title: {
      textAlign: "center",
      margin: 0,
      paddingBottom: ".5em",
    },
    icon: {
      fontSize: "6em",
    },
    buttonContainer: {
      textAlign: "center",
      paddingBottom: "1em",
    },
    btnCreateEvent: {
      margin: "10px auto",
    },
    btnBack: {},
    btnDiv: {
      display: "flex",
      marginTop: "8px",
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
    //gather all categories in an array as checked
    const categories: string[] = [];
    if (checkboxState.leadership) categories.push("leadership");
    if (checkboxState.marketing) categories.push("marketing");
    if (checkboxState.finance) categories.push("finance");
    if (checkboxState.informationTechnology)
      categories.push("information technology");

    const event: Event = {
      ...state,
      categories
    };

    //make categories required
    if (event.categories.length === 0) {
      alert("select at least one category");
      return;
    }
    try {
      await eventsService.createEvent(event);
      console.log("successfully created an event");
      history.push(routes.HOME_URL);
    } catch (error) {
      console.log("error", error); //TODO: Handle system messages
    }
  };

  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.paperWrap}>
        <div className={classes.form}>
          <div className={classes.formInner}>
            <h1 className={classes.title}>Create Event</h1>
            <TextField
              id="topic"
              label="Topic"
              className={classes.formControl}
              value={state.topic}
              onChange={handleChange}
            />
            <TextField
              id="location"
              label="Location"
              className={classes.formControl}
              value={state.location}
              onChange={handleChange}
            />
            <TextField
              id="startTime"
              label="Start time"
              type="datetime-local"
              defaultValue="2021-01-24T9:00"
              InputLabelProps={{
                shrink: true,
              }}
              className={classes.formControl}
              value={state.startTime}
              onChange={handleChange}
            />
            <TextField
              id="endTime"
              label="end time"
              type="datetime-local"
              defaultValue="2021-01-24T9:00"
              InputLabelProps={{
                shrink: true,
              }}
              className={classes.formControl}
              value={state.endTime}
              onChange={handleChange}
            />
            <TextField
              id="price"
              label="Price"
              value={state.price}
              className={classes.formControl}
              onChange={handleChange}
              type="number"
            />
            <TextField
              id="image"
              label="Image"
              value={state.image}
              className={classes.formControl}
              onChange={handleChange}
            />
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
            <div className={classes.buttonContainer}>
              <Button
                id="createEventButton"
                onClick={handleCreate}
                className={classes.btnCreateEvent}
                variant="contained"
                color="primary"
              >
                Create Event
              </Button>
            </div>
          </div>
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
