import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import { getAuth } from "../config/firebase";

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
  const email = "test@test.com";
  const password = "testPassword";

  const handleRegister = async () => {
    const userCredential = await auth.createUserWithEmailAndPassword(
      email,
      password
    );
    const user = auth.currentUser?.toJSON();
    console.log("userCredential", userCredential);
    console.log("user", user);
  };

  return (
    <div className={classes.root}>
      <TextField id="firstNameField" label="First name" />
      <br />
      <TextField id="lastNameField" label="Last name" />
      <br />
      <TextField id="emailField" label="Email" />
      <br />
      <TextField id="companyField" label="Company" />
      <br />
      <TextField id="phoneField" label="Phone number" />
      <br />
      <TextField id="passwordField" label="Password" />
      <br />
      <TextField id="passwordConfirmField" label="Confirm password" />
      <br />
      <button id="registerButton" onClick={handleRegister}>
        Submit Registration
      </button>
    </div>
  );
}
