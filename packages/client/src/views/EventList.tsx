import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Paper, Container } from "@material-ui/core";
import AppTheme from "../styles/theme";
import Menubar from "./Menubar";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      height: "100%",
      width: "100%",
    },
    container: {
      margin: "0px 5px 5px 0px",
      padding: "5px",
    },
    event: {
      width: "29%",
      height: "30%",
    },
    eventPhoto: {
      height: "90%",
      width: "50%",
      margin: "0px 0px 8px 8px",
      borderRadius: 4,
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      color: AppTheme.primaryText,
      width: "30%",
      backgroundColor: AppTheme.primary,
      "&:hover": {
        backgroundColor: AppTheme.secondary,
      },
    },
  })
);
export default function EventListView() {
  const classes = useStyles();
  //   interface Event {
  //     title: string,
  //       photo: string,
  //       category: string,
  //       time: string,
  //       date: string,
  //       location: string,
  //       cost: string,
  //       status: string,
  //       about: string
  // }
  const events = [
    {
      id: 1,
      title: "Perservance",
      photo:
        "https://cdn.vox-cdn.com/thumbor/Jet_JZc1v6j7VNqF-xACBxQ-CbY=/0x0:1536x804/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/14768779/seinfeldcast.0.1498614946.jpg",
      category: "Leadership",
      time: "12:30pm",
      date: "FEB 12 2021",
      location: "432 Death Star Lane, Space 0000",
      cost: "$60",
      status: "Active",
      about: `Be careful, or I will spill the beans on your placeholder text. 
      The concept of Lorem Ipsum was created by and for the Chinese in order to
      make U.S.design jobs non-competitive. The other thing with Lorem Ipsum is
      that you have to take out its family. Despite the constant negative ipsum covfefe.
      You're telling the enemy exactly what you're going to do. No wonder you've been fighting
      Lorem Ipsum your entire adult life.`,
    },
    {
      id: 2,
      title: "Perservance",
      photo:
        "https://cdn.vox-cdn.com/thumbor/Jet_JZc1v6j7VNqF-xACBxQ-CbY=/0x0:1536x804/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/14768779/seinfeldcast.0.1498614946.jpg",
      category: ["Leadership", "Marketing"],
      time: "12:30pm",
      date: "FEB 12 2021",
      location: "432 Death Star Lane, Space 0000",
      cost: "$60",
      status: "Active",
      about: `Be careful, or I will spill the beans on your placeholder text. 
      The concept of Lorem Ipsum was created by and for the Chinese in order to
      make U.S.design jobs non-competitive. The other thing with Lorem Ipsum is
      that you have to take out its family. Despite the constant negative ipsum covfefe.
      You're telling the enemy exactly what you're going to do. No wonder you've been fighting
      Lorem Ipsum your entire adult life.`,
    },
    {
      id: 3,
      title: "Perservance",
      photo:
        "https://cdn.vox-cdn.com/thumbor/Jet_JZc1v6j7VNqF-xACBxQ-CbY=/0x0:1536x804/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/14768779/seinfeldcast.0.1498614946.jpg",
      category: ["Leadership", "Marketing"],
      time: "12:30pm",
      date: "FEB 12 2021",
      location: "432 Death Star Lane, Space 0000",
      cost: "$60",
      status: "Active",
      about: `Be careful, or I will spill the beans on your placeholder text. 
      The concept of Lorem Ipsum was created by and for the Chinese in order to
      make U.S.design jobs non-competitive. The other thing with Lorem Ipsum is
      that you have to take out its family. Despite the constant negative ipsum covfefe.
      You're telling the enemy exactly what you're going to do. No wonder you've been fighting
      Lorem Ipsum your entire adult life.`,
    },
    {
      id: 4,
      title: "Perservance",
      photo:
        "https://cdn.vox-cdn.com/thumbor/Jet_JZc1v6j7VNqF-xACBxQ-CbY=/0x0:1536x804/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/14768779/seinfeldcast.0.1498614946.jpg",
      category: ["Leadership", "Marketing"],
      time: "12:30pm",
      date: "FEB 12 2021",
      location: "432 Death Star Lane, Space 0000",
      cost: "$60",
      status: "Active",
      about: `Be careful, or I will spill the beans on your placeholder text. 
      The concept of Lorem Ipsum was created by and for the Chinese in order to
      make U.S.design jobs non-competitive. The other thing with Lorem Ipsum is
      that you have to take out its family. Despite the constant negative ipsum covfefe.
      You're telling the enemy exactly what you're going to do. No wonder you've been fighting
      Lorem Ipsum your entire adult life.`,
    },
    {
      id: 5,
      title: "Perservance",
      photo:
        "https://cdn.vox-cdn.com/thumbor/Jet_JZc1v6j7VNqF-xACBxQ-CbY=/0x0:1536x804/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/14768779/seinfeldcast.0.1498614946.jpg",
      category: ["Leadership", "Marketing"],
      time: "12:30pm",
      date: "FEB 12 2021",
      location: "432 Death Star Lane, Space 0000",
      cost: "$60",
      status: "Active",
      about: `Be careful, or I will spill the beans on your placeholder text. 
      The concept of Lorem Ipsum was created by and for the Chinese in order to
      make U.S.design jobs non-competitive. The other thing with Lorem Ipsum is
      that you have to take out its family. Despite the constant negative ipsum covfefe.
      You're telling the enemy exactly what you're going to do. No wonder you've been fighting
      Lorem Ipsum your entire adult life.`,
    },
    {
      id: 6,
      title: "Perservance",
      photo:
        "https://cdn.vox-cdn.com/thumbor/Jet_JZc1v6j7VNqF-xACBxQ-CbY=/0x0:1536x804/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/14768779/seinfeldcast.0.1498614946.jpg",
      category: ["Leadership", "Marketing"],
      time: "12:30pm",
      date: "FEB 12 2021",
      location: "432 Death Star Lane, Space 0000",
      cost: "$60",
      status: "Active",
      about: `Be careful, or I will spill the beans on your placeholder text. 
      The concept of Lorem Ipsum was created by and for the Chinese in order to
      make U.S.design jobs non-competitive. The other thing with Lorem Ipsum is
      that you have to take out its family. Despite the constant negative ipsum covfefe.
      You're telling the enemy exactly what you're going to do. No wonder you've been fighting
      Lorem Ipsum your entire adult life.`,
    },
  ];
  return (
    <div className={classes.root}>
      <Menubar />
      {events.map((event) => (
        <Container maxWidth="xs" className={classes.container} key={event.id}>
          <Paper>
            <h1>{event.title}</h1>
            <img
              src={event.photo}
              className={classes.eventPhoto}
              alt="Publicity for upcoming event"
            />
          </Paper>
        </Container>
      ))}
    </div>
  );
}
