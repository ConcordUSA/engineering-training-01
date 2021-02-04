import React, {useState} from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import { getAuth, getFirestore } from "../config/firebase";

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
  
  const [state, setState] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    firstName: '',
    lastName: '',
    company: '',
    phone: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value 
    const id = e.target.id 
    setState({
      ...state,
      [id]:value
    })
  }

  //To do: Check for valid email


  const handleRegister = async () => {
    const userCredential = await auth.createUserWithEmailAndPassword(
      state.email,
      state.password
    );
    const user = auth.currentUser?.toJSON();
    const uid = userCredential.user?.uid
    db.collection('users').doc(uid).set({
      email: state.email,
      firstName: state.firstName,
      lastName: state.lastName,
      company: state.company,
      phone: state.phone
    })
  };

  return (
    <div className={classes.root}>
      <TextField id="firstName" label="First name" value={state.firstName} onChange={handleChange}/>
      <br />
      <TextField id="lastName" label="Last name" value={state.lastName} onChange={handleChange}/>
      <br />
      <TextField id="email" label="Email" value={state.email} onChange={handleChange} type="email"/>
      <br />
      <TextField id="company" label="Company" value={state.company} onChange={handleChange}/>
      <br />
      <TextField id="phone" label="Phone number" value={state.phone} onChange={handleChange} type="tel"/>
      <br />
      <TextField id="password" label="Password" value={state.password} onChange={handleChange} type="password"/>
      <br />
      <TextField id="passwordConfirm" label="Confirm password" value={state.passwordConfirm} onChange={handleChange} type="password"/>
      <br />
      <button id="registerButton" onClick={handleRegister}>
        Submit Registration
      </button>
    </div>
  );
}
