import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { TextField, Button, Paper } from "@material-ui/core";
import { EventFactory, Event } from "../models/event";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { AppDependencies, AppDependenciesContext } from "../appDependencies";
import EventsService from "../services/eventsService";
import routes from "../constants/routes";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import AppTheme from "../styles/theme";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100vw",
      height: "100vh",
      backgroundColor: AppTheme.background,
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
      width: "85%",
      paddingTop: "1.5em",
    },
    halfInput: {
      width: "45%",
      "& .MuiInput-underline:after": {
        borderBottomColor: AppTheme.input,
      },
      "& label.Mui-focused": {
        color: AppTheme.input,
      },
      "& .Mui-focused": {
        color: AppTheme.input,
      },
    },
    dateAndPriceAndImageDiv: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
    },
    banner: {
      background:
        "linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)",
      backgroundSize: "cover",
      width: "40%",
      display: "flex",
      flexFlow: "column",
      alignItems: "center",
      justifyContent: "space-around",
      borderRadius: "0px 4px 4px 0px",
    },
    formControl: {
      width: "100%",
      margin: 0,
      marginBottom: "1em",
      "& .MuiInput-underline:after": {
        borderBottomColor: AppTheme.input,
      },
      "& label.Mui-focused": {
        color: AppTheme.input,
      },
      "& .Mui-focused": {
        color: AppTheme.input,
      },
    },
    checkBox: {
      "&.Mui-checked": {
        color: AppTheme.input,
      },
    },
    checkBoxForm: {
      marginTop: "20px",
      "& .Mui-focused": {
        color: AppTheme.input,
      },
    },
    checkBoxDiv: {
      margin: "10px 0px 10px 0px",
      justifyContent: "space-between",
      "&.MuiFormGroup-root": {
        display: "flex",
        flexDirection: "row",
      },
    },
    title: {
      textAlign: "center",
      margin: 0,
      paddingBottom: ".5em",
    },
    icon: {
      fontSize: "6em",
    },
    btnDiv: {
      display: "flex",
      justifyContent: "space-between",
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      color: AppTheme.primaryText,
      width: "30%",
      backgroundColor: AppTheme.primary,
      "&:hover": {
        backgroundColor: AppTheme.secondary,
      },
    },
  })
);

export default function CreateEventView() {
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

  const handleBack = () => {
    history.push(routes.HOME_URL);
  };
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
      categories,
    };
    console.log(event);
    //make categories required
    if (event.categories.length === 0) {
      alert("select at least one category");
      return;
    }
    try {
      await eventsService.createEvent(event);
      console.log("successfully created an event");
      history.push(routes.EVENT_LIST_URL);
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
            <div className={classes.dateAndPriceAndImageDiv}>
              <TextField
                id="startTime"
                label="Start time"
                type="datetime-local"
                defaultValue="2021-01-24T9:00"
                InputLabelProps={{
                  shrink: true,
                }}
                className={classes.halfInput}
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
                className={classes.halfInput}
                value={state.endTime}
                onChange={handleChange}
              />
            </div>
            <div className={classes.dateAndPriceAndImageDiv}>
              <TextField
                id="price"
                label="Price"
                value={state.price}
                className={classes.halfInput}
                onChange={handleChange}
                type="number"
              />
              <TextField
                id="image"
                label="Image"
                value={state.image}
                className={classes.halfInput}
                onChange={handleChange}
              />
            </div>

            <FormControl component="fieldset" className={classes.checkBoxForm}>
              <FormLabel component="legend" className={classes.checkBox}>
                Categories (check all that apply)
              </FormLabel>
              <FormGroup className={classes.checkBoxDiv}>
                <FormControlLabel
                  control={
                    <Checkbox
                      className={classes.checkBox}
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
                      className={classes.checkBox}
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
                      className={classes.checkBox}
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
                      className={classes.checkBox}
                      checked={checkboxState.informationTechnology}
                      onChange={handleCheck}
                      name="informationTechnology"
                    />
                  }
                  label="Information Technology"
                />
              </FormGroup>
            </FormControl>
            <div className={classes.btnDiv}>
              <Button onClick={handleBack}>
                <ArrowBackIcon />
              </Button>
              <Button
                id="createEventButton"
                onClick={handleCreate}
                className={classes.submit}
                variant="contained"
                color="primary"
              >
                Create Event
              </Button>
            </div>
          </div>
        </div>
        <div className={classes.banner}>
          <div>
            <img
              src="/fstd-icns.png"
              alt="Flower Sun Leaf Snowflake, Four Seasons Logo"
            />
          </div>
          <div>
            <img src="./fstd-text.png" alt="Four Seasons Total Development" />
          </div>
        </div>
      </Paper>
    </div>
  );
}
