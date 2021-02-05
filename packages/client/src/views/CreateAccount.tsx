import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TextField, Button, Paper, Input } from "@material-ui/core";
import { getAuth } from "../config/firebase";
import axios from "axios";
import getConfig from "../config";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AppTheme from '../styles/theme';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      height: "90%"
    },
    paperWrap: {
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
      '&:hover': {
        backgroundColor: AppTheme.secondary,
      }
    },
    btnBack: {
      
    },
    btnDiv: {
      display: "flex",
      marginTop: "8px",
      marginLeft: "15%"
    },
    form: {
      width: "60%",
      textAlign: "center",

    },
    banner: {
      background: "linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)",
      height: "100%",
      width: "40%",
      textAlign: "center",
      borderRadius: "0px 4px 4px 0px",
    },
    signUpHeader: {
      textAlign: "left",
      marginLeft: "15%"
    },
    iconDiv: {
      marginTop: "6rem"
    },
    fstdDiv: {
      marginTop: "7rem"
    }
  })
);

export default function CreateAccountView() {
  const classes = useStyles();
  const auth = getAuth();
  const configs = getConfig();
  const history = useHistory();

  const [state, setState] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    firstName: "",
    lastName: "",
    company: "",
    companyPhone: "",
    showPassword: false,
    personalPhone: "",
    invalidEmail: false,
    emailHelperText: "",
    invalidCompanyPhone: false,
    companyPhoneHelperText: "",
    invalidPersonalPhone: false,
    personalPhoneHelperText: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const id = e.target.id;
    setState({
      ...state,
      [id]: value,
    });
  };

  //TODO (MAX) Validate input on (email, phone(s))  - required?
  //TODO (Tom) Verify password and password confirm match
  //TODO (Mani?) Set up rules for password ((min length of 8, one upper case, one lower case, one special character, one number)
  //TODO confirmation after submit button clicked - or some UI

  //this function checks if email is valid
  function isValidEmail(emailString: string) {
    if (emailString.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      console.log("valid", emailString);
      return true;
    } else {
      console.log("invalid", emailString);
      return false;
    }
  }
  function isValidPhone(phoneString: string) {
    if (
      phoneString.match(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/) ||
      phoneString.match(/^[0-9]{1}-[0-9]{3}-[0-9]{3}-[0-9]{4}$/)
    ) {
      console.log("valid", phoneString);
      return true;
    } else {
      console.log("invalid", phoneString);
      return false;
    }
  }

  // TODO: Refactor to combine with personal phone
  function validateCompanyPhone() {
    if (!isValidPhone(state.companyPhone)) {
      console.log("INVALID E");
      setState({
        ...state,
        invalidCompanyPhone: true,
        companyPhoneHelperText: "please enter a valid phone number",
      });
    } else {
      console.log("VALID E");
      setState({
        ...state,
        invalidCompanyPhone: false,
        companyPhoneHelperText: "",
      });
    }
  }
  function validatePersonalPhone() {
    if (!isValidPhone(state.personalPhone)) {
      setState({
        ...state,
        invalidPersonalPhone: true,
        personalPhoneHelperText: "please enter a valid phone number",
      });
    } else {
      setState({
        ...state,
        invalidPersonalPhone: false,
        personalPhoneHelperText: "",
      });
    }
  }
  //To do: Check for valid email
  function validateEmail(): void {
    if (!isValidEmail(state.email)) {
      setState({
        ...state,
        invalidEmail: true,
        emailHelperText: "please enter a valid email",
      });
    } else {
      setState({
        ...state,
        invalidEmail: false,
        emailHelperText: "",
      });
    }
  }

  const handleRegister = async () => {
    // handle email checker
    if (state.password !== state.passwordConfirm) {
      // TODO: Properly handle this error - present something in the UI
      alert("passwords don't match");
      return;
    }

    const userCredential = await auth.createUserWithEmailAndPassword(
      state.email,
      state.password
    );
    const uid = userCredential.user?.uid;
    const idToken = await userCredential.user?.getIdToken();
    const options = {
      headers: { Authorization: `Bearer ${idToken}` },
    };
    const data = {
      uid,
      email: state.email,
      firstName: state.firstName,
      lastName: state.lastName,
      company: state.company,
      companyPhone: state.companyPhone
    };

    const url = `${configs.apiUrl}/users`;
    await axios.post(url, data, options);
    history.push("/");
  };
  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword });
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  return (
    <div className={classes.root}>
      <Paper elevation={2}
        className={classes.paperWrap}>
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
        value={state.email}
        onChange={handleChange}
        type="email"
        required
        error={state.invalidEmail}
        helperText={state.emailHelperText}
        onBlur={validateEmail}
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
        value={state.companyPhone}
        onChange={handleChange}
        type="tel"
        required
        onBlur={validateCompanyPhone}
        error={state.invalidCompanyPhone}
        helperText={state.companyPhoneHelperText}
          /> 
       <Input
          id="password"
          className={classes.accountInput}
          value={state.password}
          onChange={handleChange}
          type={state.showPassword ? 'text' : 'password'}
            required
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {state.showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon  />}
                </IconButton>
              </InputAdornment>
            }
          />
        <Input
          id="passwordConfirm"
          className={classes.accountInput}
          value={state.passwordConfirm}
          onChange={handleChange}
          type={state.showPassword ? 'text' : 'password'}
            required
          
        />
        <div className={classes.btnDiv}>
          <Button className={classes.btnBack}>
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
            <img src="/fstd-icns.png" alt="Flower Sun Leaf Snowflake, Four Seasons Logo"/>
        </div>
        <div className={classes.fstdDiv}>
            <img src="./fstd-text.png" alt="Four Seasons Total Development"/>
        </div>
          </div>
      </Paper>     
    </div>
  );
}
