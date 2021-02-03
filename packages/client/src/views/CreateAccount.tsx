import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TextField } from '@material-ui/core';
import {Link} from "react-router-dom";

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


  return (
    <div className={classes.root}>
        <TextField 
        id = "firstNameField" 
        label = "First name"/><br/>
        <TextField 
        id = "lastNameField" 
        label = "Last name"/><br/>
        <TextField 
        id = "emailField" 
        label = "Email"/><br/>
        <TextField 
        id = "companyField" 
        label = "Company"/><br/>
        <TextField 
        id = "phoneField" 
        label = "Phone number"/><br/>
        <TextField 
        id = "passwordField" 
        label = "Password"/><br/>
        <TextField 
        id = "passwordConfirmField" 
        label = "Confirm password"/><br/>
        <Link id = "registerButton" to ="/">Submit Registration</Link>
    </div>
  );
}