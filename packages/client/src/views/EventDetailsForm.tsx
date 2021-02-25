import React, { useState, useContext, useEffect, useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";
import { TextField, Button, Paper } from "@material-ui/core";
import { EventFactory, IEvent, Category } from "../models/event";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { AppDependencies, AppDependenciesContext } from "../appDependencies";
import EventsService from "../services/eventsService";
import routes from "../constants/routes";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import { materialTheme } from "../styles/theme";
import Checkbox from "@material-ui/core/Checkbox";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100vw",
      height: "100vh",
      backgroundColor: materialTheme.palette.background.default,
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
      paddingBottom: "1.5em",
    },
    halfInput: {
      width: "45%",
      "& .MuiInput-underline:after": {
        borderBottomColor: materialTheme.palette.secondary.main,
      },
      "& label.Mui-focused": {
        color: materialTheme.palette.secondary.main,
      },
      "& .Mui-focused": {
        color: materialTheme.palette.secondary.main,
      },
      marginBottom: "10px",
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
        borderBottomColor: materialTheme.palette.secondary.main,
      },
      "& label.Mui-focused": {
        color: materialTheme.palette.secondary.main,
      },
      "& .Mui-focused": {
        color: materialTheme.palette.secondary.main,
      },
    },
    checkBox: {
      "&.Mui-checked": {
        color: materialTheme.palette.secondary.main,
      },
    },
    checkBoxForm: {
      marginTop: "0px",
      "& .Mui-focused": {
        color: materialTheme.palette.secondary.main,
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
      justifyContent: "flex-end",
    },
    cancel: {
      marginLeft: "1em",
    },
    submit: {
      color: materialTheme.palette.common.white,
      marginLeft: "1em",
    },
    eventDescription: {
      marginTop: "20px",
      marginBottom: 0,
    },
    spacer: {
      flexGrow: 1,
    },
  })
);

export default function EventDetailsFormView() {
  const classes = useStyles();
  const newEvent = EventFactory();
  const history = useHistory();
  const { eventId } = useParams<{ eventId: string }>();
  const [state, setState] = useState(newEvent);
  const { db }: AppDependencies = useContext(AppDependenciesContext);
  const eventsService = useMemo(() => {
    return new EventsService(db);
  }, [db]);
  const imageHelperText =
    "Please submit a url that ends with a .jpg, .jpeg, or .png file extension.";
  const [imageState, setImageState] = useState({
    error: false,
    helperText: "",
  });
  const defaultCheckboxState = useMemo(() => {
    return {
      leadership: false,
      marketing: false,
      informationTechnology: false,
      finance: false,
    };
  }, []);
  const [checkboxState, setCheckBoxState] = React.useState(
    defaultCheckboxState
  );

  // If this is coming from `/events/:eventId/edit`, then go get the event details
  useEffect(() => {
    if (eventId) {
      eventsService.getEvent(eventId).then((event) => {
        setCheckBoxState({
          leadership: event.categories.includes("leadership"),
          marketing: event.categories.includes("marketing"),
          informationTechnology: event.categories.includes("it"),
          finance: event.categories.includes("finance"),
        });
        setState(event);
      });

      return () => {
        setState(newEvent);
        setCheckBoxState(defaultCheckboxState);
      };
    }
  }, [eventsService, eventId, defaultCheckboxState, newEvent]);

  const handleBack = () => {
    history.goBack();
  };

  const handleCheck = (event) => {
    setCheckBoxState({
      ...checkboxState,
      [event.target.name]: event.target.checked,
    });
  };

  function determineValue(id, val) {
    if (id === "price") {
      return ("" + val).replace(/\D/g, "").replaceAll(/^0*/g, "");
    }
    return val;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = determineValue(id, e.target.value);
    setState({
      ...state,
      [id]: value,
    });
  };

  const handleStartDateChange = (d: Date) => {
    let newEndTime = state.endTime;
    if (d > newEndTime) {
      newEndTime = d;
    }
    setState({
      ...state,
      startTime: d,
      endTime: newEndTime,
    });
  };

  const handleEndDateChange = (d: Date) => {
    setState({
      ...state,
      endTime: d,
    });
  };

  const validateImageLink = (event) => {
    const link = event.target.value;
    const match = link.match(/\..{3,4}$/gm);
    if (!match) {
      setImageState({ error: true, helperText: imageHelperText });
      return false;
    }
    console.log(match);
    switch (match[0]) {
      case ".jpg":
        setImageState({ error: false, helperText: "" });
        return true;
      case ".jpeg":
        setImageState({ error: false, helperText: "" });
        return true;
      case ".png":
        setImageState({ error: false, helperText: "" });
        return true;
      default:
        setImageState({ error: true, helperText: imageHelperText });
        return false;
    }
  };

  const handleCreate = async () => {
    if (imageState.error) {
      return;
    }
    //gather all categories in an array as checked
    const categories: Category[] = [];
    if (checkboxState.leadership) categories.push("leadership");
    if (checkboxState.marketing) categories.push("marketing");
    if (checkboxState.finance) categories.push("finance");
    if (checkboxState.informationTechnology) categories.push("it");
    const event: IEvent = {
      ...state,
      categories,
    };
    //make categories required
    if (event.categories.length === 0) {
      alert("select at least one category");
      return;
    }
    try {
      if (eventId) {
        await eventsService.updateEvent(eventId, event);
        console.log("successfully updated an event");
      } else {
        await eventsService.createEvent(event);
        console.log("successfully created an event");
      }

      history.push(routes.EVENT_LIST_URL);
    } catch (error) {
      console.log("error", error); //TODO: Handle system messages
    }
  };

  const formatPrice = (price) => {
    const priceString = "" + price;
    const priceLength = priceString.length;
    let formattedPrice;
    switch (true) {
      case priceLength === 0:
        formattedPrice = "$";
        break;
      case priceLength === 1:
        formattedPrice = "$ 0.0" + priceString;
        break;
      case priceLength === 2:
        formattedPrice = "$ 0." + priceString;
        break;
      default:
        formattedPrice =
          "$" +
          priceString.substring(0, priceLength - 2) +
          "." +
          priceString.substring(priceLength - 2);
    }
    return formattedPrice;
  };

  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.paperWrap}>
        <div className={classes.form}>
          <div className={classes.formInner}>
            <h1 className={classes.title}>
              {eventId ? `Edit Event` : `Create Event`}
            </h1>
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
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  id="startTime"
                  label="Start time"
                  value={state.startTime}
                  onChange={handleStartDateChange}
                  disablePast
                  className={classes.halfInput}
                  format={"MM-dd-yy hh:mm a"}
                />
                <DateTimePicker
                  id="endTime"
                  label="End time"
                  className={classes.halfInput}
                  value={state.endTime}
                  onChange={handleEndDateChange}
                  disablePast
                  minDate={state.startTime}
                  format={"MM-dd-yy hh:mm a"}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div className={classes.dateAndPriceAndImageDiv}>
              <TextField
                id="price"
                label="Price"
                value={formatPrice(state.price)}
                className={classes.halfInput}
                onChange={handleChange}
              />
              <TextField
                id="image"
                label="Image URL"
                value={state.image}
                className={classes.halfInput}
                onChange={handleChange}
                onBlur={validateImageLink}
                error={imageState.error}
                helperText={imageState.helperText}
              />
            </div>
            <div className={classes.eventDescription}>
              <TextField
                id="description"
                label="Event Description"
                multiline
                rows={4}
                rowsMax={8}
                className={classes.formControl}
                value={state.description}
                onChange={handleChange}
                variant="outlined"
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
              <div className={classes.spacer}></div>
              {eventId && (
                <Button
                  className={classes.cancel}
                  onClick={handleBack}
                  variant="outlined"
                  color="primary"
                >
                  Cancel
                </Button>
              )}
              <Button
                id="createEventButton"
                onClick={handleCreate}
                className={classes.submit}
                variant="contained"
                color="primary"
              >
                {eventId ? `Save` : `Create Event`}
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
