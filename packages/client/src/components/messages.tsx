import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppTheme from "../styles/theme";
// import { Message } from "../models/message";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    messages: {
      marginTop: "1em",
      width: "500px",
      display: "inline-block",
      background: AppTheme.background,
      padding: "1em",
      borderRadius: "3px",
    },
  })
);

export default function Messages(props) {
  const classes = useStyles();
  const { messages } = props;

  return (
    <div className={classes.root}>
      {messages.length > 0 && (
        <div className={classes.messages} id="messages">
          {messages.map((item) => {
            return <div>{item.text}</div>;
          })}
        </div>
      )}
    </div>
  );
}
