import React, { useState, useContext } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TextField, Button, Paper, Input } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AppTheme from "../../styles/theme";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import UsersService from "../../services/usersService";
import { AppDependencies, AppDependenciesContext } from "../../appDependencies";
import { isValidEmail, isValidPhone } from "../../models/user";
import routes from "../../constants/routes";
import { signInView } from "../../store";
import { useRecoilState } from "recoil";

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
    accountInput: {
      width: "70%",
      margin: "5px",
    },
    accountInputName: {
      width: "34%",
      margin: "5px",
    },
    btnAccount: {
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
    signUpHeader: {
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
  const history = useHistory();
  const { auth, db }: AppDependencies = useContext(AppDependenciesContext);
  const usersService = new UsersService(db, auth);
  const [, setSignInViewState] = useRecoilState(signInView);

  const [state, setState] = useState({
    email: { input: "", invalid: false, helperText: "" },
    password: "",
    passwordConfirm: "",
    firstName: "",
    lastName: "",
    company: "",
    companyPhone: { input: "", invalid: false, helperText: "" },
    personalPhone: { input: "", invalid: false, helperText: "" },
    showPassword: false,
  });

  function updateObject(id: any, value: string) {
    switch (id) {
      case "email":
        return isValidEmail(value);
      case "companyPhone":
        return isValidPhone(value);
      case "personalPhone":
        return isValidPhone(value);
      default:
        return value;
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const id = e.target.id;
    const updateObj = updateObject(id, value);
    setState({
      ...state,
      [id]: updateObj,
    });
  };

  //TODO (Mani?) Set up rules for password ((min length of 8, one upper case, one lower case, one special character, one number)
  //TODO confirmation after submit button clicked - or some UI

  const handleRegister = async () => {
    // handle email checker
    if (state.password !== state.passwordConfirm) {
      // TODO: Properly handle this error - present something in the UI
      alert("passwords don't match");
      return;
    }
    //check each required field for input
    //return if missing
    switch ("") {
      case state.firstName:
        alert("First Name is required.");
        return;
      case state.lastName:
        alert("Last Name is required.");
        return;
      case state.email.input:
        alert("Email is required.");
        return;
      case state.password:
        alert("Password is required.");
        return;
      case state.company:
        alert("Company is required.");
        return;
      case state.companyPhone.input:
        alert("Company phone is required.");
        return;
    }
    const data = {
      email: state.email.input,
      password: state.password,
      firstName: state.firstName,
      lastName: state.lastName,
      company: state.company,
      companyPhone: state.companyPhone.input,
      personalPhone: state.companyPhone.input,
    };

    const { error, message } = await usersService.createUser(data);
    if (error) {
      // TODO: handle this message
      console.log("error", error);
      return;
    }

    // TODO: handle this message
    console.log("message", message);

    history.push(routes.HOME_URL);
  };
  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword });
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const handleBack = () => {
    history.push(routes.HOME_URL);
  };

  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.paperWrap}>
        <div className={classes.form}>
          <h1 className={classes.signUpHeader}>Sign Up</h1>
          <TextField
            id="firstName"
            className={classes.accountInputName}
            label="First name"
            value={state.firstName}
            onChange={handleChange}
            required
          />
          <TextField
            id="lastName"
            className={classes.accountInputName}
            label="Last name"
            value={state.lastName}
            onChange={handleChange}
            required
          />
          <TextField
            id="email"
            className={classes.accountInput}
            label="Email"
            value={state.email.input}
            onChange={handleChange}
            type="email"
            required
            error={state.email.invalid}
            helperText={state.email.helperText}
          />
          <TextField
            id="company"
            className={classes.accountInput}
            label="Company"
            value={state.company}
            onChange={handleChange}
            required
          />
          <TextField
            id="companyPhone"
            className={classes.accountInput}
            label="Company Phone number"
            value={state.companyPhone.input}
            onChange={handleChange}
            type="tel"
            required
            error={state.companyPhone.invalid}
            helperText={state.companyPhone.helperText}
          />
          <TextField
            id="personalPhone"
            className={classes.accountInput}
            label="Personal Phone number"
            value={state.personalPhone.input}
            onChange={handleChange}
            type="tel"
            error={state.personalPhone.invalid}
            helperText={state.personalPhone.helperText}
          />
          <Input
            id="password"
            className={classes.accountInput}
            value={state.password}
            onChange={handleChange}
            type={state.showPassword ? "text" : "password"}
            required
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {state.showPassword ? (
                    <VisibilityOutlinedIcon />
                  ) : (
                    <VisibilityOffOutlinedIcon />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
          <Input
            id="passwordConfirm"
            className={classes.accountInput}
            value={state.passwordConfirm}
            onChange={handleChange}
            type={state.showPassword ? "text" : "password"}
            required
          />
          <div className={classes.btnDiv}>
            <Button className={classes.btnBack} onClick={handleBack}>
              <ArrowBackIcon />
            </Button>
            <Button
              id="registerButton"
              onClick={handleRegister}
              className={classes.btnAccount}
              variant="contained"
            >
              Create Account
            </Button>
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
