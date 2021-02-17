import React, { useState } from "react";
import { Paper, Button, Container, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppTheme from "../../styles/theme";
import { createUserForm } from "../../store";
import { useRecoilState } from "recoil";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100vw",
      backgroundColor: AppTheme.background,
    },
    paperWrap: {
      display: "flex",
      flexWrap: "wrap",
      width: "900px",
      overflow: "hidden",
      padding: "2em",
      textAlign: "center",
    },
    column: {
      flex: 1,
      textAlign: "center",
    },
    heading: {
      width: "100%",
      marginBottom: "1em",
      marginTop: ".5em",
    },
    mainDiv: {
      // margin: "40px",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    label: {
      width: "100%",
      textAlign: "center",
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
      cursor: "pointer",
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
      display: "block",
      width: "100%",
      textAlign: "center",
    },
    submit: {
      // margin: theme.spacing(3, 0, 2),
      color: AppTheme.primaryText,
      width: "20%",
      backgroundColor: AppTheme.primary,
      "&:hover": {
        backgroundColor: AppTheme.secondary,
      },
    },
  })
);

export default function InterestsFormView(props) {
  const { onSubmit } = props;
  const [user] = useRecoilState(createUserForm);
  const [state, setState] = useState<{ [k: string]: any }>({
    finance: user.interestedCategories?.includes("finance"),
    it: user.interestedCategories?.includes("it"),
    leadership: user.interestedCategories?.includes("leadership"),
    marketing: user.interestedCategories?.includes("marketing"),
  });

  const handleSelection = (key: string) => {
    // change visuals on screen and set category to true if clicked
    setState({
      ...state,
      [key]: !state[key],
    });
  };

  const handleSubmit = async () => {
    const interestedCategories = [];
    Object.keys(state).forEach((category) => {
      if (state[category]) interestedCategories.push(category);
    });

    onSubmit({ action: "createUser", data: { interestedCategories } });
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.paperWrap}>
        {/* <div className={classes.column}> */}
        <Typography
          component="h1"
          variant="h3"
          align="center"
          color="textPrimary"
          className={classes.heading}
        >
          What Categories are Relevant to You?
        </Typography>
        <Container className={classes.mainDiv}>
          <Typography
            component="h1"
            variant="h6"
            align="left"
            color="textPrimary"
            className={classes.label}
          >
            Select all that apply
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
          {state.it ? (
            <div className={classes.interestsWrapper}>
              <img
                src="./Vector.svg"
                className={classes.checkMark}
                alt="check mark"
              />
              <Paper
                className={classes.selected}
                onClick={() => handleSelection("it")}
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
                onClick={() => handleSelection("it")}
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
        {/* </div> */}
      </Paper>
    </div>
  );
}
