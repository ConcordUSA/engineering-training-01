import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import { getAuth, getFirestore } from "../config/firebase";
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
  const db = getFirestore();
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
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const id = e.target.id;
    setState({
      ...state,
      [id]: value,
    });
  };

  //TO DO (MAX) Validate input on (email, phone(s))  - required?
  //TO DO confirmation after submit button clicked
  //TO DO (Tom) Verify password and password confirm match
  //TO DO Set up rules for password ((min length of 8, one upper case, one lower case, one special character, one number)

  const handleRegister = async () => {
    // handle email checker

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
    const resp = await axios.post(url, data, options);
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
      />
      <br />
      <TextField
        id="personalPhone"
        label="Personal Phone number (optional)"
        value={state.personalPhone}
        onChange={handleChange}
        type="tel"
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
