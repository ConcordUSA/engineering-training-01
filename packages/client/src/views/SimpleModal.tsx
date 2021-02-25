import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Category, IFilter } from "../models/event";
import FilterListIcon from "@material-ui/icons/FilterList";
import { materialTheme } from "../styles/theme";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Checkbox,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import { useRecoilState, useResetRecoilState } from "recoil";
import { eventListFilter } from "../store";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: 400,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      margin: "auto",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "flex-start",
      paddingBottom: "16px",
      borderRadius: "4px",
      outline: 0,
      position: "relative",
    },
    filter: {
      color: materialTheme.palette.common.white,
      cursor: "pointer",
    },
    filtered: {
      color: materialTheme.palette.common.white,
      backgroundColor: materialTheme.palette.secondary.main,
      cursor: "pointer",
    },

    checkBox: {
      "&.Mui-checked": {
        color: materialTheme.palette.secondary.main,
      },
    },
    checkBoxForm: {
      margin: theme.spacing(3, 0, 0, 2),
      "& .Mui-focused": {
        color: materialTheme.palette.secondary.main,
      },
    },
    checkBoxDiv: {
      margin: theme.spacing(1, 2, 6, 0),
      justifyContent: "space-between",
      "&.MuiFormGroup-root": {
        display: "flex",
        flexDirection: "row",
      },
    },
    halfInput: {
      width: "90%",
      "& .MuiInput-underline:after": {
        borderBottomColor: materialTheme.palette.secondary.main,
      },
      "& label.Mui-focused": {
        color: materialTheme.palette.secondary.main,
      },
      "& .Mui-focused": {
        color: materialTheme.palette.secondary.main,
      },
      margin: "auto",
    },
    submit: {
      // margin: theme.spacing(3, 0, 2),
      color: materialTheme.palette.common.white,
      width: "20%",
      backgroundColor: materialTheme.palette.primary.main,
      "&:hover": {
        backgroundColor: materialTheme.palette.primary.dark,
      },
      position: "absolute",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    reset: {
      // margin: theme.spacing(3, 0, 2),
      color: materialTheme.palette.common.white,
      width: "20%",
      backgroundColor: materialTheme.palette.primary.main,
      "&:hover": {
        backgroundColor: materialTheme.palette.primary.dark,
      },
      position: "absolute",
      bottom: theme.spacing(2),
      left: theme.spacing(2),
    },
    dialogHeader: {
      width: "100%",
      height: "70px",
      backgroundColor: materialTheme.palette.primary.main,
      color: materialTheme.palette.common.white,
      borderRadius: "4px 4px 0px 0px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);

export default function SimpleModal() {
  const classes = useStyles();
  const resetFilter = useResetRecoilState(eventListFilter);
  const [filterState, setFilterState] = useRecoilState(eventListFilter);
  const [state, setState] = React.useState({ topic: "", location: "" });
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
  const handleReset = () => {
    resetFilter();
    setState({
      topic: "",
      location: "",
    });
    setCheckBoxState({
      leadership: false,
      marketing: false,
      informationTechnology: false,
      finance: false,
    });
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

  const handleSubmit = () => {
    let categories: Category[] = [];
    if (checkboxState.leadership) categories.push("leadership");
    if (checkboxState.marketing) categories.push("marketing");
    if (checkboxState.finance) categories.push("finance");
    if (checkboxState.informationTechnology) categories.push("it");
    setFilterState({
      ...filterState,
      catagories: categories,
      topic: state.topic,
      location: state.location,
    } as IFilter);
    handleClose();
  };

  const body = (
    <div className={classes.paper}>
      <div className={classes.dialogHeader}>
        <Typography variant="h4">Filter Events:</Typography>
      </div>
      <TextField
        id="topic"
        label="Topic"
        autoFocus
        className={classes.halfInput}
        value={state.topic}
        onChange={handleChange}
      />
      <TextField
        id="location"
        label="Location"
        className={classes.halfInput}
        value={state.location}
        onChange={handleChange}
      />
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
            label="Leadership"
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
            label="Marketing"
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
            label="Finance"
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
        Apply
      </Button>
      <Button
        variant="outlined"
        onClick={handleReset}
        className={classes.reset}
      >
        Reset
      </Button>
    </div>
  );

  return (
    <div>
      <FilterListIcon
        className={filterState ? classes.filtered : classes.filter}
        onClick={handleOpen}
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {body}
      </Modal>
    </div>
  );
}
