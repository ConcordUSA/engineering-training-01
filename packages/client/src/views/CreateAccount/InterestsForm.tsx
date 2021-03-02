import React, { useState } from "react";
import { Paper, Button, Container, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { materialTheme } from "../../styles/theme";
import { createUserForm } from "../../store";
import { useRecoilState } from "recoil";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
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
      borderColor: materialTheme.palette.primary.main,
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
      color: materialTheme.palette.common.white,
      width: "20%",
      backgroundColor: materialTheme.palette.primary.main,
      "&:hover": {
        backgroundColor: materialTheme.palette.primary.dark,
      },
    },
  })
);

export default function InterestsFormView(props) {
  const { onSubmit } = props;
  const [user] = useRecoilState(createUserForm);
  const [state, setState] = useState<{ [k: string]: any }>({
    finance: user.interestedCategories?.includes("finance"),
    technology: user.interestedCategories?.includes("technology"),
    leadership: user.interestedCategories?.includes("leadership"),
    marketing: user.interestedCategories?.includes("marketing"),
  });

  const handleSelection = (key: string) => {
    // change visuals on screen and set category to true if clicked
    setState({
      ...state,
      [key]: !state[key],
    });
    console.log(state);
  };

  const handleSubmit = async () => {
    const interestedCategories = [];
    Object.keys(state).forEach((category) => {
      if (state[category]) interestedCategories.push(category);
      console.log(interestedCategories);
    });

    onSubmit({ action: "createUser", data: { interestedCategories } });
  };

  const checkboxMetaData = [
    {
      imgSrc: "./finance-icn.svg",
      key: "finance",
      text: "Finance",
    },
    {
      imgSrc: "./it-icn.svg",
      key: "technology",
      text: "Technology",
    },
    {
      imgSrc: "./leadership.svg",
      key: "leadership",
      text: "Leadership",
    },
    {
      imgSrc: "./marketing-icn.svg",
      key: "marketing",
      text: "Marketing",
    },
  ];

  const buildCheckboxes = (data) => {
    const paperClass = state[data.key]
      ? classes.selected
      : classes.interestsPaper;
    return (
      <div className={classes.interestsWrapper} key={data.key}>
        {state[data.key] && (
          <img
            src="./Vector.svg"
            className={classes.checkMark}
            alt="check mark"
          />
        )}
        <Paper
          className={paperClass}
          id={data.key + "Checkbox"}
          onClick={() => handleSelection(data.key)}
          elevation={3}
        >
          <img
            src={data.imgSrc}
            alt={data.text}
            className={classes.interestsImg}
          />
          <Typography
            component="h1"
            variant="h6"
            align="center"
            color="textPrimary"
          >
            {data.text}
          </Typography>
        </Paper>
      </div>
    );
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.paperWrap}>
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
          {checkboxMetaData.map(buildCheckboxes)}
          <div className={classes.btnDiv}>
            <Button
              type="submit"
              id="submitBtn"
              variant="contained"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </Container>
      </Paper>
    </div>
  );
}
