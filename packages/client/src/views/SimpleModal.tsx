import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import FilterListIcon from "@material-ui/icons/FilterList";
import { materialTheme } from "../styles/theme";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Checkbox,
  TextField,
  Button,
} from "@material-ui/core";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    filter: {
      color: materialTheme.palette.common.white,
      cursor: "pointer",
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
    submit: {
      // margin: theme.spacing(3, 0, 2),
      color: materialTheme.palette.common.white,
      width: "20%",
      backgroundColor: materialTheme.palette.primary.main,
      "&:hover": {
        backgroundColor: materialTheme.palette.primary.dark,
      },
      float: "right",
    },
  })
);

export default function SimpleModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [state, setState] = React.useState({
    topic: "",
    location: "",
    date: new Date(),
  });
  const [open, setOpen] = React.useState(false);
  const [checkboxState, setCheckBoxState] = React.useState({
    leadership: false,
    marketing: false,
    informationTechnology: false,
    finance: false,
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheck = (event) => {
    setCheckBoxState({
      ...checkboxState,
      [event.target.name]: event.target.checked,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = e.target.value;
    setState({
      ...state,
      [id]: value,
    });
  };

  const handleDateChange = (d: Date) => {
    setState({
      ...state,
      date: d,
    });
  };
  const handleSubmit = async () => {};
  const body = (
    <div style={modalStyle} className={classes.paper}>
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
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DateTimePicker
          id="date"
          label="Date of Event"
          defaultValue={new Date()}
          value={state.date}
          onChange={handleDateChange}
          disablePast
          className={classes.halfInput}
          format={"MM-dd-yy hh:mm a"}
        />
      </MuiPickersUtilsProvider>
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
      <Button
        type="submit"
        id="submitBtn"
        variant="contained"
        className={classes.submit}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  );

  return (
    <div>
      <FilterListIcon className={classes.filter} onClick={handleOpen} />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
