import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import { getAuth } from "../config/firebase";
import axios from "axios";
import getConfig from "../config";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center",
    },
    title: {
      fontSize: "3em",
    },
    icon: {
      fontSize: "6em",
    },
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
    if (state.password != state.passwordConfirm) {
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
      companyPhone: state.companyPhone,
      personalPhone: state.personalPhone,
    };

    const url = `${configs.apiUrl}/users`;
    await axios.post(url, data, options);
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <TextField
        id="firstName"
        label="First name"
        value={state.firstName}
        onChange={handleChange}
        required
      />
      <br />
      <TextField
        id="lastName"
        label="Last name"
        value={state.lastName}
        onChange={handleChange}
        required
      />
      <br />
      <TextField
        id="email"
        label="Email"
        value={state.email}
        onChange={handleChange}
        type="email"
        required
        error={state.invalidEmail}
        helperText={state.emailHelperText}
        onBlur={validateEmail}
      />
      <br />
      <TextField
        id="company"
        label="Company"
        value={state.company}
        onChange={handleChange}
        required
      />
      <br />
      <TextField
        id="companyPhone"
        label="Company Phone number"
        value={state.companyPhone}
        onChange={handleChange}
        type="tel"
        required
        onBlur={validateCompanyPhone}
        error={state.invalidCompanyPhone}
        helperText={state.companyPhoneHelperText}
      />
      <br />
      <TextField
        id="personalPhone"
        label="Personal Phone number (optional)"
        value={state.personalPhone}
        onChange={handleChange}
        type="tel"
        error={state.invalidPersonalPhone}
        helperText={state.personalPhoneHelperText}
        onBlur={validatePersonalPhone}
      />
      <br />
      <TextField
        id="password"
        label="Password"
        value={state.password}
        onChange={handleChange}
        type="password"
        required
      />
      <br />
      <TextField
        id="passwordConfirm"
        label="Confirm password"
        value={state.passwordConfirm}
        onChange={handleChange}
        type="password"
        required
      />
      <br />
      <button id="registerButton" onClick={handleRegister}>
        Submit Registration
      </button>
    </div>
  );
}
