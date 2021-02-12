import React, { useState, useContext } from "react";
import { Paper, Button, Container, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppTheme from "../styles/theme";
import { AppDependencies, AppDependenciesContext } from "../appDependencies";
import UsersService from "../services/usersService";

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
    topDiv: {
      marginTop: "40px",
      maxWidth: "100%",
    },
    mainDiv: {
      marginTop: "40px",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    personalized: {
      width: "100%",
      height: "10px",
      marginLeft: "10%",
      textAlign: "left",
    },
    FourSeason: {
      marginTop: "0.35em",
      textAlign: "center",
    },
    interestsPaper: {
      height: "90%",
      width: "93%",
      textAlign: "center",
      borderStyle: "solid",
      borderWidth: "2px",
      borderColor: "transparent",
    },
    interestsWrapper: {
      height: "45%",
      width: "20%",
      margin: "0px 15px 15px 0px",
      position: "relative",
    },
    selectedInterestsWrapper: {
      height: "45%",
      width: "20%",
      margin: "0px 15px 0px 0px",
    },
    interestsImg: {
      marginTop: "20px",
      height: "50%",
      width: "80%",
    },
    selected: {
      height: "90%",
      width: "93%",
      textAlign: "center",
      borderStyle: "solid",
      borderWidth: "2px",
      borderColor: AppTheme.primary,
    },
    checkMark: {
      position: "absolute",
      right: 0,
      top: -10,
      background: "#fff",
      borderRadius: "12px",
    },
    btnDiv: {
      width: "100%",
      textAlign: "center",
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      color: AppTheme.primaryText,
      width: "20%",
      backgroundColor: AppTheme.primary,
      "&:hover": {
        backgroundColor: AppTheme.secondary,
      },
    },
  })
);

export default function InterestsView() {
  const { db, auth }: AppDependencies = useContext(AppDependenciesContext);
  const usersService = new UsersService(db, auth);
  let currentUser = {
    id: auth.currentUser.uid,
    interests: [],
  };
  console.log(auth.currentUser.uid);
  const [state, setState] = useState<{ [k: string]: any }>({
    finance: false,
    IT: false,
    leadership: false,
    marketing: false,
  });

  const handleSelection = (key: string) => {
    // change visuals on screen and set category to true if clicked
    setState({
      ...state,
      [key]: !state[key],
    });
  };

  const handleSubmit = async () => {
    //take selected categories and push into currentUser.interests
    for (const category in state) {
      console.log(state[category]);
      state[category] ? currentUser.interests.push(category) : <></>;
    }
    //to do test userService here
    await usersService.updateUser(currentUser.id, {
      interestedCategories: currentUser.interests,
    });
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth="sm" component="main" className={classes.topDiv}>
        <Typography
          component="h1"
          variant="h3"
          align="left"
          color="textPrimary"
          className={classes.FourSeason}
        >
          What Categories are Relevant to You?
        </Typography>
      </Container>
      <Container className={classes.mainDiv}>
        <Typography
          component="h1"
          variant="h6"
          align="left"
          color="textPrimary"
          className={classes.personalized}
        >
          Select all that apply:
        </Typography>
        {state.finance ? (
          <div className={classes.interestsWrapper}>
            <img
              src="./Vector.svg"
              className={classes.checkMark}
              alt="check mark"
            />
            <Paper
              className={classes.selected}
              onClick={() => handleSelection("finance")}
            >
              <img
                src="./finance-icn.svg"
                alt="Finance"
                className={classes.interestsImg}
              />
              <Typography
                component="h1"
                variant="h6"
                align="center"
                color="textPrimary"
              >
                Finance
              </Typography>
            </Paper>
          </div>
        ) : (
          <div className={classes.interestsWrapper}>
            <Paper
              className={classes.interestsPaper}
              onClick={() => handleSelection("finance")}
              elevation={3}
            >
              <img
                src="./finance-icn.svg"
                alt="Finance"
                className={classes.interestsImg}
              />
              <Typography
                component="h1"
                variant="h6"
                align="center"
                color="textPrimary"
              >
                Finance
              </Typography>
            </Paper>
          </div>
        )}
        {state.IT ? (
          <div className={classes.interestsWrapper}>
            <img
              src="./Vector.svg"
              className={classes.checkMark}
              alt="check mark"
            />
            <Paper
              className={classes.selected}
              onClick={() => handleSelection("IT")}
            >
              <img
                src="./it-icn.svg"
                alt="Information Technology"
                className={classes.interestsImg}
              />
              <Typography
                component="h1"
                variant="h6"
                align="center"
                color="textPrimary"
              >
                IT
              </Typography>
            </Paper>
          </div>
        ) : (
          <div className={classes.interestsWrapper}>
            <Paper
              className={classes.interestsPaper}
              onClick={() => handleSelection("IT")}
              elevation={3}
            >
              <img
                src="./it-icn.svg"
                alt="Information Technology"
                className={classes.interestsImg}
              />
              <Typography
                component="h1"
                variant="h6"
                align="center"
                color="textPrimary"
              >
                IT
              </Typography>
            </Paper>
          </div>
        )}
        {state.leadership ? (
          <div className={classes.interestsWrapper}>
            <img
              src="./Vector.svg"
              className={classes.checkMark}
              alt="check mark"
            />
            <Paper
              className={classes.selected}
              onClick={() => handleSelection("leadership")}
            >
              <img
                src="./leadership.svg"
                alt="Leadership"
                className={classes.interestsImg}
              />
              <Typography
                component="h1"
                variant="h6"
                align="center"
                color="textPrimary"
              >
                Leadership
              </Typography>
            </Paper>
          </div>
        ) : (
          <div className={classes.interestsWrapper}>
            <Paper
              className={classes.interestsPaper}
              onClick={() => handleSelection("leadership")}
              elevation={3}
            >
              <img
                src="./leadership.svg"
                alt="Leadership"
                className={classes.interestsImg}
              />
              <Typography
                component="h1"
                variant="h6"
                align="center"
                color="textPrimary"
              >
                Leadership
              </Typography>
            </Paper>
          </div>
        )}
        {state.marketing ? (
          <div className={classes.interestsWrapper}>
            <img
              src="./Vector.svg"
              className={classes.checkMark}
              alt="check mark"
            />
            <Paper
              className={classes.selected}
              onClick={() => handleSelection("marketing")}
            >
              <img
                src="./marketing-icn.svg"
                alt="Marketing"
                className={classes.interestsImg}
              />
              <Typography
                component="h1"
                variant="h6"
                align="center"
                color="textPrimary"
              >
                Marketing
              </Typography>
            </Paper>
          </div>
        ) : (
          <div className={classes.interestsWrapper}>
            <Paper
              className={classes.interestsPaper}
              onClick={() => handleSelection("marketing")}
              elevation={3}
            >
              <img
                src="./marketing-icn.svg"
                alt="Marketing"
                className={classes.interestsImg}
              />
              <Typography
                component="h1"
                variant="h6"
                align="center"
                color="textPrimary"
              >
                Marketing
              </Typography>
            </Paper>
          </div>
        )}
        <div className={classes.btnDiv}>
          <Button
            type="submit"
            variant="contained"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </Container>
    </div>
  );
}
