import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TextField, Button, Paper } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AppTheme, { materialTheme } from "../../styles/theme";
import IconButton from "@material-ui/core/IconButton";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import { isValidEmail, isValidPhone, User } from "../../models/user";
import routes from "../../constants/routes";
import { createUserForm } from "../../store";
import { useRecoilState } from "recoil";
import { Message } from "../../models/message";
import Messages from "../../components/messages";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100vw",
      backgroundColor: materialTheme.palette.background.default,
    },
    paperWrap: {
      width: AppTheme.cardWidth,
      height: "600px",
      display: "flex",
      flexWrap: "wrap",
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
      "& .MuiInput-underline:after": {
        borderBottomColor: materialTheme.palette.secondary.main,
      },
      "& label.Mui-focused": {
        color: materialTheme.palette.secondary.main,
      },
    },
    accountInputFirstName: {
      width: "34.5%",
      margin: "5px 1% 5px 5px",
      "& .MuiInput-underline:after": {
        borderBottomColor: materialTheme.palette.secondary.main,
      },
      "& label.Mui-focused": {
        color: materialTheme.palette.secondary.main,
      },
    },
    accountInputLastName: {
      width: "34.5%",
      margin: "5px 5px 5px 0px",
      "& .MuiInput-underline:after": {
        borderBottomColor: materialTheme.palette.secondary.main,
      },
      "& label.Mui-focused": {
        color: materialTheme.palette.secondary.main,
      },
    },
    btnAccount: {
      color: materialTheme.palette.common.white,
      backgroundColor: materialTheme.palette.primary.main,
      "&:hover": {
        backgroundColor: materialTheme.palette.primary.dark,
      },
    },
    btnDiv: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "8px",
      marginLeft: "15%",
      marginRight: "15%",
    },
    form: {
      width: "60%",
      textAlign: "center",
      position: "relative",
    },
    banner: {
      background:
        "linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)",
      height: "100%",
      width: "40%",
      display: "flex",
      flexFlow: "column",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "0px 4px 4px 0px",
    },
    signUpHeader: {
      textAlign: "left",
      marginLeft: "15%",
    },
  })
);

export default function UserDetailsFormView(props) {
  const { onSubmit } = props;
  const [user] = useRecoilState(createUserForm);
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = useState({
    email: { input: user.email, invalid: false, helperText: "" },
    password: "",
    passwordConfirm: "",
    firstName: user.firstName,
    lastName: user.lastName,
    company: user.company,
    companyPhone: { input: user.companyPhone, invalid: false, helperText: "" },
    personalPhone: {
      input: user.personalPhone ? user.personalPhone : "",
      invalid: false,
      helperText: "",
    },
    showPassword: false,
  });
  const [messages, setMessages] = useState<Message[]>([]);

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

  const validateForm = () => {
    setMessages([]); // reset
    const messageList: Message[] = [];
    // handle email checker
    if (state.password !== state.passwordConfirm) {
      // TODO: Properly handle this error - present something in the UI
      messageList.push({ text: "passwords don't match" });
    }
    //check each required field for input
    //return if missing

    if (!state.firstName) messageList.push({ text: "First Name is required." });
    if (!state.lastName) messageList.push({ text: "Last Name is required." });
    if (!state.email.input) messageList.push({ text: "Email is required." });
    if (!state.password) messageList.push({ text: "Password is required." });
    if (!state.company) messageList.push({ text: "Company is required." });
    if (!state.companyPhone.input)
      messageList.push({ text: "Company phone is required." });

    setMessages(messageList);
    return messageList.length < 1;
  };

  const handleNext = () => {
    const isValid = validateForm();
    if (!isValid) return;

    const user: User = {
      email: state.email.input,
      password: state.password,
      firstName: state.firstName,
      lastName: state.lastName,
      company: state.company,
      companyPhone: state.companyPhone.input,
      personalPhone: state.companyPhone.input,
    };

    onSubmit({ action: "navToInterests", data: user });
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
          <Messages messages={messages} />
          <TextField
            autoFocus
            id="firstName"
            className={classes.accountInputFirstName}
            label="First name"
            value={state.firstName}
            onChange={handleChange}
            required
          />
          <TextField
            id="lastName"
            className={classes.accountInputLastName}
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
          <TextField
            id="password"
            label="Password"
            className={classes.accountInput}
            value={state.password}
            onChange={handleChange}
            type={state.showPassword ? "text" : "password"}
            required
            InputProps={{
              endAdornment: (
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  size="small"
                >
                  {state.showPassword ? (
                    <VisibilityOutlinedIcon />
                  ) : (
                    <VisibilityOffOutlinedIcon />
                  )}
                </IconButton>
              ),
            }}
          />
          <TextField
            id="passwordConfirm"
            label="Confirm Password"
            className={classes.accountInput}
            value={state.passwordConfirm}
            onChange={handleChange}
            type={state.showPassword ? "text" : "password"}
            required
          />
          <div className={classes.btnDiv}>
            <Button onClick={handleBack}>
              <ArrowBackIcon />
            </Button>
            <Button
              id="registerButton"
              onClick={handleNext}
              className={classes.btnAccount}
              variant="contained"
            >
              Create Account
            </Button>
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
